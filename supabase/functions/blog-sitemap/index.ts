import { createClient } from "npm:@supabase/supabase-js@2";
Deno.serve(async (req) => {
  if (req.method !== "GET") return new Response("Method not allowed", { status: 405 });
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return new Response("Unavailable", { status: 503 });
  const db = createClient(url, key);
  const entries: string[] = [];
  for (let start = 0; start < 50000; start += 500) {
    const { data, error } = await db.from("blog_posts").select("slug,published_at").lte("published_at", new Date().toISOString()).order("published_at").range(start, start + 499);
    if (error) return new Response("Unavailable", { status: 503 });
    for (const post of data) entries.push(`<url><loc>https://essenzastudiodibellezza.lovable.app/blog/${encodeURIComponent(post.slug)}</loc><lastmod>${new Date(post.published_at).toISOString()}</lastmod></url>`);
    if (data.length < 500) break;
  }
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
});