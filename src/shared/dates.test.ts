import { describe, expect, it } from "vitest";
import { formatDateInfo, formatDateSimple } from "./dates";

const today = new Date("2024-06-12");
today.setHours(0, 0, 0, 0);

function daysFromToday(n: number): Date {
  return new Date(today.getTime() + n * 24 * 60 * 60 * 1000);
}

describe("formatDateSimple", () => {
  it("capitalizes the first letter", () => {
    const result = formatDateSimple(new Date("2024-06-12"));
    expect(result[0]).toBe(result[0].toUpperCase());
  });

  it("formats in Finnish locale", () => {
    const result = formatDateSimple(new Date("2024-06-12"));
    expect(result).toMatch(/kesäkuu|6\.|ke/i);
  });
});

describe("formatDateInfo", () => {
  it("returns Tänään for today", () => {
    expect(formatDateInfo(daysFromToday(0), today)).toBe("Tänään");
  });

  it("returns Huomenna for tomorrow", () => {
    expect(formatDateInfo(daysFromToday(1), today)).toBe("Huomenna");
  });

  it("returns Ylihuomenna for day after tomorrow", () => {
    expect(formatDateInfo(daysFromToday(2), today)).toBe("Ylihuomenna");
  });

  it("returns days for 3-6 days ahead", () => {
    expect(formatDateInfo(daysFromToday(3), today)).toBe("3 päivän päästä");
    expect(formatDateInfo(daysFromToday(6), today)).toBe("6 päivän päästä");
  });

  it("returns exact weeks for 7, 14, 21, 28, 35, 42 days", () => {
    expect(formatDateInfo(daysFromToday(7), today)).toBe("1 viikon päästä");
    expect(formatDateInfo(daysFromToday(14), today)).toBe("2 viikon päästä");
    expect(formatDateInfo(daysFromToday(42), today)).toBe("6 viikon päästä");
  });

  it("returns Alle N viikon päästä for non-exact weeks 8-41 days", () => {
    expect(formatDateInfo(daysFromToday(8), today)).toBe(
      "Alle 2 viikon päästä",
    );
    expect(formatDateInfo(daysFromToday(13), today)).toBe(
      "Alle 2 viikon päästä",
    );
    expect(formatDateInfo(daysFromToday(41), today)).toBe(
      "Alle 6 viikon päästä",
    );
  });

  it("returns Eilen for yesterday", () => {
    expect(formatDateInfo(daysFromToday(-1), today)).toBe("Eilen");
  });

  it("returns days ago for 2-6 days past", () => {
    expect(formatDateInfo(daysFromToday(-2), today)).toBe("2 päivää sitten");
    expect(formatDateInfo(daysFromToday(-6), today)).toBe("6 päivää sitten");
  });

  it("returns exact weeks ago for -7, -14, -21, -28, -35, -42 days", () => {
    expect(formatDateInfo(daysFromToday(-7), today)).toBe("1 viikkoa sitten");
    expect(formatDateInfo(daysFromToday(-42), today)).toBe("6 viikkoa sitten");
  });

  it("returns Alle N viikkoa sitten for non-exact past weeks", () => {
    expect(formatDateInfo(daysFromToday(-8), today)).toBe(
      "Alle 2 viikkoa sitten",
    );
  });
});
