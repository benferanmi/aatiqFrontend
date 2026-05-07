import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "@/hooks/useApi";
import { archiveNumber, formatPrice, yearLabel } from "@/lib/helpers";
import { useUIStore } from "@/store/uiStore";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProductCard from "@/components/products/ProductCard";
import Seo from "@/components/seo/Seo";
import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams();
  const { data, isLoading } = useProduct(slug);
  const openEnquiry = useUIStore((s) => s.openEnquiry);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (isLoading)
    return (
      <div className="container pt-32">
        <ProductGridSkeleton count={3} />
      </div>
    );
  if (!data)
    return (
      <div className="container pt-32 text-center font-display text-3xl">
        Not found.
      </div>
    );

  const { product } = data;
  const images = product.images.length
    ? product.images
    : [{ url: "/placeholder.svg", id: "ph", isPrimary: true, displayOrder: 1 }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description.replace(/<[^>]*>/g, ""),
    image: images.map((i) => i.url),
    sku: product.itemNumber,
    category: product.categoryName,
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: (product.price / 100).toString(),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Seo
        title={product.title}
        description={product.description.replace(/<[^>]*>/g, "").slice(0, 160)}
        image={images[0]?.url}
        type="product"
        jsonLd={jsonLd}
      />

      <div className="container pt-28 md:pt-36 pb-6">
        <Breadcrumbs
          items={[
            { label: "Vault", to: "/products" },
            {
              label: product.categoryName,
              to: `/categories/${product.slug}`,
            },
            { label: product.title },
          ]}
        />
      </div>

      <div className="container grid lg:grid-cols-12 gap-10 lg:gap-16 pb-24">
        {/* ═══════════════════════════════════════
            GALLERY SECTION
        ═══════════════════════════════════════ */}
        <div className="lg:col-span-7">
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnail gallery */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActive(i)}
                  className={`shrink-0 w-20 h-20 lg:w-16 lg:h-20 overflow-hidden border-2 transition-colors ${
                    i === active
                      ? "border-gold"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Image ${i + 1}`}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* Main image — CONTAIN instead of COVER */}
            <div className="flex-1 relative group bg-[#EFE7DD] aspect-[4/5] overflow-hidden">
              {/* Image with proper containment */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img
                  src={images[active].url}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Zoom button */}
              <button
                onClick={() => setLightbox(true)}
                className="absolute top-4 right-4 bg-background/85 backdrop-blur p-2 hover:bg-background transition-colors"
                aria-label="Zoom"
              >
                <ZoomIn className="h-4 w-4" strokeWidth={1.5} />
              </button>

              {/* Counter */}
              <span className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest bg-background/85 backdrop-blur px-2 py-1">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            PRODUCT INFORMATION
        ═══════════════════════════════════════ */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            {/* Archive info */}
            <p className="eyebrow-gold">
              {archiveNumber(product.itemNumber)} · {product.categoryName}
            </p>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] mt-4">
              {product.title}
            </h1>

            {/* Price + Era */}
            <div className="mt-6 flex items-baseline gap-6 border-y border-hairline py-5">
              <p className="font-display text-3xl text-gold">
                {formatPrice(product.price)}
              </p>
              {product.ageRangeId && (
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {product.ageRangeLabel} ·{" "}
                  {yearLabel(
                    product.yearEstimate.startYear,
                    product.yearEstimate.endYear,
                  )}
                </p>
              )}
            </div>

            {/* Description */}
            <div
              className="mt-6 prose prose-neutral dark:prose-invert max-w-none [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-foreground/80"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {/* Specifications */}
            <div className="mt-10">
              <p className="eyebrow mb-4">Specifications</p>
              <dl className="border-t border-hairline">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-3 gap-4 py-3 border-b border-hairline"
                  >
                    <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground col-span-1">
                      {k}
                    </dt>
                    <dd className="text-sm col-span-2">{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Desktop CTA */}
            <button
              onClick={() => openEnquiry(product._id, product.title)}
              className="mt-10 hidden md:flex w-full items-center justify-center font-mono text-[11px] uppercase tracking-widest bg-foreground text-background py-4 hover:bg-gold transition-colors"
            >
              Enquire about this piece
            </button>
            <p className="mt-3 hidden md:block text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Replies within one business day · Hold on request
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          STICKY MOBILE CTA
      ═══════════════════════════════════════ */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-background/95 backdrop-blur p-3">
        <div className="container flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground truncate">
              {archiveNumber(product.itemNumber)}
            </p>
            <p className="font-display text-lg leading-tight truncate">
              {formatPrice(product.price)}
            </p>
          </div>
          <button
            onClick={() => openEnquiry(product._id, product.title)}
            className="font-mono text-[11px] uppercase tracking-widest bg-foreground text-background px-6 py-3"
          >
            Enquire
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          RELATED PRODUCTS
      ═══════════════════════════════════════ */}
      {product.relatedProductIds.length > 0 && (
        <section className="container pb-24 md:pb-32">
          <div className="hairline mb-14" />
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow-gold mb-3">From the same period</p>
              <h2 className="font-display text-3xl md:text-4xl">
                Related from the archive
              </h2>
            </div>
            <Link
              to="/products"
              className="font-mono text-[11px] uppercase tracking-widest spotlight-link hidden sm:inline-block"
            >
              View all
            </Link>
          </div>
          {/* Uncomment when related products component ready
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {product.relatedProductIds.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
          */}
        </section>
      )}

      {/* ═══════════════════════════════════════
          LIGHTBOX
      ═══════════════════════════════════════ */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] bg-background/98 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 p-3"
            aria-label="Close"
            onClick={() => setLightbox(false)}
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 md:left-10 p-3"
            onClick={(e) => {
              e.stopPropagation();
              setActive((a) => (a - 1 + images.length) % images.length);
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Image */}
          <img
            src={images[active].url}
            alt={product.title}
            className="max-h-[88vh] max-w-[88vw] object-contain"
          />

          {/* Next button */}
          <button
            className="absolute right-4 md:right-10 p-3"
            onClick={(e) => {
              e.stopPropagation();
              setActive((a) => (a + 1) % images.length);
            }}
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </>
  );
}