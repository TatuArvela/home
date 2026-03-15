const LAST_CONFIRMED_PICKUP = new Date("2024-05-04");
LAST_CONFIRMED_PICKUP.setHours(0, 0, 0, 0);

const INTERVAL_MS = 6 * 7 * 24 * 60 * 60 * 1000; // 6 weeks in ms

function addInterval(date: Date): Date {
  return new Date(date.getTime() + INTERVAL_MS);
}

export function getLastGarbagePickup(today: Date): Date {
  let last = new Date(LAST_CONFIRMED_PICKUP);

  while (true) {
    const next = addInterval(last);
    if (next > today) return last;
    last = next;
  }
}

export function getNextGarbagePickup(last: Date): Date {
  return addInterval(last);
}
