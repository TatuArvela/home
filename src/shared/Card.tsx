import type { ReactNode } from "react";

interface CardProps {
  title: string;
  accentClassName: string;
  children: ReactNode;
}

export default function Card({ title, accentClassName, children }: CardProps) {
  return (
    <div className="break-inside-avoid mb-5 bg-apple-surface rounded-apple-tile shadow-apple-card flex flex-col p-5">
      <h2
        className={`${accentClassName} text-[28px] leading-tight font-bold mb-4.5 wrap-break-word hyphens-auto`}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-4.5">{children}</div>
    </div>
  );
}
