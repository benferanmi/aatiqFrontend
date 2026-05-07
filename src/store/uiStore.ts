import { create } from "zustand";

interface UIState {
  mobileMenuOpen: boolean;
  filterDrawerOpen: boolean;
  searchOpen: boolean;
  enquiryOpen: boolean;
  enquiryProductId?: string;
  enquiryProductTitle?: string;
  setMobileMenu: (v: boolean) => void;
  setFilterDrawer: (v: boolean) => void;
  setSearch: (v: boolean) => void;
  openEnquiry: (productId?: string, title?: string) => void;
  closeEnquiry: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  filterDrawerOpen: false,
  searchOpen: false,
  enquiryOpen: false,
  setMobileMenu: (v) => set({ mobileMenuOpen: v }),
  setFilterDrawer: (v) => set({ filterDrawerOpen: v }),
  setSearch: (v) => set({ searchOpen: v }),
  openEnquiry: (productId, title) =>
    set({
      enquiryOpen: true,
      enquiryProductId: productId,
      enquiryProductTitle: title,
    }),
  closeEnquiry: () =>
    set({
      enquiryOpen: false,
      enquiryProductId: undefined,
      enquiryProductTitle: undefined,
    }),
}));
