import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { useProducts } from "@/hooks/useApi";
import { Link } from "react-router-dom";
import { archiveNumber, formatPrice } from "@/lib/helpers";
import { cn } from "@/lib/utils";

export default function SearchOverlay() {
  const open = useUIStore((s) => s.searchOpen);
  const setOpen = useUIStore((s) => s.setSearch);
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim()), 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const { data, isLoading } = useProducts({
    search: debounced,
    limit: 6,
    page: 1,
    sort: "featured",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      setOpen(false);
    }
  };

  // GUARD: safely access products array
  const products =
    data?.products && Array.isArray(data.products) ? data.products : [];
  const hasResults = products.length > 0;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] transition-opacity duration-300",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-md"
        onClick={() => setOpen(false)}
      />
      <div className="relative h-full overflow-y-auto">
        <div className="container pt-24 md:pt-32 pb-20 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <p className="eyebrow-gold">Search the Archive</p>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="p-2"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <form
            onSubmit={submit}
            className="border-b-2 border-foreground flex items-center gap-3 pb-3"
          >
            <Search
              className="h-5 w-5 text-muted-foreground"
              strokeWidth={1.5}
            />
            <input
              autoFocus={open}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="A pocket watch, a Roman coin, an Edwardian ring…"
              className="flex-1 bg-transparent font-display text-2xl md:text-4xl focus:outline-none placeholder:text-muted-foreground/60"
            />
          </form>

          <div className="mt-10 space-y-2">
            {debounced && isLoading && <p className="eyebrow">Looking…</p>}
            {debounced && !isLoading && !hasResults && (
              <p className="text-muted-foreground">
                Nothing in the archive matches "{debounced}".
              </p>
            )}
            {hasResults &&
              products.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.slug}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-5 border-b border-hairline/60 py-4 hover:bg-muted/40 px-2 -mx-2 transition-colors"
                >
                  <img
                    src={p.images?.[0]?.url}
                    alt=""
                    className="w-16 h-16 object-cover"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {archiveNumber(p.itemNumber)} ·{" "}
                      {p.category?.name || "Uncategorized"}
                    </p>
                    <p className="font-display text-lg md:text-xl truncate group-hover:text-gold transition-colors">
                      {p.title}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground hidden sm:block">
                    {formatPrice(p.price)}
                  </p>
                </Link>
              ))}
            {!debounced && (
              <p className="eyebrow text-center pt-6">Begin typing to search</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
