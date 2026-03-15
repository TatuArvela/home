import { describe, expect, it } from "vitest";
import { getLastGarbagePickup, getNextGarbagePickup } from "./garbage";

function date(str: string): Date {
  const d = new Date(str);
  d.setHours(0, 0, 0, 0);
  return d;
}

const SIX_WEEKS_MS = 6 * 7 * 24 * 60 * 60 * 1000;

describe("getLastGarbagePickup", () => {
  it("returns the last confirmed pickup if today is before the next one", () => {
    // Last confirmed: 2024-05-04, next would be 2024-06-15
    const result = getLastGarbagePickup(date("2024-06-14"));
    expect(result.getTime()).toBe(date("2024-05-04").getTime());
  });

  it("advances past the confirmed pickup when enough time has passed", () => {
    // 2024-06-15 = 2024-05-04 + 42 days, so last = 2024-06-15
    const result = getLastGarbagePickup(date("2024-06-20"));
    expect(result.getTime()).toBe(date("2024-06-15").getTime());
  });

  it("returns the pickup on the day of pickup itself", () => {
    const result = getLastGarbagePickup(date("2024-06-15"));
    expect(result.getTime()).toBe(date("2024-05-04").getTime());
  });
});

describe("getNextGarbagePickup", () => {
  it("returns exactly 6 weeks after the last pickup", () => {
    const last = date("2024-05-04");
    const next = getNextGarbagePickup(last);
    expect(next.getTime()).toBe(last.getTime() + SIX_WEEKS_MS);
    expect(next.getTime()).toBe(date("2024-06-15").getTime());
  });
});
