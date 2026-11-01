import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Phone, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, services, type ServiceCategoryId } from "@/data/services";
import { buildWhatsAppUrl } from "@/lib/whatsapp";


type Filter = "todos" | ServiceCategoryId;

const Servicos = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("todos");

  const normalize = (s: string) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return services.filter((s) => {
      const matchesCategory = filter === "todos" || s.category === filter;
      if (!matchesCategory) return false;
      if (!q) return true;
      return normalize(s.name).includes(q) || normalize(s.description).includes(q);
    });
  }, [query, filter]);

  const grouped = useMemo(() => {
    return categories
      .map((cat) => ({ cat, items: filtered.filter((s) => s.category === cat.id) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  return (
    <div className="min-h-screen texture-cement">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
        <div className="container flex items-center justify-between py-5">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-serif text-3xl tracking-luxury text-primary">ESSENZA</span>
            <span className="font-serif italic text-xs text-muted-foreground tracking-wide ml-1">
              Studio di Bellezza
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-luxury text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/servicos" className="text-accent border-b border-accent pb-1">Serviços</Link>
            <Link to="/#galeria" className="hover:text-foreground transition-colors">Galeria</Link>
            <Link to="/#agendamento" className="hover:text-foreground transition-colors">Agendamento</Link>
            <Link to="/#contato" className="hover:text-foreground transition-colors">Contato</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container pt-12 pb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-muted-foreground hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" /> Voltar à Home
        </Link>
        <div className="max-w-3xl">
          <p className="tracking-luxury text-xs uppercase text-accent mb-3">Catálogo Essenza</p>
          <h1 className="font-serif text-5xl lg:text-6xl text-primary leading-tight">
            Todos os <em className="text-accent">Serviços</em>
          </h1>
          <div className="mt-4 w-16 h-px bg-accent" />
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Uma curadoria completa de cuidados de alto padrão. Use os filtros por categoria ou
            busque por nome para encontrar a experiência ideal para você.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="container">
        <div className="bg-card rounded-[2rem] p-6 lg:p-8 shadow-card space-y-6">
          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar serviço (ex: balayage, manicure, sobrancelha...)"
              className="pl-11 h-12 rounded-full bg-background/60 border-border/60 focus-visible:ring-accent"
              aria-label="Buscar serviço"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("todos")}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-luxury border transition-colors ${
                filter === "todos"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-accent hover:text-accent"
              }`}
            >
              Todos
            </button>
            {categories.map(({ id, title, icon: Icon }) => {
              const active = filter === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFilter(id)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-luxury border transition-colors inline-flex items-center gap-2 ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:border-accent hover:text-accent"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.4} />
                  {title}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground tracking-wide">
            {filtered.length} {filtered.length === 1 ? "serviço encontrado" : "serviços encontrados"}
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="container py-12 space-y-12">
        {grouped.length === 0 && (
          <div className="bg-card rounded-[2rem] p-16 text-center shadow-card">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" strokeWidth={1.2} />
            <h3 className="font-serif text-2xl text-primary">Nenhum serviço encontrado</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tente outra palavra-chave ou fale conosco pelo WhatsApp para um atendimento personalizado.
            </p>
          </div>
        )}

        {grouped.map(({ cat, items }) => {
          const Icon = cat.icon;
          return (
            <div key={cat.id}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border border-accent/40 flex items-center justify-center text-accent shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={1.2} />
                </div>
                <div>
                  <h2 className="font-serif text-2xl lg:text-3xl text-primary tracking-wide">
                    {cat.title}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">{cat.tagline}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((s) => (
                  <article
                    key={s.name}
                    className="group bg-card rounded-2xl p-6 shadow-card border border-transparent hover:border-accent/40 transition-colors"
                  >
                    <h3 className="font-serif text-lg text-primary leading-tight">{s.name}</h3>
                    <div className="mt-2 mb-4 w-8 h-px bg-accent/60" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                    <div className="mt-5 pt-4 border-t border-border/50">
                      <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="px-0 h-auto text-xs uppercase tracking-luxury text-accent hover:bg-transparent hover:text-primary"
                      >
                        <a
                          href={buildWhatsAppUrl(`Olá! Gostaria de agendar: ${s.name}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >

                          <Phone className="w-3 h-3 mr-1.5" /> Agendar
                        </a>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <div className="bg-gradient-wood rounded-[2.5rem] p-12 lg:p-16 text-center text-primary-foreground shadow-soft relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-40 animate-glow-pulse" />
          <div className="relative">
            <p className="tracking-luxury text-xs uppercase text-gold mb-4">
              Não encontrou o que buscava?
            </p>
            <h2 className="font-serif text-3xl lg:text-5xl">Fale com a equipe Essenza</h2>
            <p className="mt-4 max-w-xl mx-auto opacity-90">
              Atendemos sob medida. Conte-nos o que você precisa e montamos a experiência ideal.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-10 bg-background text-primary hover:bg-background/90 rounded-full px-10 py-6 tracking-luxury text-xs uppercase"
            >
              <a href={buildWhatsAppUrl("Olá! Gostaria de mais informações.")} target="_blank" rel="noopener noreferrer">
                Falar pelo WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-10">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground tracking-wide">
          <span className="font-serif text-base text-primary tracking-luxury">
            ESSENZA · Studio di Bellezza
          </span>
          <span>© {new Date().getFullYear()} Fernandópolis - SP. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default Servicos;
