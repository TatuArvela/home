import { describe, expect, it } from "vitest";
import { getLastMailDelivery, getNextMailDelivery } from "./mail";

function date(str: string): Date {
  const d = new Date(str);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Week 24 of 2024 (even): Mon 10, Wed 12, Fri 14 June → delivery days
// Week 25 of 2024 (odd):  Tue 18, Thu 20 June → delivery days
// Week 26 of 2024 (even): Mon 24, Wed 26, Fri 28 June → delivery days

describe("getLastMailDelivery", () => {
  it("returns today if today is a delivery day (even week, Monday)", () => {
    // 2024-06-10 = week 24 (even), Monday
    const result = getLastMailDelivery(date("2024-06-10"));
    expect(result.getTime()).toBe(date("2024-06-10").getTime());
  });

  it("returns previous delivery day from a non-delivery day", () => {
    // 2024-06-11 = week 24 (even), Tuesday — not a delivery day (even weeks: MWF)
    const result = getLastMailDelivery(date("2024-06-11"));
    expect(result.getTime()).toBe(date("2024-06-10").getTime());
  });

  it("crosses week boundary to find previous delivery", () => {
    // 2024-06-17 = week 25 (odd), Monday — not a delivery day (odd weeks: TTh)
    // Last delivery should be Friday 2024-06-14 (week 24, even)
    const result = getLastMailDelivery(date("2024-06-17"));
    expect(result.getTime()).toBe(date("2024-06-14").getTime());
  });
});

describe("getNextMailDelivery", () => {
  it("returns next delivery day from a non-delivery day", () => {
    // 2024-06-11 = week 24 (even), Tuesday → next is Wednesday 2024-06-12
    const result = getNextMailDelivery(date("2024-06-11"));
    expect(result.getTime()).toBe(date("2024-06-12").getTime());
  });

  it("returns next day when today is a delivery day", () => {
    // 2024-06-10 = Monday (even week) → next is Wednesday 2024-06-12
    const result = getNextMailDelivery(date("2024-06-10"));
    expect(result.getTime()).toBe(date("2024-06-12").getTime());
  });

  it("crosses week boundary to find next delivery", () => {
    // 2024-06-14 = Friday (even week 24) → next is Tuesday 2024-06-18 (odd week 25)
    const result = getNextMailDelivery(date("2024-06-14"));
    expect(result.getTime()).toBe(date("2024-06-18").getTime());
  });
});
