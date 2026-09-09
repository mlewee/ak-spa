import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

export interface SelectOption {
  value: string;
  title: string;
}

interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
}

export default function Select({ value, options, onChange, className }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={twMerge(
          "flex w-full items-center justify-between gap-3 border border-line bg-panel px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-paper hover:border-copper",
          className,
        )}
      >
        <span>{selected?.title}</span>
        <AiOutlineDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-50 mt-1 overflow-hidden border border-line bg-ink shadow-2xl">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`w-full px-3 py-3 text-left font-mono text-xs uppercase tracking-[0.12em] transition ${
                option.value === value ? "bg-copper/20 text-ember" : "text-paper hover:bg-panel"
              }`}
            >
              {option.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
