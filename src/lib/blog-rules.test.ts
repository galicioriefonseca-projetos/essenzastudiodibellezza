import { expect, it } from "vitest";
import { localPublicationDay, shouldPause } from "../../supabase/functions/daily-blog/rules";
it("uses São Paulo's day for daily publication, including UTC midnight", () => {
  expect(localPublicationDay(new Date("2026-11-17T01:22:00Z"))).toBe("2026-11-16");
  expect(localPublicationDay(new Date("2026-11-17T12:00:00Z"))).toBe("2026-11-17");
});
it("pauses automated AI work on credit, access and exhausted rate-limit failures", () => {
  expect([402, 403, 429].map(shouldPause)).toEqual([true, true, true]);
  expect(shouldPause(500)).toBe(false);
});