export const APP_NAME = "Aatiq";
export const APP_TAGLINE = "The Ivory Vault";
export const APP_ESTABLISHED = "";
export const APP_DESCRIPTION =
  "A private gallery of museum-quality antiques, rare coins, and vintage jewelry. Curated for the discerning collector.";

export const PAGE_SIZE = 12;

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://api.antiques.com/api/v1";
export const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? "true") !== "false";

export const QUERY_KEYS = {
  products: "products",
  product: "product",
  featured: "products-featured",
  highlights: "products-highlights",
  categories: "categories",
  category: "category",
  subcategories: "subcategories",
  ageRanges: "age-ranges",
  ageRange: "age-range",
  siteSettings: "site-settings",
  page: "page",
  home: "home",
  search: "search",
} as const;

// export const STALE = {
//   short: 5 * 60 * 1000, // 5 min
//   medium: 60 * 60 * 1000, // 1 hour
//   long: 24 * 60 * 60 * 1000, // 24 hours
// };

export const STALE = {
  short: 0,
  medium: 0,
  long: 0,
};

export const SORT_OPTIONS: {
  value: import("./types").SortOption;
  label: string;
}[] = [
  { value: "new", label: "Recently Added" },
  { value: "featured", label: "Featured First" },
  { value: "price-asc", label: "Price — Low to High" },
  { value: "price-desc", label: "Price — High to Low" },
];

// The 3 core collection categories — map directly to API slugs
export const COLLECTION_LINKS = [
  {
    label: "Antiques",
    to: "/categories/antiques",
    description: "Islamic, Mughal & Persian",
  },
  {
    label: "Jewelry",
    to: "/categories/jewelry",
    description: "Ancient & medieval adornment",
  },
  {
    label: "Coins",
    to: "/categories/coins",
    description: "Umayyad, Abbasid & Mughal",
  },
] as const;

export const NAV_LINKS = [
  { label: "The Vault", to: "/products" },
  {
    label: "Antiques",
    to: "/categories/antiques",
  },
  {
    label: "Jewelry",
    to: "/categories/jewelry",
  },
  {
    label: "Coins",
    to: "/categories/coins",
  },
  // { label: "Collections", to: "/categories" },

  // { label: "Eras", to: "/age-ranges" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
