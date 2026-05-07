import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCategory, useProducts } from "@/hooks/useApi";
import { useFilterStore } from "@/store/filterStore";
import ProductCard from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Seo from "@/components/seo/Seo";
import Pagination from "@/components/products/ProductPagination";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Per-category hero configs — visual identity for each discipline
const HERO_CONFIG: Record<
  string,
  {
    eyebrow: string;
    tagline: string;
  }
> = {
  antiques: {
    eyebrow: "Islamic · Mughal · Persian",
    tagline: "Where history\nbecomes presence.",
  },
  jewelry: {
    eyebrow: "Ancient & Medieval Adornment",
    tagline: "Worn by hands\nlong turned to dust.",
  },
  coins: {
    eyebrow: "Umayyad · Abbasid · Mughal",
    tagline: "Currency of\nvanished empires.",
  },
};

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading: catLoading } = useCategory(slug);
  const { page, sort } = useFilterStore();
  const setPage = useFilterStore((s) => s.setPage);
  const set = useFilterStore((s) => s.set);

  useEffect(() => {
    if (data?.category._id) {
      set("categoryId", data.category._id);
    }
    return () => set("categoryId", undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.category._id]);

  const { data: productsData, isLoading: pLoading } = useProducts({
    categoryId: data?.category._id,
    page,
    sort,
    limit: 12,
  });

  const heroConf = HERO_CONFIG[slug ?? ""] ?? {
    eyebrow: "The Collection",
    tagline: "Pieces from another era.",
  };

  if (catLoading || !data) {
    return (
      <div className="min-h-screen">
        {/* Hero skeleton */}
        <div className="h-[70vh] bg-muted/30 animate-pulse" />
        <div className="container pt-16">
          <ProductGridSkeleton />
        </div>
      </div>
    );
  }

  const { category, subcategories } = data;

  return (
    <>
      <Seo
        title={category.name}
        description={category.description}
        image={category.image}
      />

      {/* ═══════════════════════════════════════
          CINEMATIC HERO — NO OVERLAYS
          Design principle: Composition over filters.
          Text placed strategically, image fully visible.
      ═══════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[540px] md:h-screen max-h-[900px] mt-16 md:mt-10 overflow-hidden">
        {/* Background image — pristine, unfiltered */}
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover ken-burns"
          />
        ) : (
          /* Fallback: textured gradient for no-image case */
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted/50" />
        )}

        {/* Hero content — positioned for natural readability */}
        <div className="absolute inset-0 flex flex-col justify-end container pb-14 md:pb-20">
          {/* Breadcrumb — subtle semi-transparent backdrop, minimal intervention */}
          <div className="mb-8 inline-flex">
            <div className="bg-black/20 backdrop-blur-sm rounded-sm px-4 py-2.5 border border-white/10">
              <Breadcrumbs
                items={[
                  { label: "Collections", to: "/categories" },
                  { label: category.name },
                ]}
                textColor="text-background/90"
                hoverColor="text-primary"
              />
            </div>
          </div>

          {/* Content block — left-aligned, max-width for breathing room */}
          <div className="mt-6 max-w-2xl">
            {/* Eyebrow — gold, confident */}
            <p className="text-gold/95 mb-4 animate-fade-in font-mono text-[11px] uppercase tracking-widest">
              {heroConf.eyebrow}
            </p>

            {/* Headline — strong, serif, no apologies */}
            <h1
              className="font-display text-[clamp(3rem,7vw,5.5rem)] text-white leading-[0.92] tracking-tight whitespace-pre-line animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              {heroConf.tagline}
            </h1>

            {/* Description — secondary, readable */}
            <p
              className="mt-6 text-base md:text-lg text-white max-w-lg leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {category.description}
            </p>
          </div>

          {/* Stats row — information, not decoration */}
          <div
            className="mt-8 flex items-center gap-6 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex flex-col">
              <span className="font-display text-2xl text-white">
                {category.productCount ?? 0}
              </span>
              <span className="eyebrow text-white/80">Pieces</span>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/20" />

            <div className="flex flex-col">
              <span className="font-display text-2xl text-white">
                {subcategories?.length ?? 0}
              </span>
              <span className="eyebrow text-white/80">Sub-collections</span>
            </div>

            {/* Scroll cue — subtle guidance */}
            <div className="ml-auto hidden md:flex flex-col items-center gap-1.5 text-white/50">
              <span className="font-mono text-[9px] uppercase tracking-widest">
                Scroll
              </span>
              <ArrowDown
                className="h-3.5 w-3.5 animate-bounce"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SUBCATEGORY FILTERS
      ═══════════════════════════════════════ */}
      {subcategories && subcategories.length > 0 && (
        <section className="container pt-12 pb-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="eyebrow">Filter by sub-collection</span>
            <div className="hairline flex-1" />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* "All" chip */}
            <button className="font-mono text-[11px] uppercase tracking-widest border border-gold bg-gold/10 text-gold px-4 py-2.5 transition-colors hover:bg-gold/20">
              All{" "}
              <span className="opacity-60 ml-1">
                {String(category.productCount ?? 0).padStart(2, "0")}
              </span>
            </button>

            {subcategories.map((s) => (
              <Link
                key={s._id}
                to={`/categories/${category.slug}/${s.slug}`}
                className="font-mono text-[11px] uppercase tracking-widest border border-hairline px-4 py-2.5 hover:border-gold hover:text-gold transition-colors"
              >
                {s.name}{" "}
                <span className="opacity-40 ml-1">
                  {String(s.productCount ?? 0).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          PRODUCTS GRID
      ═══════════════════════════════════════ */}
      <section className="container py-12 md:py-16">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow-gold mb-1.5">{category.name}</p>
            <h2 className="font-display text-3xl md:text-4xl">
              The Collection
            </h2>
          </div>

          {productsData && (
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hidden md:block">
              {productsData.pagination.total ?? 0} items
            </p>
          )}
        </div>

        <div className="hairline mb-10" />

        {/* Loading skeleton */}
        {pLoading && <ProductGridSkeleton />}

        {/* Empty state */}
        {!pLoading && productsData && productsData.products.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display italic text-3xl text-muted-foreground/50">
              No pieces currently in this collection.
            </p>
            <p className="eyebrow mt-4">
              New acquisitions are added regularly.
            </p>
            <Link
              to="/enquiry"
              className="inline-flex mt-8 font-mono text-[11px] uppercase tracking-widest border border-foreground/60 px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
            >
              Submit an enquiry
            </Link>
          </div>
        )}

        {/* Product grid */}
        {!pLoading && productsData && productsData.products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {productsData.products.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </div>

            <Pagination
              page={productsData.pagination.page}
              totalPages={productsData.pagination.totalPages}
              onChange={setPage}
            />
          </>
        )}
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM CTA STRIP
      ═══════════════════════════════════════ */}
      <section className="border-t border-hairline">
        <div className="container py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="eyebrow-gold mb-3">Looking for something specific?</p>
            <h3 className="font-display text-3xl md:text-4xl leading-tight">
              We source privately.
              <br />
              Tell us what you seek.
            </h3>
          </div>
          <div className="md:text-right">
            <Link
              to="/enquiry"
              className="inline-flex items-center font-mono text-[11px] uppercase tracking-widest border border-foreground/80 px-6 py-3.5 hover:bg-foreground hover:text-background transition-colors"
            >
              Submit an enquiry →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
