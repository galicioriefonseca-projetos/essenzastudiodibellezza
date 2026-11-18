import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { generateResponse, GatewayError } from "npm:@lovable.dev/ai-gateway@0.1.13";
import { z } from "npm:zod@3";
import { authenticateCronRequest } from "../_shared/cron-auth.ts";
import { editorialFacts, localPublicationDay, shouldPause } from "./rules.ts";

const Post = z.object({ title: z.string().min(15).max(150), excerpt: z.string().min(40).max(350), category: z.enum(["Cabelo", "Maquiagem", "Unhas", "Sobrancelhas", "Essenza"]), image_key: z.enum(["hair", "owner", "salon"]), sections: z.array(z.object({ heading: z.string().min(5).max(150), paragraphs: z.array(z.string().min(20).max(1500)).min(1).max(3) })).min(4).max(6) });
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const denied = authenticateCronRequest(req);
  if (denied) return new Response(denied.body, { status: denied.status, headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Use POST" }, 405);
  const input = z.object({ kind: z.literal("daily") }).safeParse(await req.json().catch(() => null));
  if (!input.success) return json({ error: "Invalid input" }, 400);
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return json({ error: "Missing publishing configuration" }, 500);
  const db = createClient(url, key);
  const day = localPublicationDay(new Date());
  const token = crypto.randomUUID();
  const { data: acquired, error: lockError } = await db.rpc("acquire_blog_lease", { p_day: day, p_token: token });
  if (lockError) return json({ error: lockError.message }, 500);
  if (!acquired) return json({ skipped: true, reason: "Paused, already attempted today, or locked" });
  try {
    const { data: previous, error } = await db.from("blog_posts").select("title").order("published_at", { ascending: false }).limit(90);
    if (error) throw error;
    const result = await generateResponse({
      model: "openai/gpt-6-astra", max_output_tokens: 3500,
      instructions: "Escreva um artigo original em PT-BR útil para visitantes, não texto para manipular mecanismos de busca. Use somente os fatos fornecidos. Sem promessas de ranking, novidades inventadas ou conselhos não fundamentados. Resposta curta logo na primeira seção, seguida de explicações e próximo passo. Evite temas já publicados. Devolva JSON puro no formato solicitado.",
      input: `Data local: ${day}. Fatos verificados: ${editorialFacts}. Artigos anteriores: ${JSON.stringify(previous)}. Escolha uma dúvida específica sobre um serviço confirmado, criando um artigo de 450 a 650 palavras, sem repetir explicações apenas para preencher espaço. JSON: {title, excerpt, category (Cabelo|Maquiagem|Unhas|Sobrancelhas|Essenza), image_key (hair|owner|salon), sections:[{heading,paragraphs:[string]}]}. Entre 4 e 6 seções. Apenas fatos deste briefing; não invente fontes.`,
      text: { format: { type: "json_object" } },
    });
    const messages = result.output.filter((item) => item.type === "message");
    if (messages.some((message) => message.content.some((part) => part.type === "refusal"))) throw new Error("Content refusal: fresh owner request required");
    if (result.status !== "completed") throw new Error("Incomplete generation: manual review required");
    const text = messages.flatMap((message) => message.content).filter((part) => part.type === "output_text").map((part) => part.text).join("");
    const post = Post.parse(JSON.parse(text));
    const slug = post.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100) + "-" + day;
    const { error: saveError, data: saved } = await db.rpc("finish_blog_post", { p_token: token, p_day: day, p_post: { ...post, slug, sources: [{ label: "Orientações oficiais do Essenza", url: "https://essenzastudiodibellezza.lovable.app/#faq" }, { label: "Catálogo do salão", url: "https://essenzastudiodibellezza.lovable.app/servicos" }] } });
    if (saveError || !saved) throw new Error(saveError?.message ?? "Publishing lease unavailable");
    return json({ published: true, slug, day });
  } catch (error) {
    const status = error instanceof GatewayError ? error.httpStatus : undefined;
    // No blind replay: unknown outcomes and invalid content also require owner review.
    const pause = status !== 429;
    const reason = status ? `AI publication interrupted (${status}); owner recovery required` : "Publication needs manual review; no automatic retry";
    const { error: stateError } = await db.from("blog_job_state").update({ status: pause ? "paused" : "active", pause_reason: reason, lease_token: null, lease_until: null, updated_at: new Date().toISOString() }).eq("name", "daily-blog").eq("lease_token", token);
    console.error("daily-blog", error instanceof Error ? error.message : "Unknown failure", stateError?.message);
    return json({ error: reason }, status === 402 || status === 403 || status === 429 ? status : 500);
  }
});