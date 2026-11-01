// Fonte única do contato por WhatsApp do Essenza Studio di Bellezza.
export const WHATSAPP_PHONE = "5517996733303";
export const WHATSAPP_DISPLAY = "(17) 99673-3303";
export const ADDRESS_DISPLAY =
  "Rua Rafael de Oliveira, 645 - Box 5, Jardim Santa Helena, Fernandópolis/SP";

export const buildWhatsAppUrl = (message?: string) => {
  const base = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}`;
  return message ? `${base}&text=${encodeURIComponent(message)}` : base;
};
