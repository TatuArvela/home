export function getToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function formatDateSimple(date: Date): string {
  const formatted = date.toLocaleDateString("fi-FI", {
    weekday: "long",
    month: "numeric",
    day: "numeric",
  });
  return `${formatted.substring(0, 1).toUpperCase()}${formatted.substring(1)}`;
}

export function formatDateInfo(targetDate: Date, today: Date): string {
  const diffDays = Math.ceil(
    (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Today
  if (diffDays === 0) return "Tänään";

  // Future
  if (diffDays === 1) return "Huomenna";
  if (diffDays === 2) return "Ylihuomenna";
  if (diffDays >= 3 && diffDays <= 6) return `${diffDays} päivän päästä`;
  if ([7, 14, 21, 28, 35, 42].includes(diffDays))
    return `${diffDays / 7} viikon päästä`;
  if (diffDays > 7 && diffDays < 42)
    return `Alle ${Math.ceil(diffDays / 7)} viikon päästä`;
  if (diffDays >= 30 && diffDays <= 31) return "Kuukauden päästä";

  // Past
  if (diffDays === -1) return "Eilen";
  if (diffDays <= -2 && diffDays >= -6)
    return `${Math.abs(diffDays)} päivää sitten`;
  if ([-7, -14, -21, -28, -35, -42].includes(diffDays))
    return `${Math.abs(diffDays) / 7} viikkoa sitten`;
  if (diffDays < -7 && diffDays > -42)
    return `Alle ${Math.ceil(Math.abs(diffDays) / 7)} viikkoa sitten`;
  if (diffDays <= -30 && diffDays >= -31) return "Kuukausi sitten";

  return "";
}
