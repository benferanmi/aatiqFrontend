import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import RootLayout from "@/components/layout/RootLayout";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Categories from "@/pages/Categories";
import Category from "@/pages/Category";
import Subcategory from "@/pages/Subcategory";
import AgeRanges from "@/pages/AgeRanges";
import AgeRangeDetail from "@/pages/AgeRangeDetail";
import Enquiry from "@/pages/Enquiry";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import StaticPage from "@/pages/StaticPage";
import Search from "@/pages/Search";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
});

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:slug", element: <ProductDetail /> },
      { path: "/categories", element: <Categories /> },
      { path: "/categories/:slug", element: <Category /> },
      { path: "/categories/:slug/:subSlug", element: <Subcategory /> },
      { path: "/age-ranges", element: <AgeRanges /> },
      { path: "/age-ranges/:slug", element: <AgeRangeDetail /> },
      { path: "/enquiry", element: <Enquiry /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/terms", element: <StaticPage slug="terms" eyebrow="Legal" /> },
      {
        path: "/privacy",
        element: <StaticPage slug="privacy" eyebrow="Legal" />,
      },
      { path: "/search", element: <Search /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
