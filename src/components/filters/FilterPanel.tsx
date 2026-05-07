import { useEffect, useMemo, useState } from "react";
import { useFilterStore } from "@/store/filterStore";
import { useAgeRanges, useCategories } from "@/hooks/useApi";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/helpers";
import { SORT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function FilterPanel({
  inDrawer = false,
}: {
  inDrawer?: boolean;
}) {
  const { categoryId, ageRangeIds, priceMin, priceMax, sort } =
    useFilterStore();
  const set = useFilterStore((s) => s.set);
  const setSort = useFilterStore((s) => s.setSort);
  const toggleAgeRange = useFilterStore((s) => s.toggleAgeRange);
  const setPriceRange = useFilterStore((s) => s.setPriceRange);
  const reset = useFilterStore((s) => s.reset);

  const { data: cats } = useCategories();
  const { data: ages } = useAgeRanges();

  // Static price bounds (kobo): 0 — 25M Naira
  const PRICE_FLOOR = 0;
  const PRICE_CEIL = 2_500_000_000;
  const [local, setLocal] = useState<[number, number]>([
    priceMin ?? PRICE_FLOOR,
    priceMax ?? PRICE_CEIL,
  ]);

  useEffect(() => {
    setLocal([priceMin ?? PRICE_FLOOR, priceMax ?? PRICE_CEIL]);
  }, [priceMin, priceMax]);

  const Section = useMemo(
    () =>
      function Section({
        title,
        children,
        num,
      }: {
        title: string;
        children: React.ReactNode;
        num: string;
      }) {
        return (
          <section
            className={cn(
              "py-7 border-b border-hairline/70",
              inDrawer && "py-6",
            )}
          >
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="eyebrow-gold">{title}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {num}
              </span>
            </div>
            {children}
          </section>
        );
      },
    [inDrawer],
  );

  return (
    <div>
      <Section num="I" title="Sort">
        <div className="space-y-1.5">
          {SORT_OPTIONS.map((o) => (
            <label
              key={o.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="sort"
                checked={sort === o.value}
                onChange={() => setSort(o.value)}
                className="sr-only peer"
              />
              <span
                className={cn(
                  "h-3 w-3 border border-foreground/40 inline-block transition-all peer-checked:border-gold peer-checked:bg-gold rounded-full",
                )}
              />
              <span
                className={cn(
                  "text-sm transition-colors",
                  sort === o.value
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              >
                {o.label}
              </span>
            </label>
          ))}
        </div>
      </Section>

      <Section num="II" title="Collection">
        <div className="space-y-1.5">
          <button
            onClick={() => set("categoryId", undefined)}
            className={cn(
              "flex w-full items-center justify-between text-sm py-1 transition-colors",
              !categoryId
                ? "text-gold"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span>All collections</span>
          </button>
          {cats?.map((c) => (
            <button
              key={c.id}
              onClick={() =>
                set("categoryId", categoryId === c.id ? undefined : c.id)
              }
              className={cn(
                "flex w-full items-center justify-between text-sm py-1 transition-colors",
                categoryId === c.id
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>{c.name}</span>
              <span className="font-mono text-xs">
                {String(c.productCount).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section num="III" title="Era">
        <div className="space-y-1.5">
          {ages?.map((a) => {
            const checked = ageRangeIds?.includes(a.id) ?? false;
            return (
              <label
                key={a.id}
                className="flex items-center justify-between cursor-pointer group py-1"
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAgeRange(a.id)}
                    className="sr-only peer"
                  />
                  <span
                    className={cn(
                      "h-3 w-3 border border-foreground/40 inline-block transition-all",
                      checked && "bg-gold border-gold",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      checked
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {a.label}
                  </span>
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {a.count ?? 0}
                </span>
              </label>
            );
          })}
        </div>
      </Section>

      <Section num="IV" title="Price">
        <div className="px-1 pt-2">
          <Slider
            min={PRICE_FLOOR}
            max={PRICE_CEIL}
            step={50_000_00}
            value={local}
            onValueChange={(v) => setLocal([v[0], v[1]])}
            onValueCommit={(v) =>
              setPriceRange(
                v[0] === PRICE_FLOOR ? undefined : v[0],
                v[1] === PRICE_CEIL ? undefined : v[1],
              )
            }
          />
          <div className="mt-3 flex justify-between font-mono text-[11px] text-muted-foreground">
            <span>{formatPrice(local[0])}</span>
            <span>{formatPrice(local[1])}</span>
          </div>
        </div>
      </Section>

      <button
        onClick={reset}
        className="mt-6 w-full font-mono text-[11px] uppercase tracking-widest border border-foreground/80 py-3 hover:bg-foreground hover:text-background transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}
