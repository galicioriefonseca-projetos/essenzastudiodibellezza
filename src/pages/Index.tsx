import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, MapPin, Phone, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ownerSalon from "@/assets/media/owner_salon_mirrors.jpg.asset.json";
import ownerPortrait from "@/assets/media/owner_portrait.jpg.asset.json";
import ownerSmiling from "@/assets/media/owner_smiling.jpg.asset.json";
import ownerStudio from "@/assets/media/owner_studio.png.asset.json";
import clip1 from "@/assets/media/salon_clip_1.mp4.asset.json";
import clip2 from "@/assets/media/salon_clip_2.mp4.asset.json";
import logo from "@/assets/essenza-logo.jpg";
import salonInterior from "@/assets/salon-interior.jpg";
import hair1 from "@/assets/gallery-hair-1.jpg";
import hair2 from "@/assets/gallery-hair-2.jpg";
import { ADDRESS_DISPLAY, WHATSAPP_DISPLAY, buildWhatsAppUrl } from "@/lib/whatsapp";

const MAPS_URL =
  "https://www.google.com/maps/place/Essenza+%7C+Studio+di+Bellezza/@-20.2756971,-50.2446359,17z/data=!3m1!4b1!4m6!3m5!1s0x9497f70128542d11:0x35a5d58b9efd0031!8m2!3d-20.2756971!4d-50.242061!16s%2Fg%2F11wqnrlnv1";
const INSTAGRAM_URL = "https://www.instagram.com/essenzastudiodibellezza";

