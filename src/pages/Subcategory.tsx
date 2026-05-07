import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSubcategory, useProducts } from "@/hooks/useApi";
import { useFilterStore } from "@/store/filterStore";
import ProductCard from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Seo from "@/components/seo/Seo";
import Pagination from "@/components/products/ProductPagination";

export default function Subcategory() {
  const { slug, subSlug } = useParams();
  const { data, isLoading } = useSubcategory(subSlug);
  const { page, sort } = useFilterStore();
  const setPage = useFilterStore((s) => s.setPage);
  const set = useFilterStore((s) => s.set);

  useEffect(() => {
    if (data?.subcategory._id) set("subcategoryId", data.subcategory._id);
    return () => {
      set("subcategoryId", undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.subcategory._id]);

  const { data: products, isLoading: pLoading } = useProducts({
    subcategoryId: data?.subcategory._id,
    page,
    sort,
    limit: 12,
  });

  if (isLoading || !data)
    return (
      <div className="container pt-32">
        <ProductGridSkeleton />
      </div>
    );
  const { subcategory } = data;

  return (
    <>
      <Seo
        title={`${subcategory.name} — ${subcategory.categoryName}`}
        description={subcategory.description}
        image={subcategory.image}
      />

      <div className="container pt-28 md:pt-36">
        <Breadcrumbs
          items={[
            { label: "Collections", to: "/categories" },
            { label: subcategory.categoryName, to: `/categories/${subcategory.categoryName.toLowerCase()}` },
            { label: subcategory.name },
          ]}
        />
        <p className="eyebrow-gold mt-6 mb-3">{subcategory.categoryName}</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95]">
          {subcategory.name}
        </h1>
        <div className="hairline mt-12" />
      </div>

      <div className="container py-12">
        {pLoading && <ProductGridSkeleton />}
        {!pLoading && products && products.products.length === 0 && (
          <p className="text-muted-foreground text-center py-20">
            No pieces in this sub-collection right now.
          </p>
        )}
        {!pLoading && products && products.products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {products.products.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
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
