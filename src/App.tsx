import GarbageCard from "./features/garbage/GarbageCard";
import MailCard from "./features/mail/MailCard";

export default function App() {
  return (
    <div className="h-dvh font-sans flex flex-col gap-5 p-5 bg-neutral-100 dark:bg-black text-neutral-900 dark:text-neutral-50">
      <GarbageCard />
      <MailCard />
    </div>
  );
}
