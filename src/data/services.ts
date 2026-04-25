import { Scissors, Hand, Eye, Brush, Sparkles, ShoppingBag, type LucideIcon } from "lucide-react";

export type ServiceCategoryId =
  | "cabeleireiro"
  | "manicure"
  | "sobrancelhas"
  | "maquiagem"
  | "salao"
  | "loja";

export interface Service {
  name: string;
  description: string;
  category: ServiceCategoryId;
}

export interface ServiceCategory {
  id: ServiceCategoryId;
  title: string;
  icon: LucideIcon;
  tagline: string;
}

export const categories: ServiceCategory[] = [
  { id: "cabeleireiro", title: "Cabeleireiro", icon: Scissors, tagline: "Cortes, colorações e tratamentos capilares de assinatura." },
  { id: "manicure", title: "Manicure & Pedicure", icon: Hand, tagline: "Cuidado impecável para mãos e pés, com higiene de alto padrão." },
  { id: "sobrancelhas", title: "Sobrancelhas & Cílios", icon: Eye, tagline: "Olhar marcante com técnicas modernas de design e laminação." },
  { id: "maquiagem", title: "Estúdio de Maquiagem", icon: Brush, tagline: "Maquiagem profissional para eventos, formaturas e noivas." },
  { id: "salao", title: "Experiências do Salão", icon: Sparkles, tagline: "Atendimentos exclusivos pensados para cada momento." },
  { id: "loja", title: "Loja de Produtos", icon: ShoppingBag, tagline: "Produtos profissionais selecionados para prolongar seu cuidado em casa." },
];

