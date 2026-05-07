import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/hooks/useApi";
import ProductCard from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Seo from "@/components/seo/Seo";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);
  const [debounced, setDebounced] = useState(initial);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(q.trim());
      const next = new URLSearchParams(params);
      if (q.trim()) next.set("q", q.trim());
      else next.delete("q");
      setParams(next, { replace: true });
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const { data, isLoading } = useProducts({
    search: debounced,
    limit: 24,
    page: 1,
    sort: "featured",
  });

  return (
    <>
      <Seo title={debounced ? `Search: ${debounced}` : "Search"} />

      <div className="container pt-28 md:pt-36">
        <Breadcrumbs items={[{ label: "Search" }]} />
        <div className="mt-6">
          <p className="eyebrow-gold mb-3">The Archive</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95]">
            Search.
          </h1>
        </div>

        <div className="mt-10 border-b-2 border-foreground flex items-center gap-3 pb-3 max-w-3xl">
          <SearchIcon
            className="h-5 w-5 text-muted-foreground"
            strokeWidth={1.5}
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="A pocket watch, a Roman coin…"
            className="flex-1 bg-transparent font-display text-2xl md:text-3xl focus:outline-none placeholder:text-muted-foreground/60"
            autoFocus
          />
        </div>

        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mt-4">
          {debounced
            ? `${data?.products.length ?? 0} result${data?.products.length === 1 ? "" : "s"}`
            : "Type to search the archive"}
        </p>
        <div className="hairline mt-8" />
      </div>

      <div className="container py-12">
        {isLoading && debounced && <ProductGridSkeleton />}
        {!isLoading && debounced && data?.products.length === 0 && (
          <p className="text-center text-muted-foreground py-20">
            Nothing matches "{debounced}".
          </p>
        )}
        {data && data.products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {data.products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
