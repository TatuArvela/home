import Card from "../../shared/Card";
import DateDisplay from "../../shared/DateDisplay";
import { getToday } from "../../shared/dates";
import { getLastGarbagePickup, getNextGarbagePickup } from "./garbage";

export default function GarbageCard() {
  const today = getToday();
  const last = getLastGarbagePickup(today);
  const next = getNextGarbagePickup(last);

  return (
    <Card title="Roskien nouto" accentClassName="text-apple-blue">
      <DateDisplay date={last} today={today} />
      <DateDisplay date={next} today={today} />
    </Card>
  );
}
