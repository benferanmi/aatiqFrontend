import { Link } from "react-router-dom";
import { useCategories } from "@/hooks/useApi";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Seo from "@/components/seo/Seo";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Category metadata — roman numerals and discipline descriptions
const CATEGORY_META: Record<string, { roman: string; accent: string }> = {
  antiques: { roman: "I", accent: "Ceramics · Metalwork · Arms" },
  jewelry: { roman: "II", accent: "Jade · Gold · Seals" },
  coins: { roman: "III", accent: "Umayyad · Abbasid · Mughal" },
};

export default function Categories() {
  const { data: cats, isLoading } = useCategories();

  return (
    <>
      <Seo
        title="Collections"
        description="Three disciplines — Antiques, Jewelry, Coins. Each piece museum-verified and curated."
      />

      {/* ═══════════════════════════════════════
          PAGE HEADER
      ═══════════════════════════════════════ */}
      <section className="container pt-28 md:pt-40 pb-0">
        <Breadcrumbs items={[{ label: "Collections" }]} />

        <div className="mt-8 md:mt-12 grid grid-cols-12 gap-4">
          {/* Editorial headline */}
          <div className="col-span-12 lg:col-span-8">
            <p className="eyebrow-gold mb-4">The Three Disciplines</p>
            <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] tracking-tight">
              Objects that survive
              <br />
              <em className="text-gold">centuries</em> deserve
              <br />a careful eye.
            </h1>
          </div>

          {/* Descriptor */}
          <div className="col-span-12 lg:col-span-4 lg:flex lg:flex-col lg:justify-end lg:pb-2">
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Every piece in Aatiq passes through a rigorous
              authentication process before it enters the vault. Browse by
              discipline below.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hairline mt-12 md:mt-16" />
      </section>

      {/* ═══════════════════════════════════════
          CATEGORY GRID — EDITORIAL ROWS
      ═══════════════════════════════════════ */}
      <section className="container">
        {/* Loading state */}
        {isLoading && (
          <div className="py-24 flex flex-col gap-12">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 bg-muted/40 animate-pulse" />
            ))}
          </div>
        )}

        {/* Categories */}
        {cats?.map((cat, i) => {
          const meta = CATEGORY_META[cat.slug] ?? {
            roman: String(i + 1),
            accent: "",
          };

          return (
            <Link
              key={cat._id}
              to={`/categories/${cat.slug}`}
              className={cn(
                "group relative grid grid-cols-12 gap-6 md:gap-10 items-stretch",
                "border-b border-hairline py-10 md:py-14",
                "transition-colors duration-300 hover:bg-muted/25"
              )}
            >
              {/* Roman numeral */}
              <div className="col-span-2 md:col-span-1 flex items-start pt-1">
                <span className="font-display italic text-[2rem] md:text-[2.5rem] leading-none text-muted-foreground/30 group-hover:text-gold/40 transition-colors duration-500 select-none">
                  {meta.roman}
                </span>
              </div>

              {/* Category name + metadata */}
              <div className="col-span-10 md:col-span-4 flex flex-col justify-between gap-4">
                <div>
                  <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] tracking-tight group-hover:text-gold transition-colors duration-300">
                    {cat.name}
                  </h2>
                  <p className="eyebrow mt-2 group-hover:text-foreground/60 transition-colors">
                    {meta.accent}
                  </p>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <span>{cat.productCount ?? 0} pieces</span>
                  <span className="h-px w-4 bg-hairline" />
                </div>
              </div>

              {/* Description (desktop only) */}
              <div className="hidden md:flex col-span-4 items-center">
                <p className="text-[0.9375rem] leading-relaxed text-muted-foreground max-w-sm">
                  {cat.description}
                </p>
              </div>

              {/* Image thumbnail */}
              <div className="col-span-12 md:col-span-2 md:order-last flex items-center">
                <div className="w-full aspect-[3/2] overflow-hidden bg-muted/50 relative">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    /* Placeholder */
                    <div className="w-full h-full flex items-center justify-center bg-muted/60">
                      <span className="font-display italic text-4xl text-muted-foreground/20">
                        {meta.roman}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA arrow */}
              <div className="col-span-12 md:absolute md:right-0 md:bottom-10 flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/0 group-hover:text-gold transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  Browse the collection
                </span>
                <div className="w-7 h-7 border border-hairline group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300 flex items-center justify-center">
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-muted-foreground group-hover:text-gold transition-colors"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ═══════════════════════════════════════
          FOOTER DECORATIVE STRIP
      ═══════════════════════════════════════ */}
      <section className="container py-20 md:py-28">
        <div className="flex items-center gap-6">
          <div className="hairline flex-1 hairline-left" />
          <span className="eyebrow shrink-0">Aatiq</span>
          <div
            className="hairline flex-1"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--gold) / 0.5), transparent)",
            }}
          />
        </div>
      </section>
    </>
  );
}