import { formatDateInfo, formatDateSimple } from "./dates";

interface DateDisplayProps {
  date: Date;
  today: Date;
}

export default function DateDisplay({ date, today }: DateDisplayProps) {
  return (
    <div className="text-sm leading-tight font-normal">
      <div className="font-semibold mb-0.5">{formatDateSimple(date)}</div>
      <div className="text-muted">{formatDateInfo(date, today)}</div>
    </div>
  );
}
