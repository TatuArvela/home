import GarbageCard from "./features/garbage/GarbageCard";
import MailCard from "./features/mail/MailCard";

export default function App() {
  return (
    <div className="min-h-dvh font-sans grid grid-cols-1 md:grid-cols-2 gap-5 p-5 content-start bg-apple-page-bg text-apple-label">
      <GarbageCard />
      <MailCard />
    </div>
  );
}
