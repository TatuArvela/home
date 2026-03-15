import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Card from "../../shared/Card";
import TaskBullet from "./TaskBullet";
import type { MonthlyTaskList } from "./tasks";
import { getMonthlyTasks } from "./tasks";

interface TasksCardProps {
  title: string;
  accentClassName: string;
  tasks: MonthlyTaskList;
  storageKey: string;
}

function formatPeriod(month: number, year: number) {
  const name = new Date(year, month - 1, 1).toLocaleDateString("fi-FI", {
    month: "long",
  });
  return { month: name, year: String(year) };
}

const bgAccentMap: Record<string, string> = {
  "text-apple-red": "bg-apple-red",
  "text-apple-orange": "bg-apple-orange",
  "text-apple-green": "bg-apple-green",
  "text-apple-blue": "bg-apple-blue",
};

const baseButtonClass =
  "rounded-full bg-black/5 dark:bg-white/10 text-apple-label active:bg-black/20 dark:active:bg-white/30";
const circleButtonClass = `${baseButtonClass} size-6 flex items-center justify-center`;
const pillButtonClass = `${baseButtonClass} h-6 flex items-center px-4 text-[13px]`;

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 8 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -8 }),
};

const slideTransition = {
  x: { type: "spring", stiffness: 400, damping: 38 },
  opacity: { duration: 0.2, ease: "easeInOut" },
} as const;

type CompletionRecord = Record<string, string[]>;

function loadCompletion(storageKey: string): CompletionRecord {
  try {
    const stored = localStorage.getItem(`tasks:${storageKey}`);
    return stored ? (JSON.parse(stored) as CompletionRecord) : {};
  } catch {
    return {};
  }
}

export default function TasksCard({ title, accentClassName, tasks, storageKey }: TasksCardProps) {
  const today = new Date();
  const [period, setPeriod] = useState({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });
  const [direction, setDirection] = useState(0);
  const [completion, setCompletion] = useState<CompletionRecord>(() =>
    loadCompletion(storageKey),
  );

  const periodKey = `${period.year}-${period.month}`;
  const completedIds = new Set(completion[periodKey] ?? []);

  function toggleTask(id: string) {
    setCompletion((prev) => {
      const current = new Set(prev[periodKey] ?? []);
      if (current.has(id)) current.delete(id);
      else current.add(id);
      const next = { ...prev, [periodKey]: [...current] };
      localStorage.setItem(`tasks:${storageKey}`, JSON.stringify(next));
      return next;
    });
  }

  function prevMonth() {
    setDirection(-1);
    setPeriod(({ month, year }) =>
      month === 1 ? { month: 12, year: year - 1 } : { month: month - 1, year },
    );
  }

  function nextMonth() {
    setDirection(1);
    setPeriod(({ month, year }) =>
      month === 12 ? { month: 1, year: year + 1 } : { month: month + 1, year },
    );
  }

  function goToToday() {
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();
    setDirection(
      todayYear !== period.year
        ? todayYear > period.year ? 1 : -1
        : todayMonth > period.month ? 1 : -1,
    );
    setPeriod({ month: todayMonth, year: todayYear });
  }

  const { month: monthName, year: yearStr } = formatPeriod(period.month, period.year);
  const currentTasks = getMonthlyTasks(tasks, period.month);

  return (
    <Card title={title} accentClassName={accentClassName}>
      <div className="-mt-4 flex items-start justify-between">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.span
            key={`title-${period.month}-${period.year}`}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            transition={slideTransition}
            className="text-2xl"
          >
            <strong>{monthName}</strong> {yearStr}
          </motion.span>
        </AnimatePresence>
        <div className="mt-2 flex items-center gap-1">
          <button type="button" onClick={prevMonth} className={circleButtonClass}>
            <ChevronLeftIcon className="size-5" />
          </button>
          <button type="button" onClick={goToToday} className={pillButtonClass}>
            Tänään
          </button>
          <button type="button" onClick={nextMonth} className={circleButtonClass}>
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </div>
      <div>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={`tasks-${period.month}-${period.year}`}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            transition={slideTransition}
          >
            {currentTasks.length > 0 ? (
              <ul className="flex flex-col gap-2 text-sm leading-tight">
                {currentTasks.map((task) => (
                  <li key={task.id}>
                    <button
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      className="flex items-start gap-1.5 w-full text-left"
                    >
                      <TaskBullet completed={completedIds.has(task.id)} bgAccentClassName={bgAccentMap[accentClassName] ?? "bg-apple-blue"} />
                      <span>{task.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-apple-secondary-label leading-tight">Ei tehtäviä</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
}
