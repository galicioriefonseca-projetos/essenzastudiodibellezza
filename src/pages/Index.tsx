import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Phone, Instagram, Scissors, Sparkles, Hand, Flower2, Quote, Palette, Eye, Brush, ShoppingBag } from "lucide-react";
import heroModel from "@/assets/hero-model.jpg";
import gallery1 from "@/assets/gallery-hair-1.jpg";
import gallery2 from "@/assets/gallery-hair-2.jpg";
import galleryNails from "@/assets/gallery-nails.jpg";
import gallerySkin from "@/assets/gallery-skincare.jpg";
import salonInterior from "@/assets/salon-interior.jpg";

const Index = () => {
  return (
    <div className="min-h-screen texture-cement">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
        <div className="container flex items-center justify-between py-5">
          <a href="#" className="flex flex-col leading-none">
            <span className="font-serif text-3xl tracking-luxury text-primary">ESSENZA</span>
            <span className="font-serif italic text-xs text-muted-foreground tracking-wide ml-1">Studio di Bellezza</span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-luxury text-muted-foreground">
            <a href="#home" className="text-accent hover:text-accent transition-colors border-b border-accent pb-1">Home</a>
            <a href="#servicos-completos" className="hover:text-foreground transition-colors">Serviços</a>
            <a href="#galeria" className="hover:text-foreground transition-colors">Galeria</a>
            <a href="#agendamento" className="hover:text-foreground transition-colors">Agendamento</a>
            <a href="#contato" className="hover:text-foreground transition-colors">Contato</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="container py-12 lg:py-20">
          <div className="relative grid lg:grid-cols-2 gap-10 items-center bg-gradient-warm rounded-[2.5rem] p-8 lg:p-14 shadow-soft overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-glow animate-glow-pulse pointer-events-none"
                 style={{ background: 'var(--gradient-glow)' }} />
            {/* Wood arch */}
            <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-[24px] border-wood/70 hidden lg:block" />

            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-soft">
                <img
                  src={heroModel}
                  alt="Modelo com cabelo perfeito no salão Essenza"
                  width={1024}
                  height={1024}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="relative animate-fade-in-up">
              <h1 className="font-serif text-5xl lg:text-7xl leading-[1.05] text-primary">
                Harmonia,<br />Beleza<br /><em className="text-accent">e Bem-Estar</em>
              </h1>
              <p className="mt-6 max-w-md text-muted-foreground leading-relaxed">
                Venha viver a experiência Essenza em Fernandópolis. Cabelo, estética, unhas e cuidados exclusivos em um ambiente acolhedor e moderno.
              </p>
              <div className="mt-10">
                <Button asChild variant="outline" size="lg"
                  className="border-2 border-accent text-primary hover:bg-accent hover:text-accent-foreground rounded-full px-10 py-6 tracking-luxury text-xs uppercase">
                  <a href="#agendamento">Agende seu Horário</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="container pb-20">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Especialidades */}
          <div id="servicos" className="lg:col-span-4 bg-card rounded-[2rem] p-8 shadow-card animate-fade-in">
            <h2 className="font-serif text-3xl text-primary text-center tracking-wide">ESPECIALIDADES</h2>
            <div className="mx-auto mt-2 mb-8 w-12 h-px bg-accent" />
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Scissors, label: "Cabelo" },
                { icon: Sparkles, label: "Estética" },
                { icon: Hand, label: "Unhas" },
                { icon: Flower2, label: "Massagem" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-secondary/60 transition-colors">
                  <div className="w-14 h-14 rounded-full border border-accent/40 flex items-center justify-center text-accent">
                    <Icon className="w-6 h-6" strokeWidth={1.2} />
                  </div>
                  <span className="text-sm tracking-wide text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Galeria */}
          <div id="galeria" className="lg:col-span-4 bg-card rounded-[2rem] p-8 shadow-card animate-fade-in">
            <h2 className="font-serif text-3xl text-primary text-center tracking-wide">GALERIA DE ESTILO</h2>
            <div className="mx-auto mt-2 mb-8 w-12 h-px bg-accent" />
            <div className="grid grid-cols-2 gap-3">
              {[gallery1, gallery2, galleryNails, gallerySkin].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl group">
                  <img
                    src={src}
                    alt={`Trabalho Essenza ${i + 1}`}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Depoimentos */}
          <div className="lg:col-span-4 bg-card rounded-[2rem] p-8 shadow-card animate-fade-in">
            <h2 className="font-serif text-3xl text-primary text-center tracking-wide">AVALIAÇÕES</h2>
            <div className="mx-auto mt-2 mb-8 w-12 h-px bg-accent" />
            <div className="space-y-6">
              {[
                { q: "Saí do Essenza me sentindo outra pessoa. Atendimento impecável e ambiente dos sonhos.", a: "Mariana C." },
                { q: "O melhor salão de Fernandópolis. Profissionais que entendem do assunto e tratam você com carinho.", a: "Juliana R." },
                { q: "Cada detalhe pensado para o conforto do cliente. Recomendo de olhos fechados.", a: "Camila T." },
              ].map((t, i) => (
                <figure key={i} className="border-l-2 border-accent/60 pl-4">
                  <Quote className="w-4 h-4 text-accent mb-2" />
                  <blockquote className="text-sm italic text-muted-foreground leading-relaxed">"{t.q}"</blockquote>
                  <figcaption className="mt-2 text-xs tracking-luxury uppercase text-foreground">— {t.a}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Localização (full width) */}
          <div id="contato" className="lg:col-span-12 bg-card rounded-[2rem] p-8 shadow-card animate-fade-in">
            <h2 className="font-serif text-3xl text-primary text-center tracking-wide">LOCALIZAÇÃO EM FERNANDÓPOLIS</h2>
            <div className="mx-auto mt-2 mb-8 w-12 h-px bg-accent" />
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              <div className="rounded-2xl overflow-hidden min-h-[320px] shadow-card">
                <iframe
                  title="Mapa Essenza Fernandópolis"
                  src="https://www.google.com/maps?q=Fernand%C3%B3polis%2C%20SP&output=embed"
                  className="w-full h-full min-h-[320px] grayscale-[20%]"
                  loading="lazy"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden min-h-[320px]">
                <img src={salonInterior} alt="Interior do salão Essenza" loading="lazy" width={960} height={720}
                     className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-primary-foreground space-y-2">
                  <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-gold" /> Fernandópolis - SP</div>
                  <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-gold" /> (17) 99673-3303</div>
                  <div className="flex items-center gap-2 text-sm"><Instagram className="w-4 h-4 text-gold" /> @essenza.studio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Serviços por Categoria */}
      <section id="servicos-completos" className="container pb-20">
        <div className="text-center mb-12">
          <p className="tracking-luxury text-xs uppercase text-accent mb-3">Catálogo Essenza</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-primary">Nossos Serviços</h2>
          <div className="mx-auto mt-4 w-16 h-px bg-accent" />
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground text-sm leading-relaxed">
            Uma curadoria completa de cuidados de alto padrão, organizados por especialidade para a sua experiência exclusiva.
          </p>
        </div>

        <div className="bg-card rounded-[2rem] p-6 lg:p-10 shadow-card">
          <Accordion type="single" collapsible defaultValue="cabeleireiro" className="w-full space-y-3">
            {[
              {
                id: "cabeleireiro",
                icon: Scissors,
                title: "Cabeleireiro",
                desc: "Cortes, colorações e tratamentos capilares de assinatura.",
                items: [
                  "Corte de cabelo feminino (método Tesoura de Diamante)",
                  "Escova profissional",
                  "Balayage personalizada",
                  "Mechas e luzes",
                  "Coloração de cabelo",
                  "Cabelo ombré",
                  "Apliques de cabelo",
                  "Permanente e definição de cachos",
                  "Alisamentos e tratamentos com queratina",
                  "Cuidados para cabelos cacheados",
                  "Crescimento capilar",
                  "Tranças",
                  "Penteados (incluindo coque e noiva)",
                ],
              },
              {
                id: "manicure",
                icon: Hand,
                title: "Manicure & Pedicure",
                desc: "Cuidado impecável para mãos e pés, com higiene de alto padrão.",
                items: [
                  "Manicure tradicional",
                  "Pedicure profissional",
                  "Pedicure sem uso de água",
                  "Alongamento de unhas",
                  "Unhas de gel",
                  "Unhas acrílicas",
                  "Unhas esculpidas e stiletto",
                  "Esmalte em pó",
                  "Francesinha",
                  "Design de unhas",
                  "Corte e lixa de unhas",
                  "Esfoliação e hidratação",
                  "Massagens nas mãos e nos pés",
                  "Troca de esmalte",
                  "Reparo e remoção de unhas postiças",
                  "Manicure infantil e masculina",
                ],
              },
              {
                id: "sobrancelhas",
                icon: Eye,
                title: "Sobrancelhas & Cílios",
                desc: "Olhar marcante com técnicas modernas de design e laminação.",
                items: [
                  "Design de sobrancelhas personalizado",
                  "Design de sobrancelhas com linha",
                  "Brow lamination",
                  "Embelezamento de sobrancelhas",
                  "Permanente de cílios",
                ],
              },
              {
                id: "maquiagem",
                icon: Brush,
                title: "Estúdio de Maquiagem",
                desc: "Maquiagem profissional para eventos, formaturas e noivas.",
                items: [
                  "Maquiagem para eventos e formaturas",
                  "Maquiagem para noivas",
                  "Penteados sofisticados",
                  "Design de sobrancelhas com linha",
                ],
              },
              {
                id: "salao",
                icon: Sparkles,
                title: "Experiências do Salão",
                desc: "Atendimentos exclusivos pensados para cada momento.",
                items: [
                  "Salão de beleza VIP — atendimento exclusivo e privativo",
                  "Salão de beleza infantil",
                  "Serviço noturno com hora marcada",
                  "Agendamento on-line",
                ],
              },
              {
                id: "loja",
                icon: ShoppingBag,
                title: "Loja de Produtos de Beleza",
                desc: "Produtos profissionais selecionados para prolongar seu cuidado em casa.",
                items: [
                  "Linha capilar profissional",
                  "Cosméticos e finalizadores",
                  "Cuidados para unhas",
                  "Indicações personalizadas",
                ],
              },
            ].map(({ id, icon: Icon, title, desc, items }) => (
              <AccordionItem
                key={id}
                value={id}
                className="border border-border/50 rounded-2xl px-5 lg:px-7 bg-background/50 data-[state=open]:bg-secondary/40 data-[state=open]:shadow-soft transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-full border border-accent/40 flex items-center justify-center text-accent shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={1.2} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl lg:text-2xl text-primary tracking-wide">{title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{desc}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="ml-0 lg:ml-16 pt-2">
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                          <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-5 border-t border-border/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <p className="text-xs text-muted-foreground tracking-wide">
                        Agendamento exclusivo · Fernandópolis-SP
                      </p>
                      <Button asChild size="sm" variant="outline"
                        className="border-accent/60 text-primary hover:bg-accent hover:text-accent-foreground rounded-full tracking-luxury text-[10px] uppercase">
                        <a href="https://wa.me/5517996733303" target="_blank" rel="noreferrer">
                          <Phone className="w-3 h-3 mr-1.5" /> Agendar pelo WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA / Agendamento */}
      <section id="agendamento" className="container pb-24">
        <div className="bg-gradient-wood rounded-[2.5rem] p-12 lg:p-20 text-center text-primary-foreground shadow-soft relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-40 animate-glow-pulse" />
          <div className="relative">
            <p className="tracking-luxury text-xs uppercase text-gold mb-4">Sua experiência começa aqui</p>
            <h2 className="font-serif text-4xl lg:text-6xl">Reserve seu momento Essenza</h2>
            <p className="mt-4 max-w-xl mx-auto opacity-90">Atendimento personalizado com hora marcada. Fale agora pelo WhatsApp e garanta seu horário.</p>
            <Button asChild size="lg"
              className="mt-10 bg-background text-primary hover:bg-background/90 rounded-full px-10 py-6 tracking-luxury text-xs uppercase">
              <a href="https://wa.me/5517996733303" target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-10">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground tracking-wide">
          <span className="font-serif text-base text-primary tracking-luxury">ESSENZA · Studio di Bellezza</span>
          <span>© {new Date().getFullYear()} Fernandópolis - SP. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
