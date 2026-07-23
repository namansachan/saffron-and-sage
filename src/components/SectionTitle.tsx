import type { ReactNode } from 'react';

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-stone-600 dark:text-stone-400 text-balance">{subtitle}</p>
      )}
    </div>
  );
}
