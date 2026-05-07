import { create } from "zustand";
import type { ProductFilters, SortOption } from "@/lib/types";

interface FilterState extends ProductFilters {
  set: <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K],
  ) => void;
  toggleAgeRange: (id: string) => void;
  setSort: (s: SortOption) => void;
  setPage: (p: number) => void;
  setPriceRange: (min?: number, max?: number) => void;
  reset: () => void;
}

const initial: ProductFilters = {
  page: 1,
  limit: 12,
  sort: "featured",
  ageRangeIds: [],
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initial,
  set: (key, value) =>
    set((s) => ({
      ...s,
      [key]: value,
      page: key === "page" ? (value as number) : 1,
    })),
  toggleAgeRange: (id) =>
    set((s) => {
      const current = s.ageRangeIds ?? [];
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      return { ...s, ageRangeIds: next, page: 1 };
    }),
  setSort: (sort) => set((s) => ({ ...s, sort, page: 1 })),
  setPage: (page) => set((s) => ({ ...s, page })),
  setPriceRange: (priceMin, priceMax) =>
    set((s) => ({ ...s, priceMin, priceMax, page: 1 })),
  reset: () => set(() => ({ ...initial })),
}));