const NAV = [
  { href: "#loiros", label: "Loiros" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#videos", label: "Vídeos" },
  { href: "#noivas", label: "Noivas" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

const SERVICES = [
  { title: "Cabelo", text: "Corte, coloração, alisamentos, tratamentos com queratina e escova com acabamento de salão.", catalog: "cabeleireiro" },
  { title: "Maquiagem", text: "Maquiagem social, para festas, ensaios e eventos, pensada para o seu rosto e o seu momento.", catalog: "maquiagem" },
  { title: "Unhas", text: "Manicure, pedicure, esmaltação em gel, alongamento e nail design com cuidado em cada detalhe.", catalog: "manicure" },
  { title: "Sobrancelhas e cílios", text: "Design de sobrancelhas, henna, brow lamination e permanente de cílios para valorizar o olhar.", catalog: "sobrancelhas" },
];

const REASONS = [
  { n: "01", title: "Cuidado com a fibra", text: "Testes antes do clareamento e protocolos de proteção e reconstrução durante todo o processo." },
  { n: "02", title: "Avaliação personalizada", text: "Antes de qualquer química, analisamos seu cabelo, seu tom de pele e sua rotina." },
  { n: "03", title: "Tudo em um só lugar", text: "Cabelo, unhas, maquiagem e sobrancelhas no mesmo horário, sem correria." },
  { n: "04", title: "Ambiente acolhedor", text: "Um espaço calmo e bonito, feito para você desacelerar enquanto é cuidada." },
];

const REVIEWS = [
  { q: "Não é só sobre cabelo ou unhas. É sobre como a gente se sente quando entra e, principalmente, quando sai. Esse salão é o melhor da cidade porque é diferente em tudo.", a: "Loja Alice Calçados" },
  { q: "Melhor salão da região de Fernandópolis. Venho de Bauru semanalmente para fazer tudo que preciso no Essenza. Indico todos os profissionais de olhos fechados.", a: "Ana Carolina Sabino" },
  { q: "Foi a experiência mais gostosa e maravilhosa da minha vida, desde o atendimento pelo WhatsApp até o fim. Amooo!!!", a: "Daniela Herrera" },
  { q: "Atendimento impecável, ambiente acolhedor e muito profissionalismo. Experiência extremamente positiva. Recomendo!", a: "Renata D. Pereira" },
  { q: "Excelente! Tenho me cuidado muito mais, graças ao carinho que recebo aqui!", a: "Juliana Sabino" },
  { q: "Lugar aconchegante, atendimento personalizado, profissionais de excelência.", a: "Osimara Arruda" },
];

const FAQ_ITEMS = [
  { question: "Fazer mechas ou loiro estraga o cabelo?", answer: "No Essenza Studio di Bellezza, não. O nosso maior compromisso é a integridade da fibra capilar. Utilizamos tecnologias avançadas de clareamento, testes de elasticidade prévios e protocolos de proteção e reconstrução profunda durante todo o processo. Dessa forma, garantimos um loiro luminoso, saudável e com toque macio, sem o risco de corte químico." },
  { question: "Qual é a diferença entre Balayage e mechas tradicionais?", answer: "A Balayage é uma técnica de clareamento à mão livre que cria um efeito de iluminação mais natural, suave e com raiz esfumada, exigindo menos manutenção no dia a dia. Já as mechas tradicionais podem proporcionar um loiro mais intenso e marcado. Na sua avaliação personalizada no salão, nossa equipe analisa o seu tom de pele e estilo de vida para indicar a técnica ideal." },
  { question: "Quanto tempo dura a manutenção das mechas?", answer: "O intervalo de manutenção varia conforme a técnica escolhida e o crescimento do seu cabelo. Em média, técnicas como balayage e morena iluminada pedem retoques entre 4 a 6 meses, enquanto loiros globais podem necessitar de manutenção na raiz a cada 2 a 3 meses. Oferecemos um cronograma de cuidados pós-salão para prolongar a cor e o brilho em casa." },
  { question: "Como agendar uma avaliação capilar na Essenza?", answer: "O agendamento de avaliações e horários é feito de forma totalmente personalizada e prática através do nosso WhatsApp oficial: (17) 99673-3303. Nosso estúdio está localizado na Rua Rafael de Oliveira, 645 - Box 5, Jardim Santa Helena, em Fernandópolis/SP." },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs uppercase tracking-luxury text-accent mb-4">{children}</p>
);

const WhatsButton = ({ message, label, variant = "dark" }: { message: string; label: string; variant?: "dark" | "light" }) => (
  <Button
    asChild
    size="lg"
    className={`rounded-none px-8 py-6 text-xs uppercase tracking-luxury ${
      variant === "dark"
        ? "bg-primary text-primary-foreground hover:bg-accent"
        : "bg-background text-primary hover:bg-secondary"
    }`}
  >
    <a href={buildWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer">
      {label} <ArrowRight className="ml-2 w-4 h-4" />
    </a>
  </Button>
);

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const SRC = "https://elfsightcdn.com/platform.js";
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border/60">
        <div className="container flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3">
            <img src={logo} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover bg-primary" />
            <span className="leading-none">
              <span className="block font-serif text-2xl tracking-luxury text-primary">ESSENZA</span>
              <span className="block font-serif italic text-xs text-muted-foreground">Studio di Bellezza</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-luxury text-muted-foreground" aria-label="Menu principal">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-accent transition-colors">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex rounded-none bg-primary text-primary-foreground hover:bg-accent text-xs uppercase tracking-luxury px-5">
              <a href={buildWhatsAppUrl("Olá! Gostaria de agendar um horário na Essenza.")} target="_blank" rel="noopener noreferrer">Agendar</a>
            </Button>
            <button type="button" className="lg:hidden p-2 text-primary" onClick={() => setMenuOpen((o) => !o)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="lg:hidden border-t border-border/60 bg-background" aria-label="Menu celular">
            <div className="container py-4 flex flex-col">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="py-3 text-sm uppercase tracking-luxury text-primary border-b border-border/40 last:border-0">
                  {n.label}
                </a>
              ))}
              <a href={buildWhatsAppUrl("Olá! Gostaria de agendar um horário na Essenza.")} target="_blank" rel="noopener noreferrer" className="mt-4 py-3 text-center bg-primary text-primary-foreground text-xs uppercase tracking-luxury">
                Agendar pelo WhatsApp
              </a>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* Abertura */}
        <section id="home" className="container grid lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-10 pb-16 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-6 order-2 lg:order-1 animate-fade-in-up">
            <Eyebrow>Salão de beleza · Fernandópolis-SP</Eyebrow>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-primary">
              Essenza Studio di Bellezza: o seu loiro, <em className="text-accent">saudável</em> e luminoso.
            </h1>
            <p className="mt-6 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
              Especialistas em loiros, mechas e balayage, com cabelo, maquiagem, unhas e sobrancelhas no mesmo lugar.
              Atendimento com hora marcada, em um ambiente feito para você se cuidar sem pressa.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <WhatsButton message="Olá! Gostaria de agendar uma avaliação capilar na Essenza." label="Agendar avaliação" />
              <Link to="/servicos" className="inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-luxury text-primary border border-primary hover:border-accent hover:text-accent transition-colors">
                Ver todos os serviços
              </Link>
            </div>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-accent">
              <span className="text-accent tracking-widest" aria-hidden>★★★★★</span>
              <span><strong className="text-primary">5.0</strong> no Google, segundo nossas clientes</span>
            </a>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            <img src={ownerStudio.url} alt="Proprietária do Essenza de blazer marrom em ensaio de estúdio" width={720} height={961} className="w-full aspect-[4/5] object-cover object-top" />
            <div className="hidden sm:block absolute -bottom-6 -left-6 bg-background px-6 py-4 border border-border">
              <p className="font-serif text-2xl text-primary">Loiro sem corte químico</p>
              <p className="text-xs uppercase tracking-luxury text-muted-foreground mt-1">Protocolo de proteção da fibra</p>
            </div>
          </div>
        </section>

        {/* Especialistas em loiro */}
        <section id="loiros" className="bg-primary text-primary-foreground scroll-mt-20">
          <div className="container grid lg:grid-cols-12 gap-10 py-20 lg:py-28 items-center">
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <img src={hair1} alt="Cabelo loiro com mechas iluminadas" loading="lazy" className="w-full aspect-[3/4] object-cover" />
              <img src={hair2} alt="Cabelo com balayage em tons de mel" loading="lazy" className="w-full aspect-[3/4] object-cover mt-10" />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-xs uppercase tracking-luxury text-secondary mb-4">Nossa especialidade</p>
              <h2 className="font-serif text-4xl sm:text-5xl leading-tight">Loiros, mechas e balayage com a fibra protegida</h2>
              <p className="mt-6 opacity-85 leading-relaxed">
                Clarear não precisa significar ressecar. Antes de começar, fazemos um teste de elasticidade e avaliamos o seu cabelo.
                Durante o processo, usamos proteção e reconstrução para que o resultado seja um loiro luminoso e com toque macio.
              </p>
              <ul className="mt-8 grid sm:grid-cols-3 gap-6 border-t border-primary-foreground/20 pt-8">
                {[
                  ["Balayage", "Iluminação natural e raiz esfumada, com menos manutenção."],
                  ["Mechas", "Loiro mais intenso e marcado, do jeito que você quer."],
                  ["Morena iluminada", "Pontos de luz suaves para quem quer mudar sem exagero."],
                ].map(([t, d]) => (
                  <li key={t}>
                    <p className="font-serif text-2xl">{t}</p>
                    <p className="mt-2 text-sm opacity-80 leading-relaxed">{d}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <WhatsButton variant="light" message="Olá! Quero fazer uma avaliação para loiro/mechas na Essenza." label="Quero meu loiro" />
              </div>
            </div>
          </div>
        </section>

        {/* Sobre a proprietária */}
        <section id="sobre" className="container py-20 lg:py-28 scroll-mt-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 grid grid-cols-5 gap-4">
              <img src={ownerPortrait.url} alt="Retrato da proprietária do Essenza com cabelo acobreado ondulado" loading="lazy" className="col-span-3 w-full aspect-[3/4] object-cover" />
              <img src={ownerSalon.url} alt="Proprietária do Essenza diante dos espelhos em arco iluminados do salão" loading="lazy" className="col-span-2 w-full aspect-[3/4] object-cover object-top self-end" />
            </div>
            <div className="lg:col-span-5">
              <Eyebrow>Quem cuida de você</Eyebrow>
              <h2 className="font-serif text-4xl sm:text-5xl text-primary leading-tight">Um salão com a <em className="text-accent">essência</em> de quem o criou</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                O Essenza nasceu do olhar da sua proprietária para a beleza que valoriza quem você já é.
                Cada detalhe do espaço, dos espelhos em arco à luz quente, foi pensado para você chegar, desacelerar e sair se sentindo única.
              </p>
              <div className="mt-8">
                <WhatsButton message="Olá! Gostaria de agendar um horário na Essenza." label="Agendar meu horário" />
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="container py-20 lg:py-28 scroll-mt-20">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <Eyebrow>Serviços</Eyebrow>
              <h2 className="font-serif text-4xl sm:text-5xl text-primary leading-tight">Tudo para você sair pronta</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Resolva cabelo, unhas, maquiagem e sobrancelhas em uma única visita. Toque em uma área para ver o catálogo completo.
              </p>
              <Link to="/servicos" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-accent hover:text-primary">
                Catálogo completo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-8 divide-y divide-border border-y border-border">
              {SERVICES.map((s) => (
                <Link key={s.title} to={`/servicos?categoria=${s.catalog}`} className="group grid sm:grid-cols-12 gap-2 sm:gap-6 py-7 items-baseline">
                  <h3 className="sm:col-span-4 font-serif text-3xl text-primary group-hover:text-accent transition-colors">{s.title}</h3>
                  <p className="sm:col-span-7 text-muted-foreground leading-relaxed">{s.text}</p>
                  <ArrowRight className="hidden sm:block sm:col-span-1 w-5 h-5 text-accent justify-self-end transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Noivas */}
        <section id="noivas" className="bg-secondary scroll-mt-20">
          <div className="container grid lg:grid-cols-2 gap-10 py-20 lg:py-24 items-center">
            <div>
              <Eyebrow>Noivas e madrinhas</Eyebrow>
              <h2 className="font-serif text-4xl sm:text-5xl text-primary leading-tight">Pronta para o grande dia</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
                Penteado, maquiagem e unhas planejados com antecedência, com prova antes do evento.
                Para a noiva, as madrinhas e as convidadas que querem chegar seguras e bonitas.
              </p>
              <div className="mt-8">
                <WhatsButton message="Olá! Gostaria de informações sobre o atendimento para noivas/madrinhas." label="Planejar meu dia" />
              </div>
            </div>
            <img src={ownerSmiling.url} alt="Proprietária do Essenza sorrindo, com cabelo ondulado e maquiagem iluminada" loading="lazy" className="w-full aspect-[4/5] object-cover object-top" />
          </div>
        </section>

        {/* Vídeos */}
        <section id="videos" className="bg-primary text-primary-foreground scroll-mt-20">
          <div className="container py-20 lg:py-28">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-luxury text-secondary mb-4">Por dentro do Essenza</p>
              <h2 className="font-serif text-4xl sm:text-5xl leading-tight">Veja o salão em movimento</h2>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-4xl">
              {[clip1, clip2].map((c, i) => (
                <video key={c.url} src={c.url} controls muted loop playsInline autoPlay preload="metadata" aria-label={`Vídeo do salão Essenza ${i + 1}`} className="w-full aspect-[9/16] object-cover bg-foreground" />
              ))}
            </div>
          </div>
        </section>

        {/* Por que a Essenza */}
        <section className="container py-20 lg:py-28">
          <div className="max-w-2xl">
            <Eyebrow>Por que a Essenza</Eyebrow>
            <h2 className="font-serif text-4xl sm:text-5xl text-primary leading-tight">Cuidado que você sente quando entra e quando sai</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {REASONS.map((r) => (
              <div key={r.n} className="border-t border-primary pt-6">
                <p className="font-serif text-accent text-xl">{r.n}</p>
                <h3 className="mt-3 font-serif text-2xl text-primary">{r.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Avaliações */}
        <section id="avaliacoes" className="bg-primary text-primary-foreground scroll-mt-20">
          <div className="container py-20 lg:py-28">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-luxury text-secondary mb-4">Avaliações no Google</p>
                <h2 className="font-serif text-4xl sm:text-5xl">Nota 5.0, contada pelas clientes</h2>
              </div>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-luxury text-secondary hover:text-primary-foreground inline-flex items-center gap-2">
                Ver todas no Google <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
              {REVIEWS.map((r) => (
                <figure key={r.a} className="border-l border-secondary/50 pl-6">
                  <span className="text-secondary tracking-widest text-sm" aria-label="5 estrelas">★★★★★</span>
                  <blockquote className="mt-3 font-serif text-xl leading-snug">“{r.q}”</blockquote>
                  <figcaption className="mt-4 text-xs uppercase tracking-luxury opacity-75">{r.a}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram */}
        <section id="instagram" className="container py-20 lg:py-24 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <Eyebrow>Instagram</Eyebrow>
              <h2 className="font-serif text-4xl sm:text-5xl text-primary">Resultados reais do salão</h2>
            </div>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-accent hover:text-primary">
              <Instagram className="w-4 h-4" /> @essenzastudiodibellezza
            </a>
          </div>
          <div className="elfsight-app-4d9661ae-25f6-403c-8968-206273d82bc7 min-h-[300px]" data-elfsight-app-lazy />
        </section>

        {/* Dúvidas */}
        <section id="faq" className="bg-secondary scroll-mt-20">
          <div className="container grid lg:grid-cols-12 gap-10 py-20 lg:py-24">
            <div className="lg:col-span-4">
              <Eyebrow>Dúvidas frequentes</Eyebrow>
              <h2 className="font-serif text-4xl sm:text-5xl text-primary leading-tight">Antes de clarear, a gente explica</h2>
            </div>
            <Accordion type="single" collapsible defaultValue="faq-0" className="lg:col-span-8 border-t border-primary/20">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={item.question} value={`faq-${i}`} className="border-primary/20">
                  <AccordionTrigger className="py-6 text-left font-serif text-xl sm:text-2xl text-primary hover:no-underline hover:text-accent">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Localização e chamada final */}
        <section id="contato" className="container py-20 lg:py-28 scroll-mt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img src={salonInterior} alt="Recepção do salão Essenza com balcão de madeira e luz indireta" loading="lazy" width={960} height={720} className="w-full aspect-[4/3] object-cover" />
            <div>
              <Eyebrow>Agende seu horário</Eyebrow>
              <h2 className="font-serif text-4xl sm:text-5xl text-primary leading-tight">Reserve seu momento Essenza</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Fale com a gente pelo WhatsApp, conte o que você deseja e nós encontramos o melhor horário para você.
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <a href={MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-accent">{ADDRESS_DISPLAY}</a>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <a href={buildWhatsAppUrl("Olá! Gostaria de agendar um horário na Essenza.")} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    WhatsApp {WHATSAPP_DISPLAY}
                  </a>
                </li>
              </ul>
              <div className="mt-10">
                <WhatsButton message="Olá! Gostaria de agendar um horário na Essenza." label="Agendar pelo WhatsApp" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span className="font-serif text-base text-primary tracking-luxury">ESSENZA · Studio di Bellezza</span>
          <span>© {new Date().getFullYear()} Fernandópolis-SP. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
