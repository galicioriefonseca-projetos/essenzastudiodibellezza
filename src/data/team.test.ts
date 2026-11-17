import { describe, expect, it } from "vitest";
import { team } from "./team";

describe("Salon team supplied by the owner", () => {
  it("contains all twelve professionals with distinct photos", () => {
    expect(team).toHaveLength(12);
    expect(new Set(team.map((person) => person.photo)).size).toBe(12);
  });

  it.each([
    ["Maria Eduarda Souza da Silva", "Cabeleireira", ["Escovista", "Colorista"]],
    ["Jonas Alves", "Cabeleireiro", []],
    ["Janaina Araújo", "Manicure", []],
    ["Flavio", "Colorista", []],
    ["Gislaine Aparecida Carrinho", "Manicure", ["Cabeleireira", "Penteadista"]],
    ["Greici de Oliveira Severo", "Maquiadora", ["Designer de sobrancelhas", "Brow lamination"]],
    ["Leticia Guimarães", "Recepcionista", []],
    ["Sadafia Arielly Santos Negromonte", "Maquiadora", ["Designer de sobrancelhas"]],
    ["Heleane Silva Paulino Ramos", "Gerente", []],
    ["Willian Ferreira da Silva", "Cabeleireiro", []],
    ["Eduardo Mafra", "Cabeleireiro", []],
    ["Natiele Carvalho Valadao", "Maquiadora", ["Designer de sobrancelhas", "Brow lamination"]],
  ])("preserves the supplied functions for %s", (name, role, specialties) => {
    expect(team.find((person) => person.name === name)).toMatchObject({ role, specialties });
  });
});