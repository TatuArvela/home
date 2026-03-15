function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function isDeliveryDay(date: Date, isEvenWeek: boolean): boolean {
  const day = date.getDay();
  // Even weeks: Monday (1), Wednesday (3), Friday (5)
  // Odd weeks:  Tuesday (2), Thursday (4)
  return isEvenWeek ? day === 1 || day === 3 || day === 5 : day === 2 || day === 4;
}

function calculateMailDelivery(inputDate: Date, isNext: boolean): Date {
  const dayModifier = isNext ? 1 : -1;
  let resultDate = isNext ? addDays(inputDate, 1) : new Date(inputDate);

  let weekNumber = getWeekNumber(resultDate);
  let isEvenWeek = weekNumber % 2 === 0;

  while (
    !isDeliveryDay(resultDate, isEvenWeek) ||
    (isNext && resultDate <= inputDate)
  ) {
    resultDate = addDays(resultDate, dayModifier);
    weekNumber = getWeekNumber(resultDate);
    isEvenWeek = weekNumber % 2 === 0;
  }

  return resultDate;
}

export function getLastMailDelivery(today: Date): Date {
  return calculateMailDelivery(today, false);
}

export function getNextMailDelivery(today: Date): Date {
  return calculateMailDelivery(today, true);
}
