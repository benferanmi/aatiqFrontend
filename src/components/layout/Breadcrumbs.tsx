import { Link } from "react-router-dom";

interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ items, textColor, hoverColor }: { items: Crumb[]; textColor?: string; hoverColor?: string  }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`font-mono text-[11px] uppercase tracking-widest ${textColor || "text-muted-foreground"}`} 
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link to="/" className={`hover:${hoverColor || "text-foreground"} transition-colors`}>
            Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-hairline">/</span>
            {c.to ? (
              <Link
                to={c.to}
                className={`hover:${hoverColor || "text-foreground"} transition-colors`}>
                {c.label}
              </Link>
            ) : (
              <span className={`${textColor || "text-foreground"}`}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
