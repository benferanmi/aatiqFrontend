import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const pages: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }

  return (
    <nav
      className="flex items-center justify-center gap-1 mt-16"
      aria-label="Pagination"
    >
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="p-2 disabled:opacity-30 hover:text-gold transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={i}
            className="px-2 text-muted-foreground font-mono text-xs"
          >
            …
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onChange(p)}
            className={cn(
              "min-w-[36px] h-9 px-2 font-mono text-xs uppercase tracking-widest border transition-colors",
              p === page
                ? "border-foreground bg-foreground text-background"
                : "border-transparent hover:border-hairline",
            )}
          >
            {String(p).padStart(2, "0")}
          </button>
        ),
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="p-2 disabled:opacity-30 hover:text-gold transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </nav>
  );
}
