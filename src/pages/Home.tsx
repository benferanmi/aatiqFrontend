import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFeatured, useHighlights } from "@/hooks/useApi";
import { archiveNumber } from "@/lib/helpers";
import Seo from "@/components/seo/Seo";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CategoryAgeGateway from "@/components/gateway/CategoryAgeGateway";
import { cn } from "@/lib/utils";

// Antique-appropriate hero slides — dark, moody, museum-grade imagery
const HERO_SLIDES = [
  {
    id: "1",
    image:
      "http://res.cloudinary.com/dtcbirvxc/image/upload/v1776990412/categories/pidg7bvb90ddyhba8mvj.webp",
    title: "Welcome to Aatiq",
    subtitle: "A curated house of antiques, jewellery, and historic coins",
    label: "Explore",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=95&auto=format&fit=crop",
    title: "Rare Jewellery",
    subtitle: "Mughal craftsmanship. Centuries of light.",
    label: "Fine Jewellery",
  },
  {
    id: "3",
    image:
      "http://res.cloudinary.com/dtcbirvxc/image/upload/v1776990622/categories/iir8kf1fnnlrqiyytmod.jpg",
    title: "Numismatic Archive",
    subtitle: "Coins that outlived empires",
    label: "Historic Coins",
  },
];

export default function Home() {
  const { data: featured, isLoading: featuredLoading } = useFeatured();
  const { data: highlights, isLoading: highlightsLoading } = useHighlights();
  const [slide, setSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [mobileViewMode, setMobileViewMode] = useState<"2col" | "1col">("2col");

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const goToSlide = (i: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setSlide(i);
      setTransitioning(false);
    }, 200);
  };

  return (
    <>
      <Seo
        title="Home"
        description="A private gallery of Islamic antiques, rare coins, and vintage jewelry. Museum-quality pieces curated for the discerning collector."
      />

      {/* ═══════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        {/* Background slides */}
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: i === slide ? 1 : 0 }}
            aria-hidden={i !== slide}
          >
            <img
              src={s.image}
              alt={s.title}
              className="absolute inset-0 h-full w-full object-cover scale-[1.03] transition-transform duration-[8000ms] ease-out"
              style={{ transform: i === slide ? "scale(1.0)" : "scale(1.05)" }}
            />
            {/* Multi-layer overlay: dark from top (for navbar) + dark from bottom (for text) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/75" />
            {/* Extra warm amber vignette */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F0A00]/60 via-transparent to-transparent" />
          </div>
        ))}

        {/* Slide label — top right */}
        <div className="absolute top-28 right-8 md:right-12 z-10">
          <p
            className="font-mono test-[12px] uppercase tracking-[0.2em] text-white/70 border border-white/15 px-3 py-1.5 backdrop-blur-sm"
            style={{
              transition: "opacity 0.6s ease",
              opacity: transitioning ? 0 : 1,
            }}
          >
            {HERO_SLIDES[slide]?.label}
          </p>
        </div>

        {/* Main content */}
        <div className="relative h-full flex flex-col justify-end pb-24 md:pb-32 container mx-auto px-6 md:px-10">
          {/* Slide counter — vertical left */}
          <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <div className="h-16 w-px bg-white/20" />
            <span className="font-mono test-[12px] text-white/40 tracking-widest vertical-rl rotate-180">
              {String(slide + 1).padStart(2, "0")} /{" "}
              {String(HERO_SLIDES.length).padStart(2, "0")}
            </span>
          </div>

          {/* Headline */}
          <div
            className="max-w-4xl ml-10 md:ml-16 space-y-4 md:space-y-6"
            style={{
              animation: "heroReveal 1s cubic-bezier(0.22, 0.61, 0.36, 1) both",
              animationDelay: "0.2s",
            }}
          >
            <h1
              className="font-display leading-[0.88] tracking-[-0.01em] text-white"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 8rem)",
                transition: "opacity 0.5s ease",
                opacity: transitioning ? 0 : 1,
              }}
            >
              {HERO_SLIDES[slide]?.title}
            </h1>
            <p
              className="font-light text-white/65 leading-relaxed max-w-lg"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                transition: "opacity 0.5s ease 0.05s",
                opacity: transitioning ? 0 : 1,
              }}
            >
              {HERO_SLIDES[slide]?.subtitle}
            </p>

            {/* Bottom row: controls + CTA */}
            <div className="flex items-center justify-between pt-6 md:pt-10">
              {/* Navigation dots */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    goToSlide(
                      (slide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
                    )
                  }
                  className="p-2 text-white/70 hover:text-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                </button>

                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className="relative h-px transition-all duration-500"
                      style={{
                        width: i === slide ? "48px" : "16px",
                        background:
                          i === slide ? "#C6A96B" : "rgba(255,255,255,0.3)",
                      }}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goToSlide((slide + 1) % HERO_SLIDES.length)}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* CTA */}
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.15em] text-white border border-white/30 px-6 py-3.5 hover:bg-[#C6A96B] hover:border-[#C6A96B] hover:text-[#0F0F0F] transition-all duration-400"
              >
                Explore Collection
                <ArrowRight
                  className="h-3 w-3 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATEMENT — Thin editorial strip
          ═══════════════════════════════════════════════════════════ */}
      <div className="bg-[#966c13] py-4">
        <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
          <p className="font-mono test-[12px] uppercase tracking-[0.2em] text-[#0F0F0F]/70">
            Islamic · Mughal · Persian · Pre-Islamic · Numismatic
          </p>
          <p className="font-mono test-[12px] uppercase tracking-[0.2em] text-[#0F0F0F]/70 hidden md:block"></p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          FEATURED — Asymmetric editorial layout
          ═══════════════════════════════════════════════════════════ */}
      {featured && featured.length > 0 && (
        <section className="py-10 md:py-40 hidden md:block">
          <div className="container mx-auto px-6 md:px-10">
            {/* Header */}
            {/* Header */}

            <div className="flex items-end justify-between mb-16 md:mb-24 border-b border-[#C6A96B]/20 pb-8">
              <div className="space-y-3">
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-[#966c13]">
                  — Featured Pieces
                </p>
                <h2
                  className="font-display leading-[0.92] tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                >
                  Carefully Selected
                </h2>
              </div>

            

              <Link
                to="/products"
                className="hidden md:inline-flex items-center gap-2 font-mono test-[12px] uppercase tracking-[0.25em] text-foreground/60 hover:text-[#C6A96B] transition-colors group"
              >
                All Pieces
                <ArrowRight
                  className="h-3 w-3 group-hover:translate-x-1 transition-transform"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            {/* Category & Age Gateway */}
            <div className="mt-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50 mb-5">
                Explore by discipline & era
              </p>
              <CategoryAgeGateway />
            </div>

            {/* Asymmetric grid: 1 large left + 2 stacked right */}
            {featured.length >= 3 ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                {/* Large feature — col 1-7 */}
                <Link
                  to={`/products/${featured[0].slug}`}
                  className="group md:col-span-7"
                  style={{
                    animation:
                      "fadeUp 0.8s cubic-bezier(0.22,0.61,0.36,1) both",
                  }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#EDE5D8] mb-5 ring-1 ring-[#C6A96B]/15 group-hover:ring-[#C6A96B]/50 transition-all duration-500">
                    {featured[0].images?.[0]?.url && (
                      <img
                        src={featured[0].images[0].url}
                        alt={featured[0].title}
                        className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    )}
                    <div className="absolute top-5 left-5 bg-[#0F0F0F] px-3 py-1.5">
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C6A96B]">
                        {archiveNumber(featured[0].itemNumber)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 pl-1">
                    <p className="font-mono test-[12px] uppercase tracking-[0.25em] text-foreground/60">
                      {featured[0].ageRangeLabel || featured[0].categoryName}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl leading-snug group-hover:text-[#C6A96B] transition-colors duration-300">
                      {featured[0].title}
                    </h3>
                    <p className="font-mono text-sm text-foreground/70">
                      {featured[0].priceDisplay}
                    </p>
                  </div>
                </Link>
                {/* who knows */}
                {/* 2 stacked — col 8-12 */}
                <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
                  {[featured[1], featured[2]].map(
                    (product, i) =>
                      product && (
                        <Link
                          key={product._id}
                          to={`/products/${product.slug}`}
                          className="group flex-1"
                          style={{
                            animation:
                              "fadeUp 0.8s cubic-bezier(0.22,0.61,0.36,1) both",
                            animationDelay: `${(i + 1) * 0.12}s`,
                          }}
                        >
                          <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE5D8] mb-4 ring-1 ring-[#C6A96B]/15 group-hover:ring-[#C6A96B]/50 transition-all duration-500">
                            {product.images?.[0]?.url && (
                              <img
                                src={product.images[0].url}
                                alt={product.title}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.04]"
                              />
                            )}
                            <div className="absolute top-4 left-4 bg-[#0F0F0F] px-2.5 py-1">
                              <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#C6A96B]">
                                {archiveNumber(product.itemNumber)}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-1.5 pl-1">
                            <p className="font-mono test-[12px] uppercase tracking-[0.25em] text-foreground/60">
                              {product.ageRangeLabel || product.categoryName}
                            </p>
                            <h3 className="font-display text-xl md:text-2xl leading-snug group-hover:text-[#C6A96B] transition-colors duration-300">
                              {product.title}
                            </h3>
                            <p className="font-mono test-[12px] text-foreground/70">
                              {product.priceDisplay}
                            </p>
                          </div>
                        </Link>
                      ),
                  )}
                </div>
              </div>
            ) : (
              /* Fallback: uniform 3-col grid */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featured.slice(0, 3).map((product, i) => (
                  <Link
                    key={product._id}
                    to={`/products/${product.slug}`}
                    className="group"
                    style={{
                      animation:
                        "fadeUp 0.8s cubic-bezier(0.22,0.61,0.36,1) both",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#EDE5D8] mb-5 ring-1 ring-[#C6A96B]/15 group-hover:ring-[#C6A96B]/50 transition-all duration-500">
                      {product.images?.[0]?.url && (
                        <img
                          src={product.images[0].url}
                          alt={product.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      )}
                      <div className="absolute top-4 left-4 bg-[#0F0F0F] px-2.5 py-1">
                        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C6A96B]">
                          {archiveNumber(product.itemNumber)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 pl-1">
                      <p className="font-mono test-[12px] uppercase tracking-[0.25em] text-foreground/60">
                        {product.ageRangeLabel || product.categoryName}
                      </p>
                      <h3 className="font-display text-xl md:text-2xl leading-snug group-hover:text-[#C6A96B] transition-colors duration-300">
                        {product.title}
                      </h3>
                      <p className="font-mono test-[12px] text-foreground/70">
                        {product.priceDisplay}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* More featured items */}
            {featured.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 md:mt-10 pt-8 border-t border-[#C6A96B]/15">
                {featured.slice(3, 6).map((product, i) => (
                  <Link
                    key={product._id}
                    to={`/products/${product.slug}`}
                    className="group"
                    style={{
                      animation:
                        "fadeUp 0.8s cubic-bezier(0.22,0.61,0.36,1) both",
                      animationDelay: `${(i + 3) * 0.1}s`,
                    }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#EDE5D8] mb-5 ring-1 ring-[#C6A96B]/15 group-hover:ring-[#C6A96B]/50 transition-all duration-500">
                      {product.images?.[0]?.url && (
                        <img
                          src={product.images[0].url}
                          alt={product.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      )}
                      <div className="absolute top-4 left-4 bg-[#0F0F0F] px-2.5 py-1">
                        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C6A96B]">
                          {archiveNumber(product.itemNumber)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 pl-1">
                      <p className="font-mono test-[12px] uppercase tracking-[0.25em] text-foreground/60">
                        {product.ageRangeLabel || product.categoryName}
                      </p>
                      <h3 className="font-display text-xl md:text-2xl leading-snug group-hover:text-[#C6A96B] transition-colors duration-300">
                        {product.title}
                      </h3>
                      <p className="font-mono test-[12px] text-foreground/70">
                        {product.priceDisplay}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Mobile-only Featured Section */}
      {featured && featured.length > 0 && (
        <section className="md:hidden py-10">
          <div className="container mx-auto px-6 md:px-10">
            {/* Header */}
            <div className="flex items-end justify-between mb-8 border-b border-[#C6A96B]/20 pb-6">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#966c13]">
                  — Featured Pieces
                </p>
                <h2 className="font-display text-2xl leading-tight">
                  Carefully Selected
                </h2>
              </div>

              {/* View toggle */}
              <div className="flex items-center border border-[#C6A96B]/20">
                <button
                  onClick={() => setMobileViewMode("2col")}
                  className={cn(
                    "px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 border-r border-[#C6A96B]/20",
                    mobileViewMode === "2col"
                      ? "bg-[#C6A96B]/10 text-[#C6A96B]"
                      : "text-foreground/60",
                  )}
                >
                  ⊞⊞
                </button>
                <button
                  onClick={() => setMobileViewMode("1col")}
                  className={cn(
                    "px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors duration-300",
                    mobileViewMode === "1col"
                      ? "bg-[#C6A96B]/10 text-[#C6A96B]"
                      : "text-foreground/60",
                  )}
                >
                  ☰
                </button>
              </div>
            </div>

            {/* Grid responds to toggle */}
            <div
              className={cn(
                "grid gap-6",
                mobileViewMode === "1col" ? "grid-cols-1" : "grid-cols-2",
              )}
            >
              {featured.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#EDE5D8] mb-3 ring-1 ring-[#C6A96B]/15 group-hover:ring-[#C6A96B]/50 transition-all duration-500">
                    {product.images?.[0]?.url && (
                      <img
                        src={product.images[0].url}
                        alt={product.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    )}
                    <div className="absolute top-2 left-2 bg-[#0F0F0F] px-2 py-1">
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#C6A96B]">
                        {archiveNumber(product.itemNumber)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 pl-1">
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/60">
                      {product.ageRangeLabel || product.categoryName}
                    </p>
                    <h3 className="font-display text-sm leading-snug group-hover:text-[#C6A96B] transition-colors duration-300 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="font-mono text-[9px] text-foreground/70">
                      {product.priceDisplay}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          STORY — Dark editorial section
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0F0F0F] py-12 md:py-40 relative overflow-hidden">
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(198,169,107,0.5) 39px, rgba(198,169,107,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(198,169,107,0.5) 39px, rgba(198,169,107,0.5) 40px)",
          }}
        />

        <div className="relative container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
            {/* Left: Big quote / pull statement */}
            <div className="md:col-span-5">
              <div className="border-l-2 border-[#C6A96B] pl-6 md:pl-8">
                <p className="font-mono test-[12px] uppercase tracking-[0.2em] text-[#C6A96B] mb-5">
                  — About the Gallery
                </p>
                <blockquote
                  className="font-display leading-[1.0] tracking-tight text-white"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                  Where history meets passion
                </blockquote>
              </div>
            </div>

            {/* Right: Body text */}
            <div className="md:col-span-7 space-y-6">
              <p
                className="font-light leading-[1.85] text-white/80"
                style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)" }}
              >
                We specialize in sourcing and authenticating rare antiquities,
                vintage jewelry, and numismatic treasures from the Islamic world
                and beyond. Each piece is selected for its historical
                significance, craftsmanship, and condition — never acquired in
                haste.
              </p>
              <p
                className="font-light leading-[1.85] text-white/80"
                style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)" }}
              >
                Our expertise spans decades. We work directly with collectors,
                institutions, and discerning individuals seeking pieces that
                carry authentic stories of the past — from the Mughal courts to
                the pre-Islamic civilizations of the Near East.
              </p>
              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-[#C6A96B] hover:text-white transition-colors group"
                >
                  Our Story
                  <ArrowRight
                    className="h-3 w-3 group-hover:translate-x-1 transition-transform"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-20 md:mt-28 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: "500+", label: "Pieces Catalogued" },
              { num: "20+", label: "Years of Expertise" },
              { num: "40+", label: "Countries Sourced" },
              { num: "100%", label: "Authenticated" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-display text-[#C6A96B] leading-none mb-2"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
                >
                  {stat.num}
                </p>
                <p className="font-mono test-[12px] uppercase tracking-[0.2em] text-white/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MUSEUM HIGHLIGHTS — Dark grid with gold accents
          ═══════════════════════════════════════════════════════════ */}
       {highlights && highlights.length > 0 && (
        <section className="py-15 md:py-40 bg-[#F5EFE6] dark:bg-[#0F0F0F]">
          <div className="container mx-auto px-6 md:px-10">
            {/* Header */}
            {/* Header */}
            <div className="mb-16 md:mb-24 flex items-end justify-between">
              <div className="space-y-3">
                <p className="font-mono test-[12px] uppercase tracking-[0.2em] text-[#C6A96B]">
                  — Exceptional Selections
                </p>
                <h2
                  className="font-display leading-[0.92] tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                >
                  Museum Highlights
                </h2>
              </div>

              {/* Mobile-only view toggle */}
              <div className="lg:hidden flex items-center border border-[#C6A96B]/20 rounded-none">
                <button
                  onClick={() => setMobileViewMode("2col")}
                  className={cn(
                    "px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 border-r border-[#C6A96B]/20",
                    mobileViewMode === "2col"
                      ? "bg-[#C6A96B]/10 text-[#C6A96B]"
                      : "text-foreground/60",
                  )}
                >
                  ⊞⊞
                </button>
                <button
                  onClick={() => setMobileViewMode("1col")}
                  className={cn(
                    "px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors duration-300",
                    mobileViewMode === "1col"
                      ? "bg-[#C6A96B]/10 text-[#C6A96B]"
                      : "text-foreground/60",
                  )}
                >
                  ☰
                </button>
              </div>
            </div>

            {/* 2x2 grid */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {highlights.slice(0, 4).map((product, i) => (
                <Link
                  key={product._id}
                  to={`/products/${product.slug}`}
                  className="group"
                  style={{
                    animation:
                      "fadeUp 0.8s cubic-bezier(0.22,0.61,0.36,1) both",
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {/* Dark image container — museum-style */}
                  <div className="relative aspect-[5/4] overflow-hidden bg-[#1C1714] mb-5 ring-1 ring-[#C6A96B]/20 group-hover:ring-[#C6A96B]/60 transition-all duration-500">
                    {product.images?.[0]?.url && (
                      <img
                        src={product.images[0].url}
                        alt={product.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-[1.04] opacity-90 group-hover:opacity-100"
                      />
                    )}
                    {/* Item number overlay */}
                    <div className="absolute bottom-4 right-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C6A96B]/60">
                        {archiveNumber(product.itemNumber)}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 pl-1">
                    <p className="font-mono test-[12px] uppercase tracking-[0.25em] text-foreground/60">
                      {product.ageRangeLabel || product.categoryName}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl leading-snug group-hover:text-[#C6A96B] transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="font-mono test-[12px] text-foreground/70">
                      {product.priceDisplay}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile-only grid - hidden on lg and up */}
            {highlights && highlights.length > 0 && (
              <div
                className={cn(
                  "lg:hidden grid gap-8 md:gap-10",
                  mobileViewMode === "2col" ? "grid-cols-2" : "grid-cols-1",
                )}
              >
                {highlights.map((product, i) => (
                  <Link
                    key={product._id}
                    to={`/products/${product.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden bg-[#1C1714] mb-4 ring-1 ring-[#C6A96B]/20 group-hover:ring-[#C6A96B]/60 transition-all duration-500">
                      {product.images?.[0]?.url && (
                        <img
                          src={product.images[0].url}
                          alt={product.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04] opacity-90 group-hover:opacity-100"
                        />
                      )}
                      <div className="absolute bottom-3 right-3">
                        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#C6A96B]/60">
                          {archiveNumber(product.itemNumber)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1.5 pl-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                        {product.ageRangeLabel || product.categoryName}
                      </p>
                      <h3 className="font-display text-base md:text-lg leading-snug group-hover:text-[#C6A96B] transition-colors duration-300">
                        {product.title}
                      </h3>
                      <p className="font-mono text-[10px] text-foreground/70">
                        {product.priceDisplay}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          ENQUIRY CTA — Dark, centered, impactful
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0F0F0F] py-32 md:py-48 relative overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #C6A96B 0%, transparent 70%)",
          }}
        />

        <div className="relative container mx-auto px-6 md:px-10 text-center max-w-2xl">
          <p className="font-mono test-[12px] uppercase tracking-[0.2em] text-[#C6A96B] mb-6">
            — Private Enquiries
          </p>
          <h2
            className="font-display leading-[0.9] tracking-tight text-white mb-6"
            style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
          >
            Ready to Acquire?
          </h2>
          <p
            className="font-light text-white/70 leading-relaxed mb-12"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}
          >
            Every enquiry is treated with discretion and care. Whether you seek
            a specific piece or wish to discuss your collection, we are here.
          </p>
          <Link
            to="/enquiry"
            className="group inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] border border-[#C6A96B]/50 text-[#C6A96B] px-10 py-5 hover:bg-[#C6A96B] hover:text-[#0F0F0F] hover:border-[#C6A96B] transition-all duration-400"
          >
            Send an Enquiry
            <ArrowRight
              className="h-3 w-3 group-hover:translate-x-1 transition-transform"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
