import Card from "../../shared/Card";
import DateDisplay from "../../shared/DateDisplay";
import { getToday } from "../../shared/dates";
import { getLastMailDelivery, getNextMailDelivery } from "./mail";

export default function MailCard() {
  const today = getToday();
  const last = getLastMailDelivery(today);
  const next = getNextMailDelivery(today);

  return (
    <Card title="Postin jakelu" accentClassName="text-apple-orange">
      <DateDisplay date={last} today={today} />
      <DateDisplay date={next} today={today} />
    </Card>
  );
}
