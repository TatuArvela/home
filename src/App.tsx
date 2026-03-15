import GarbageCard from "./features/garbage/GarbageCard";
import MailCard from "./features/mail/MailCard";
import { gardenTasks } from "./features/tasks/garden.config";
import { houseTasks } from "./features/tasks/house.config";
import TasksCard from "./features/tasks/TasksCard";

export default function App() {
  return (
    <div className="min-h-dvh font-sans columns-1 md:columns-2 lg:columns-3 gap-5 p-5 bg-apple-page-bg text-apple-label">
      <GarbageCard />
      <MailCard />
      <TasksCard title="Koti" accentClassName="text-apple-red" tasks={houseTasks} storageKey="house" />
      <TasksCard title="Puutarha" accentClassName="text-apple-green" tasks={gardenTasks} storageKey="garden" />
    </div>
  );
}
