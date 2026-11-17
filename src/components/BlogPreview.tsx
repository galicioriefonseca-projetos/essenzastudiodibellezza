import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { fetchArticles, formatArticleDate } from "@/lib/blog";

export function BlogPreview() {
  const { data } = useQuery({ queryKey: ["articles"], queryFn: fetchArticles, staleTime: 300000 });
  return (
    <section id="blog" className="container py-20 lg:py-24 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div><p className="text-xs uppercase text-accent mb-4">Journal Essenza</p><h2 className="font-serif text-4xl sm:text-5xl text-primary">Beleza, cuidado e escolhas</h2></div>
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-accent">Todos os artigos <ArrowRight className="w-4 h-4" /></Link>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-8">
        {data?.slice(0, 3).map((article) => <Link key={article.id} to={`/blog/${article.slug}`} className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">{article.category} · {formatArticleDate(article.published_at)}</p>
          <h3 className="font-serif text-3xl text-primary mt-3 leading-tight">{article.title}</h3>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{article.excerpt}</p>
        </Link>)}
      </div>
    </section>
  );
}