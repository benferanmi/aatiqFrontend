import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAgeRange, useProducts } from "@/hooks/useApi";
import { useFilterStore } from "@/store/filterStore";
import ProductCard from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Seo from "@/components/seo/Seo";
import Pagination from "@/components/products/ProductPagination";
import { yearLabel } from "@/lib/helpers";

export default function AgeRangeDetail() {
  const { slug } = useParams();
  const { data: era, isLoading } = useAgeRange(slug);
  const { page, sort } = useFilterStore();
  const setPage = useFilterStore((s) => s.setPage);

  const { data: products, isLoading: pLoading } = useProducts({
    ageRangeIds: era ? [era.id] : undefined,
    page,
    sort,
    limit: 12,
  });

  useEffect(() => () => useFilterStore.getState().reset(), []);

  if (isLoading || !era)
    return (
      <div className="container pt-32">
        <ProductGridSkeleton />
      </div>
    );

  return (
    <>
      <Seo title={era.label} description={era.description} />

      <div className="container pt-28 md:pt-36">
        <Breadcrumbs
          items={[{ label: "Eras", to: "/age-ranges" }, { label: era.label }]}
        />
        <p className="eyebrow-gold mt-6 mb-3 font-mono">
          {yearLabel(era.startYear, era.endYear)}
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
          {era.label}
        </h1>
        {era.description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {era.description}
          </p>
        )}
        <div className="hairline mt-12" />
      </div>

      <div className="container py-12">
        {pLoading && <ProductGridSkeleton />}
        {!pLoading && products && products.products.length === 0 && (
          <p className="text-muted-foreground text-center py-20">
            No pieces from this era right now.
          </p>
        )}
        {!pLoading && products && products.products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {products.products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
            <Pagination
              page={products.pagination.page}
              totalPages={products.pagination.totalPages}
              onChange={setPage}
            />
          </>
        )}
      </div>
    </>
  );
}
