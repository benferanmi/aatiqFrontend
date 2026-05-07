import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/client";
import { QUERY_KEYS, STALE } from "@/lib/constants";
import type { ProductFilters } from "@/lib/types";

export const useProducts = (filters: ProductFilters) =>
  useQuery({
    queryKey: [QUERY_KEYS.products, filters],
    queryFn: () => api.getProducts(filters),
    staleTime: STALE.short,
    gcTime: STALE.medium,
  });

export const useProduct = (slug: string | undefined) =>
  useQuery({
    queryKey: [QUERY_KEYS.product, slug],
    queryFn: () => api.getProduct(slug!),
    enabled: !!slug,
    staleTime: STALE.short,
  });

export const useFeatured = () =>
  useQuery({
    queryKey: [QUERY_KEYS.featured],
    queryFn: api.getFeatured,
    staleTime: STALE.short,
  });

export const useHighlights = () =>
  useQuery({
    queryKey: [QUERY_KEYS.highlights],
    queryFn: api.getHighlights,
    staleTime: STALE.short,
  });

export const useCategories = () =>
  useQuery({
    queryKey: [QUERY_KEYS.categories],
    queryFn: api.getCategories,
    staleTime: STALE.medium,
  });

export const useCategory = (slug: string | undefined) =>
  useQuery({
    queryKey: [QUERY_KEYS.category, slug],
    queryFn: () => api.getCategoryBySlug(slug!),
    enabled: !!slug,
    staleTime: STALE.medium,
  });

export const useSubcategory = (slug: string | undefined) =>
  useQuery({
    queryKey: [QUERY_KEYS.subcategories, slug],
    queryFn: () => api.getSubcategoryBySlug(slug!),
    enabled: !!slug,
    staleTime: STALE.medium,
  });

export const useAgeRanges = () =>
  useQuery({
    queryKey: [QUERY_KEYS.ageRanges],
    queryFn: api.getAgeRanges,
    staleTime: STALE.long,
  });

export const useAgeRange = (slug: string | undefined) =>
  useQuery({
    queryKey: [QUERY_KEYS.ageRange, slug],
    queryFn: () => api.getAgeRangeBySlug(slug!),
    enabled: !!slug,
    staleTime: STALE.long,
  });

export const useSiteSettings = () =>
  useQuery({
    queryKey: [QUERY_KEYS.siteSettings],
    queryFn: api.getSiteSettings,
    staleTime: STALE.long,
  });

export const usePage = (slug: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.page, slug],
    queryFn: () => api.getPage(slug),
    staleTime: STALE.long,
  });

export const useHome = () =>
  useQuery({
    queryKey: ["home"],
    queryFn: api.getHome,
    staleTime: STALE.short,
  });
