import { CheckIcon } from "@heroicons/react/20/solid";

interface TaskBulletProps {
  completed: boolean;
  bgAccentClassName: string;
}

export default function TaskBullet({ completed, bgAccentClassName }: TaskBulletProps) {
  if (completed) {
    return (
      <span className={`size-4 rounded-full shrink-0 mt-px flex items-center justify-center ${bgAccentClassName}`}>
        <CheckIcon className="size-3 text-apple-page-bg" />
      </span>
    );
  }
  return (
    <span className="size-4 rounded-full border border-neutral-300 dark:border-neutral-500 shrink-0 mt-px" />
  );
}
