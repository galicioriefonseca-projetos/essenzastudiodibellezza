import { describe, expect, it } from "vitest";
import {
  ADDRESS_DISPLAY,
  WHATSAPP_DISPLAY,
  WHATSAPP_PHONE,
  buildWhatsAppUrl,
} from "./whatsapp";

describe("WhatsApp contact", () => {
  it("uses the studio number (17) 99673-3303", () => {
    expect(WHATSAPP_PHONE).toBe("5517996733303");
    expect(WHATSAPP_DISPLAY).toBe("(17) 99673-3303");
  });

  it("builds a direct api.whatsapp.com link without a message", () => {
    expect(buildWhatsAppUrl()).toBe("https://api.whatsapp.com/send?phone=5517996733303");
  });

  it("pre-fills an accent-safe message", () => {
    const url = buildWhatsAppUrl("Olá! Gostaria de agendar um horário no Essenza.");
    expect(url).toBe(
      "https://api.whatsapp.com/send?phone=5517996733303&text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio%20no%20Essenza.",
    );
  });

  it("shows the full studio address", () => {
    expect(ADDRESS_DISPLAY).toBe(
      "Rua Rafael de Oliveira, 645 - Box 5, Jardim Santa Helena, Fernandópolis/SP",
    );
  });
});
