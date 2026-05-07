import { X } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import { useAgeRanges, useCategories } from "@/hooks/useApi";
import { formatPrice } from "@/lib/helpers";

export default function FilterBadges() {
  const { categoryId, ageRangeIds, priceMin, priceMax } = useFilterStore();
  const set = useFilterStore((s) => s.set);
  const toggleAgeRange = useFilterStore((s) => s.toggleAgeRange);
  const setPriceRange = useFilterStore((s) => s.setPriceRange);
  const { data: cats } = useCategories();
  const { data: ages } = useAgeRanges();

  const cat = cats?.find((c) => c.id === categoryId);
  const selectedAges = ages?.filter((a) => ageRangeIds?.includes(a.id)) ?? [];
  const hasPrice = typeof priceMin === "number" || typeof priceMax === "number";

  if (!cat && !selectedAges.length && !hasPrice) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {cat && (
        <Pill onClear={() => set("categoryId", undefined)}>{cat.name}</Pill>
      )}
      {selectedAges.map((a) => (
        <Pill key={a.id} onClear={() => toggleAgeRange(a.id)}>
          {a.label}
        </Pill>
      ))}
      {hasPrice && (
        <Pill onClear={() => setPriceRange(undefined, undefined)}>
          {formatPrice(priceMin ?? 0)} —{" "}
          {priceMax ? formatPrice(priceMax) : "any"}
        </Pill>
      )}
    </div>
  );
}

function Pill({
  children,
  onClear,
}: {
  children: React.ReactNode;
  onClear: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-2 border border-hairline px-3 py-1.5 font-mono text-xs uppercase tracking-widest">
      {children}
      <button onClick={onClear} aria-label="Remove" className="hover:text-gold">
        <X className="h-3 w-3" strokeWidth={1.5} />
      </button>
    </span>
  );
}
