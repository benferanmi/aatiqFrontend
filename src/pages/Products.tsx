import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFilterStore } from "@/store/filterStore";
import { useProducts, useCategories, useAgeRanges } from "@/hooks/useApi";
import ProductCard from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";
import Pagination from "@/components/products/ProductPagination";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Seo from "@/components/seo/Seo";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SortOption } from "@/lib/types";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const filters = useFilterStore();
  const setPage = useFilterStore((s) => s.setPage);
  const set = useFilterStore((s) => s.set);

  // Local state for dropdown menus
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showEraDropdown, setShowEraDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Fetch filter options
  const { data: categories } = useCategories();
  const { data: ageRanges } = useAgeRanges();

  // Hydrate from URL once
  useEffect(() => {
    const cat = params.get("categoryId") ?? undefined;
    const ages = params.get("ageRangeIds")?.split(",").filter(Boolean) ?? [];
    const sort = (params.get("sort") as never) ?? "featured";
    const page = parseInt(params.get("page") ?? "1", 10) || 1;
    useFilterStore.setState({ categoryId: cat, ageRangeIds: ages, sort, page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync filter state -> URL
  useEffect(() => {
    const next = new URLSearchParams();
    if (filters.categoryId) next.set("categoryId", filters.categoryId);
    if (filters.ageRangeIds?.length)
      next.set("ageRangeIds", filters.ageRangeIds.join(","));
    if (filters.sort && filters.sort !== "featured")
      next.set("sort", filters.sort);
    if ((filters.page ?? 1) > 1) next.set("page", String(filters.page));
    setParams(next, { replace: true });
  }, [
    filters.categoryId,
    filters.ageRangeIds,
    filters.sort,
    filters.page,
    setParams,
  ]);

  const { data, isLoading } = useProducts({
    categoryId: filters.categoryId,
    ageRangeIds: filters.ageRangeIds,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    sort: filters.sort,
    page: filters.page,
    limit: 12,
  });

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "recent", label: "Recently Added" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  const handleCategoryChange = (catId: string | null) => {
    set("categoryId", catId);
    setPage(1);
  };

  const handleAgeRangeToggle = (ageId: string) => {
    const current = filters.ageRangeIds || [];
    const next = current.includes(ageId)
      ? current.filter((id) => id !== ageId)
      : [...current, ageId];
    set("ageRangeIds", next);
    setPage(1);
  };

  const handleSortChange = (sortValue: SortOption) => {
    set("sort", sortValue);
    setShowSortDropdown(false);
  };

  const hasActiveFilters =
    filters.categoryId || (filters.ageRangeIds?.length ?? 0) > 0;

  const clearAllFilters = () => {
    set("categoryId", undefined);
    set("ageRangeIds", []);
    set("sort", "featured");
    setPage(1);
    setShowFilterPanel(false);
  };

  const activeCategoryName = categories?.find(
    (c) => c._id === filters.categoryId,
  )?.name;

  const activeEraCount = filters.ageRangeIds?.length ?? 0;

  return (
    <>
      <Seo
        title="The Vault — Catalogue"
        description="Browse the current archive of antiques, jewelry and coins curated by Aatiq."
      />

      {/* ═══════════════════════════════════════
          PAGE HEADER
      ═══════════════════════════════════════ */}
      <section className="container pt-28 md:pt-36 pb-0">
        <Breadcrumbs items={[{ label: "The Vault" }]} />

        <div className="mt-8 md:mt-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow-gold mb-3">The Catalogue</p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
              The Vault
            </h1>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hidden sm:block">
            {data
              ? `${String(data.pagination.total).padStart(3, "0")} pieces`
              : "—"}
          </p>
        </div>

        <div className="hairline mt-8 md:mt-12" />
      </section>

      {/* ═══════════════════════════════════════
          COMPACT STICKY FILTER BAR
      ═══════════════════════════════════════ */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-hairline/50 z-40">
        <div className="container py-3 md:py-4">
          {/* Main filter row — compact */}
          <div className="flex items-center justify-between gap-3 md:gap-4">
            {/* Filter toggle button */}
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={cn(
                "flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest border px-3 py-2 transition-all duration-300 whitespace-nowrap",
                showFilterPanel
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-hairline hover:border-gold hover:text-gold",
              )}
            >
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="ml-1 inline-flex items-center justify-center w-5 h-5 bg-gold/20 rounded-full text-[9px]">
                  ✓
                </span>
              )}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  showFilterPanel && "rotate-180",
                )}
                strokeWidth={1.5}
              />
            </button>

            {/* Active filters summary (compact) */}
            {hasActiveFilters && (
              <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                {activeCategoryName && (
                  <span className="truncate">{activeCategoryName}</span>
                )}
                {activeEraCount > 0 && (
                  <span className="truncate">
                    {activeEraCount} era{activeEraCount > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            )}

            {/* Right controls */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest border border-hairline px-3 py-2 hover:border-gold hover:text-gold transition-colors duration-300 group whitespace-nowrap"
                >
                  {sortOptions.find((s) => s.value === filters.sort)?.label}
                  <ChevronDown
                    className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity"
                    strokeWidth={1.5}
                  />
                </button>

                {showSortDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-background border border-hairline shadow-lg min-w-[180px]">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value as SortOption)}
                        className={cn(
                          "block w-full text-left px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 border-b border-hairline/50 last:border-b-0",
                          filters.sort === option.value
                            ? "bg-gold/10 text-gold"
                            : "hover:bg-muted/50 text-foreground/80",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear filters button */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  title="Clear all filters"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              )}
            </div>
          </div>

          {/* Expanded filter panel */}
          {showFilterPanel && (
            <div className="mt-4 pt-4 border-t border-hairline/50 space-y-4">
              {/* Categories */}
              <div className="space-y-2">
                <p className="eyebrow text-muted-foreground text-[9px]">
                  CATEGORY
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={cn(
                      "font-mono text-xs uppercase tracking-widest border px-3 py-1.5 transition-all duration-300",
                      filters.categoryId === undefined
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-hairline text-foreground/60 hover:border-gold hover:text-gold",
                    )}
                  >
                    All
                  </button>

                  {categories?.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() =>
                        handleCategoryChange(
                          filters.categoryId === cat._id ? null : cat._id,
                        )
                      }
                      className={cn(
                        "font-mono text-xs uppercase tracking-widest border px-3 py-1.5 transition-all duration-300",
                        filters.categoryId === cat._id
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-hairline text-foreground/60 hover:border-gold hover:text-gold",
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eras */}
              {ageRanges && ageRanges.length > 0 && (
                <div className="space-y-2">
                  <p className="eyebrow text-muted-foreground text-[9px]">
                    ERA
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => set("ageRangeIds", [])}
                      className={cn(
                        "font-mono text-xs uppercase tracking-widest border px-3 py-1.5 transition-all duration-300",
                        (filters.ageRangeIds?.length ?? 0) === 0
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-hairline text-foreground/60 hover:border-gold hover:text-gold",
                      )}
                    >
                      All
                    </button>

                    {ageRanges.map((era) => (
                      <button
                        key={era._id}
                        onClick={() => handleAgeRangeToggle(era._id)}
                        className={cn(
                          "font-mono text-xs uppercase tracking-widest border px-3 py-1.5 transition-all duration-300",
                          filters.ageRangeIds?.includes(era._id)
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-hairline text-foreground/60 hover:border-gold hover:text-gold",
                        )}
                      >
                        {era.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          PRODUCTS GRID
      ═══════════════════════════════════════ */}
      <section className="container py-12 md:py-16">
        {isLoading && <ProductGridSkeleton />}

        {!isLoading && data?.products.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-muted-foreground/50">
              No pieces found
            </p>
            <p className="text-muted-foreground mt-3">
              Try adjusting your filters.
            </p>
          </div>
        )}

        {!isLoading && data && data.products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {data.products.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </div>

            <Pagination
              page={data.pagination.page}
              totalPages={data.pagination.totalPages}
              onChange={setPage}
            />
          </>
        )}
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════════ */}
      {data && data.products.length > 0 && (
        <section className="border-t border-hairline">
          <div className="container py-16 md:py-20">
            <div className="max-w-2xl">
              <p className="eyebrow-gold mb-3">Item not listed?</p>
              <h3 className="font-display text-3xl md:text-4xl leading-tight mb-6">
                We source privately.
                <br />
                Submit an enquiry for bespoke acquisition.
              </h3>
              <a
                href="/enquiry"
                className="inline-flex items-center font-mono text-[11px] uppercase tracking-widest border border-foreground/80 px-6 py-3.5 hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                Submit an enquiry →
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
