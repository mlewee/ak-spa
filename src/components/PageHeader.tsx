type PageHeaderProps = {
  kicker: string;
  title: string;
  note?: string;
};

export default function PageHeader({ kicker, title, note }: PageHeaderProps) {
  return (
    <header className="mb-6 flex items-end justify-between gap-4 border-b border-line/80 pb-4">
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-copper">{kicker}</p>
        <h1 className="font-display text-4xl tracking-wide text-paper md:text-6xl">{title}</h1>
      </div>
      {note ? (
        <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-muted sm:block">
          {note}
        </span>
      ) : null}
    </header>
  );
}
