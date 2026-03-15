import type { ReactNode } from "react";

interface CardProps {
  title: string;
  accentClassName: string;
  children: ReactNode;
}

export default function Card({ title, accentClassName, children }: CardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-[14px] shadow-[2px_4px_12px_rgba(0,0,0,0.08)] flex flex-col p-5">
      <h2
        className={`${accentClassName} text-[28px] leading-tight font-semibold mb-4.5 wrap-break-word hyphens-auto`}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-4.5">{children}</div>
    </div>
  );
}
