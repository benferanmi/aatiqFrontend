import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ items, textColor, hoverColor }: { items: Crumb[]; textColor?: string; hoverColor?: string  }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "font-mono text-[9px] md:text-[11px] uppercase tracking-widest",
        textColor || "text-muted-foreground"
      )} 
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link 
            to="/" 
            className={cn(
              "transition-colors",
              hoverColor ? `hover:${hoverColor}` : "hover:text-foreground"
            )}
          >
            Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-hairline text-white">/</span>
            {c.to ? (
              <Link
                to={c.to}
                className={cn(
                  "transition-colors",
                  hoverColor ? `hover:${hoverColor}` : "hover:text-foreground"
                )}
              >
                {c.label}
              </Link>
            ) : (
              <span className={textColor || "text-foreground"}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}