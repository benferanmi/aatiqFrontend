import axios from "axios";
import { API_BASE_URL, USE_MOCKS } from "./constants";
import type {
  ProductFilters,
  ProductsResponse,
  Product,
  Category,
  Subcategory,
  AgeRange,
  SiteSettings,
  PageContent,
  HomeContent,
  EnquiryFormData,
  EnquiryResponse,
  ApiResponse,
  ApiSuccessResponse,
  Pagination,
  FilterFacets,
} from "./types";

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    // normalize error
    const message =
      err?.response?.data?.message || err?.message || "Request failed";
    return Promise.reject(new Error(message));
  },
);

async function getJSON<T>(
  path: string,
  params?: Record<string, unknown>,
): Promise<T> {
  const res = await http.get(path, { params });
  return res.data as T;
}

export const api = {
  getProducts: (f?: ProductFilters): Promise<ProductsResponse> =>
    getJSON<ApiSuccessResponse<Product[]>>("/products", {
      type: f?.type,
      categoryId: f?.categoryId,
      subcategoryId: f?.subcategoryId,
      ageRangeId: f?.ageRangeIds?.[0],
      page: f?.page ?? 1,
      limit: f?.limit ?? 12,
      sort: f?.sort,
      search: f?.search,
    }).then((response) => {
      if (!response.success) {
        throw new Error(response.message);
      }
      return {
        products: response.data,
        pagination: response.pagination,
        filters: response.filters,
      };
    }),

  getProduct: (slug: string) =>
    getJSON<
      ApiSuccessResponse<{
        product: Product;
      }>
    >(`/products/slug/${slug}`).then((response) => {
      if (!response.success) throw new Error(response.message);
      return response.data;
    }),

  getFeatured: (): Promise<Product[]> =>
    getJSON<ApiSuccessResponse<{ products: Product[] }>>(
      "/products/featured",
    ).then((response) => {
      if (!response.success) throw new Error(response.message);
      return response.data.products;
    }),

  getHighlights: (): Promise<Product[]> =>
    getJSON<ApiSuccessResponse<{ products: Product[] }>>(
      "/products/highlights",
    ).then((response) => {
      if (!response.success) throw new Error(response.message);
      return response.data.products;
    }),

  getCategories: (): Promise<Category[]> =>
    getJSON<ApiSuccessResponse<{ categories: Category[] }>>("/categories").then(
      (response) => {
        if (!response.success) throw new Error(response.message);
        return response.data.categories;
      },
    ),

  getCategoryBySlug: (slug: string) =>
    getJSON<
      ApiSuccessResponse<{
        category: Category;
        subcategories: Subcategory[];
      }>
    >(`/categories/slug/${slug}`).then((response) => {
      if (!response.success) throw new Error(response.message);
      return response.data;
    }),

  getSubcategoryBySlug: (slug: string) =>
    getJSON<
      ApiSuccessResponse<{
        subcategory: Subcategory;
      }>
    >(`/subcategories/slug/${slug}`).then((response) => {
      if (!response.success) throw new Error(response.message);
      return response.data;
    }),

  getAgeRanges: (): Promise<AgeRange[]> =>
    getJSON<ApiSuccessResponse<{ ageRanges: AgeRange[] }>>(
      "/filters/age-ranges",
    ).then((response) => {
      if (!response.success) throw new Error(response.message);
      return response.data.ageRanges;
    }),

  getAgeRangeBySlug: (slug: string): Promise<AgeRange> =>
    getJSON<ApiSuccessResponse<AgeRange>>(`/filters/age-ranges/${slug}`).then(
      (response) => {
        if (!response.success) throw new Error(response.message);
        return response.data;
      },
    ),

  getSiteSettings: (): Promise<SiteSettings> =>
    getJSON<ApiSuccessResponse<{ siteSettings: SiteSettings }>>(
      `/pages/contact`,
    ).then((response) => {
      if (!response.success) throw new Error(response.message);
      return response.data.siteSettings;
    }),

  getPage: (slug: string): Promise<PageContent> =>
    getJSON<ApiSuccessResponse<{ page: PageContent }>>(`/pages/${slug}`).then(
      (response) => {
        if (!response.success) throw new Error(response.message);
        return response.data.page;
      },
    ),

  getHome: (): Promise<HomeContent> =>
    getJSON<ApiSuccessResponse<HomeContent>>("/pages/home").then((response) => {
      if (!response.success) throw new Error(response.message);
      return response.data;
    }),

  submitEnquiry: (data: EnquiryFormData): Promise<EnquiryResponse> =>
    http.post("/enquiries", data).then((r) => {
      const response = r.data as ApiResponse<EnquiryResponse>;
      if (!response.success) {
        throw new Error((response as any).message);
      }
      return (response as ApiSuccessResponse<EnquiryResponse>).data;
    }),
};
