import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchArticle, fetchArticles, formatArticleDate } from "@/lib/blog";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import hair from "@/assets/gallery-hair-1.jpg";
import owner from "@/assets/media/owner_portrait.jpg.asset.json";
import salon from "@/assets/salon-interior.jpg";

export default function Blog() {
  const { slug } = useParams();
  const list = useQuery({ queryKey: ["articles"], queryFn: fetchArticles, staleTime: 300000 });
  const detail = useQuery({ queryKey: ["article", slug], queryFn: () => fetchArticle(slug ?? ""), enabled: Boolean(slug) });
  const article = detail.data;
  const loading = slug ? detail.isLoading : list.isLoading;
  const error = slug ? detail.error : list.error;
  const path = slug ? `/blog/${slug}` : "/blog";
  const title = article ? `${article.title} | Essenza` : "Blog Essenza | Beleza e cuidados em Fernandópolis";
  const description = article?.excerpt ?? "Orientações sobre loiros, balayage, maquiagem, unhas e sobrancelhas no Essenza Studio di Bellezza, em Fernandópolis-SP.";
  const image = (key: string) => key === "owner" ? owner.url : key === "salon" ? salon : hair;
  return <div className="min-h-screen bg-background text-foreground">
    <Helmet>
      <title>{title}</title><meta name="description" content={description} /><link rel="canonical" href={`https://essenzastudiodibellezza.lovable.app${path}`} />
      <meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:url" content={`https://essenzastudiodibellezza.lovable.app${path}`} /><meta property="og:type" content={article ? "article" : "website"} />
      {article && <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: article.title, description: article.excerpt, datePublished: article.published_at, dateModified: article.published_at, inLanguage: "pt-BR", mainEntityOfPage: `https://essenzastudiodibellezza.lovable.app${path}`, author: { "@type": "Organization", name: "Essenza Studio di Bellezza" }, publisher: { "@type": "Organization", name: "Essenza Studio di Bellezza" } }).replace(/</g, "\\u003c")}</script>}
    </Helmet>
    <header className="border-b border-border"><div className="container py-5 flex justify-between items-center gap-4"><Link to="/" className="font-serif text-2xl text-primary">ESSENZA</Link><Link to={slug ? "/blog" : "/"} className="inline-flex items-center gap-2 text-sm"><ArrowLeft className="w-4 h-4" />{slug ? "Voltar ao blog" : "Voltar ao salão"}</Link></div></header>
    <main className="container py-12 sm:py-20">
      {loading && <p role="status" className="text-muted-foreground">Carregando artigos…</p>}
      {error && <div role="alert"><p>Não foi possível carregar os artigos.</p><Button variant="outline" className="mt-4" onClick={() => slug ? detail.refetch() : list.refetch()}>Tentar novamente</Button></div>}
      {!loading && !error && slug && !article && <div><h1 className="font-serif text-4xl">Artigo não encontrado</h1><Link to="/blog" className="text-accent mt-5 inline-block">Ver o blog</Link></div>}
      {!slug && !loading && !error && <>
        <p className="text-xs uppercase text-accent mb-4">Journal Essenza · Fernandópolis-SP</p><h1 className="font-serif text-5xl sm:text-6xl text-primary">Beleza, cuidado e escolhas</h1>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">{list.data?.map((post) => <article key={post.id}><Link to={`/blog/${post.slug}`}><img src={image(post.image_key)} alt="" className="w-full aspect-[4/3] object-cover object-top" loading="lazy" /><p className="mt-5 text-xs text-muted-foreground">{post.category} · {formatArticleDate(post.published_at)}</p><h2 className="font-serif text-3xl text-primary mt-3 leading-tight">{post.title}</h2><p className="text-muted-foreground mt-4 leading-relaxed">{post.excerpt}</p><span className="inline-flex items-center gap-2 mt-5 text-accent text-sm">Ler artigo <ArrowRight className="w-4 h-4" /></span></Link></article>)}</div>
        {list.data?.length === 0 && <p className="mt-10 text-muted-foreground">Novos artigos em breve.</p>}
      </>}
      {article && <article className="max-w-3xl mx-auto">
        <p className="text-xs uppercase text-accent mb-4">{article.category} · Fernandópolis-SP</p><h1 className="font-serif text-4xl sm:text-5xl leading-tight text-primary">{article.title}</h1>
        <p className="mt-5 text-sm text-muted-foreground">Essenza Studio di Bellezza · <time dateTime={article.published_at}>{formatArticleDate(article.published_at)}</time></p>
        {article.generated && <p className="mt-2 text-xs text-muted-foreground">Conteúdo elaborado com apoio de IA, a partir das orientações do salão.</p>}
        <p className="mt-8 text-lg leading-relaxed">{article.excerpt}</p><img src={image(article.image_key)} alt="" className="mt-8 w-full aspect-[16/9] object-cover object-top" />
        {article.sections.map((section, i) => <section key={i} className="mt-10"><h2 className="font-serif text-3xl text-primary">{section.heading}</h2>{section.paragraphs.map((paragraph, j) => <p key={j} className="mt-4 text-muted-foreground leading-relaxed">{paragraph}</p>)}</section>)}
        <aside className="mt-12 pt-6 border-t border-border"><h2 className="font-serif text-2xl">Fontes e orientações</h2><ul className="mt-4 space-y-3">{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent underline underline-offset-4">{source.label}</a></li>)}</ul></aside>
        <Button asChild className="mt-10 rounded-none"><a href={buildWhatsAppUrl(`Olá! Li o artigo "${article.title}" e gostaria de agendar uma avaliação na Essenza.`)} target="_blank" rel="noopener noreferrer">Agendar pelo WhatsApp <ArrowRight className="w-4 h-4 ml-2" /></a></Button>
      </article>}
    </main>
  </div>;
}