export const services: Service[] = [
  // Cabeleireiro
  { category: "cabeleireiro", name: "Corte feminino", description: "Corte personalizado pelo método Tesoura de Diamante, respeitando seu rosto e estilo." },
  { category: "cabeleireiro", name: "Escova profissional", description: "Acabamento impecável, brilho e durabilidade para o dia a dia ou ocasiões especiais." },
  { category: "cabeleireiro", name: "Balayage", description: "Iluminação natural e sofisticada, personalizada para o seu tom de pele." },
  { category: "cabeleireiro", name: "Mechas e luzes", description: "Mechas sob medida para um resultado natural, elegante e duradouro." },
  { category: "cabeleireiro", name: "Coloração", description: "Coloração profissional com tonalizações precisas e cuidado com a saúde dos fios." },
  { category: "cabeleireiro", name: "Cabelo ombré", description: "Transição de cor suave e moderna, valorizando o movimento do cabelo." },
  { category: "cabeleireiro", name: "Apliques de cabelo", description: "Aplicação profissional com naturalidade, conforto e harmonia visual." },
  { category: "cabeleireiro", name: "Permanente", description: "Criação ou definição de cachos com técnica que respeita a saúde dos fios." },
  { category: "cabeleireiro", name: "Alisamento e queratina", description: "Tratamentos com queratina para fios alinhados, brilhantes e saudáveis." },
  { category: "cabeleireiro", name: "Cuidados para cachos", description: "Hidratação e finalização especializada para cabelos cacheados." },
  { category: "cabeleireiro", name: "Tratamento para crescimento", description: "Protocolos específicos para fortalecer e estimular o crescimento capilar." },
  { category: "cabeleireiro", name: "Tranças", description: "Tranças clássicas e modernas com acabamento delicado." },
  { category: "cabeleireiro", name: "Penteados", description: "Penteados sofisticados para festas, formaturas e ocasiões especiais." },
  { category: "cabeleireiro", name: "Penteado de noiva", description: "Penteado exclusivo para o seu grande dia, com prova prévia opcional." },

  // Manicure & Pedicure
  { category: "manicure", name: "Manicure", description: "Alto padrão de higiene e acabamento impecável em cada detalhe." },
  { category: "manicure", name: "Pedicure", description: "Estética, bem-estar e saúde dos pés com profissionais qualificados." },
  { category: "manicure", name: "Pedicure sem água", description: "Técnica higiênica e moderna, sem o uso de água, com excelente acabamento." },
  { category: "manicure", name: "Alongamento de unhas", description: "Alongamento natural e resistente, sob medida para o seu estilo." },
  { category: "manicure", name: "Unhas em gel", description: "Unhas em gel com brilho intenso e longa duração." },
  { category: "manicure", name: "Unhas acrílicas", description: "Unhas acrílicas modeladas com precisão e acabamento refinado." },
  { category: "manicure", name: "Unhas esculpidas", description: "Esculpidas no formato desejado, incluindo o formato stiletto." },
  { category: "manicure", name: "Esmalte em pó", description: "Acabamento durável, leve e com cores vibrantes." },
  { category: "manicure", name: "Francesinha", description: "O clássico atemporal com traçado preciso e elegante." },
  { category: "manicure", name: "Nail art", description: "Decorações personalizadas com técnicas modernas de design de unhas." },
  { category: "manicure", name: "Corte e lixa", description: "Cuidado essencial para unhas saudáveis e bem cuidadas." },
  { category: "manicure", name: "Esfoliação e hidratação", description: "Tratamento revitalizante para mãos e pés macios." },
  { category: "manicure", name: "Massagem para mãos e pés", description: "Relaxamento e bem-estar em uma experiência completa." },
  { category: "manicure", name: "Troca de esmalte", description: "Atendimento rápido para renovar o visual entre os cuidados completos." },
  { category: "manicure", name: "Reparo e remoção", description: "Reparo de unhas e remoção segura de postiças, gel e acrílico." },
  { category: "manicure", name: "Manicure infantil", description: "Cuidado leve, lúdico e seguro para as pequenas." },
  { category: "manicure", name: "Manicure masculina", description: "Higienização e acabamento discreto para mãos sempre apresentáveis." },

  // Sobrancelhas & Cílios
  { category: "sobrancelhas", name: "Design de sobrancelhas", description: "Design personalizado para realçar a sua expressão facial e identidade." },
  { category: "sobrancelhas", name: "Design com linha", description: "Técnica de epilação com linha para um traçado definido e duradouro." },
  { category: "sobrancelhas", name: "Brow lamination", description: "Alinhamento moderno que valoriza o formato natural das sobrancelhas." },
  { category: "sobrancelhas", name: "Embelezamento de sobrancelhas", description: "Procedimento completo com simetria, naturalidade e técnica profissional." },
  { category: "sobrancelhas", name: "Permanente de cílios", description: "Curvatura definida e olhar marcante por semanas, sem produtos diários." },

  // Maquiagem
  { category: "maquiagem", name: "Maquiagem para eventos", description: "Acabamento sofisticado e alta durabilidade para festas e formaturas." },
  { category: "maquiagem", name: "Maquiagem para noivas", description: "Beleza atemporal, prova prévia e acabamento à prova de emoção." },
  { category: "maquiagem", name: "Maquiagem social", description: "Visual elegante para encontros, jantares e ocasiões especiais." },

  // Experiências do Salão
  { category: "salao", name: "Atendimento VIP", description: "Experiência exclusiva, com privacidade, conforto e serviços personalizados." },
  { category: "salao", name: "Salão infantil", description: "Ambiente acolhedor para cortes e cuidados leves para crianças." },
  { category: "salao", name: "Atendimento noturno", description: "Flexibilidade de horário sem abrir mão da exclusividade Essenza." },
  { category: "salao", name: "Agendamento on-line", description: "Reserve seu horário com praticidade pelo WhatsApp." },

  // Loja
  { category: "loja", name: "Linha capilar profissional", description: "Produtos selecionados para prolongar tratamentos e cuidados em casa." },
  { category: "loja", name: "Cosméticos e finalizadores", description: "Curadoria de itens para potencializar o seu visual no dia a dia." },
  { category: "loja", name: "Cuidados para unhas", description: "Esmaltes, hidratantes e essenciais para manter as unhas perfeitas." },
  { category: "loja", name: "Indicações personalizadas", description: "Recomendações exclusivas das nossas profissionais para o seu perfil." },
];
