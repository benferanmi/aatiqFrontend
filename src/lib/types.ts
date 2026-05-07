// Types mirror the ACTUAL API responses exactly.

export type ProductType = "antique" | "jewelry" | "coin";
export type SortOption = "new" | "featured" | "price-asc" | "price-desc";
export type SectionType =
  | "featured_intro"
  | "trust_block"
  | "featured"
  | "story"
  | "acquired"
  | "highlights";

export interface ProductImage {
  url: string;
  caption?: string;
  isPrimary: boolean;
  displayOrder: number;
  _id: string;
}
export interface YearEstimate {
  startYear: number;
  endYear: number;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  itemNumber: string;
  productType: ProductType;
  price: number;
  priceDisplay: string;
  slug: string;
  images: ProductImage[];

  // Categories (flattened from backend)
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  subcategoryName?: string;

  // Age range (optional, can be missing)
  ageRangeId?: string;
  ageRangeLabel?: string;
  yearEstimate?: YearEstimate;

  specifications: Record<string, string>;
  isFeatured: boolean;
  isHighlight: boolean;
  isAvailable: boolean;
  displayOrder: number;

  createdAt: string;
  updatedAt: string;
  __v?: number;
  deletedAt?: string | null;

  // Optional fields (not always present)
  metaKeywords?: string[];
  metaDescription?: string;
  canonicalUrl?: string;
  openGraphImage?: string;
  relatedProductIds?: string[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface FilterFacets {
  categories?: { id: string; name: string; count: number }[];
  ageRanges?: { id: string; label: string; count: number }[];
  priceRange?: { min: number; max: number };
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
  filters?: FilterFacets;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
  displayOrder: number;
  __v?: number;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  description?: string;
  image?: string;
  productCount: number;
  displayOrder: number;
  __v?: number;
}

export interface AgeRange {
  _id: string;
  label: string;
  slug: string;
  startYear: number;
  endYear: number;
  count?: number;
  displayOrder: number;
  description?: string;
  __v?: number;
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "twitter" | "linkedin" | "youtube";
  url: string;
}

export interface BusinessHour {
  day: string;
  openTime?: string;
  closeTime?: string;
  isClosed?: boolean;
}

export interface SiteSettings {
  _id?: string;
  businessName: string;
  businessDescription?: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  city?: string;
  country?: string;
  zipCode?: string;
  socialLinks: SocialLink[];
  logoUrl?: string;
  businessHours?: BusinessHour[];
  __v?: number;
}

export interface PageContent {
  _id: string;
  pageSlug: string;
  pageTitle: string;
  content: string;
  isPublished: boolean;
  seoId?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface SeoMeta {
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  twitterCard?: string;
  structuredData?: Record<string, unknown>;
}

// ═══════════════════════════════════════════════════════════
// HOME PAGE TYPES — Matches actual backend response
// ═══════════════════════════════════════════════════════════

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  displayOrder: number;
  _id: string;
}

export interface HomeSection {
  title: string;
  subtitle: string;
  description: string;
  sectionType: SectionType;
  displayOrder: number;
  isVisible: boolean;
  _id: string;
}

export interface CTAButton {
  text: string;
  url: string;
  style: "primary" | "secondary";
  _id: string;
}

export interface HomeContent {
  _id: string;
  heroSlideshow: HeroSlide[];
  sections: HomeSection[];
  featuredProductIds: string[];
  featuredProducts: Product[];
  ctaButtons: CTAButton[];
  seoId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface EnquiryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  message: string;
  productId?: string;
}

export interface EnquiryResponse {
  enquiry: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    productId?: string;
    productTitle?: string;
    status: string;
    createdAt: string;
  };
  confirmationMessage: string;
}

export interface ProductFilters {
  type?: ProductType;
  categoryId?: string;
  subcategoryId?: string;
  ageRangeIds?: string[];
  priceMin?: number;
  priceMax?: number;
  page?: number;
  limit?: number;
  sort?: SortOption;
  search?: string;
}

// ═══════════════════════════════════════════════════════════
// API RESPONSE WRAPPERS
// ═══════════════════════════════════════════════════════════

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  pagination?: Pagination;
  filters?: FilterFacets;
  timestamp: string;
  path: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: string;
  details: unknown;
  timestamp: string;
  path: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
