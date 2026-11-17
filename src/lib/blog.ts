import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const articleSchema = z.object({
  id: z.string(), slug: z.string(), title: z.string(), excerpt: z.string(), category: z.string(),
  published_at: z.string(), generated: z.boolean(), image_key: z.string(),
  sections: z.array(z.object({ heading: z.string(), paragraphs: z.array(z.string()) })),
  sources: z.array(z.object({ label: z.string(), url: z.string().url() })),
});
export type Article = z.infer<typeof articleSchema>;
export async function fetchArticles() {
  const { data, error } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false }).limit(60);
  if (error) throw error;
  return z.array(articleSchema).parse(data);
}
export async function fetchArticle(slug: string) {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? articleSchema.parse(data) : null;
}
export const formatArticleDate = (date: string) => new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "America/Sao_Paulo" }).format(new Date(date));