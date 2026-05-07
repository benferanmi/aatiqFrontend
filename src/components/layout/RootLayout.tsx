import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchOverlay from "@/components/search/SearchOverlay";
import EnquiryModal from "@/components/forms/EnquiryModal";
import { USE_MOCKS } from "@/lib/constants";

export default function RootLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <SearchOverlay />
      <EnquiryModal />
      {USE_MOCKS && import.meta.env.DEV && (
        <div className="fixed bottom-3 left-3 z-50 font-mono text-[9px] uppercase tracking-widest bg-foreground/90 text-background px-2 py-1 pointer-events-none">
          Mock data
        </div>
      )}
      <ScrollRestoration />
    </div>
  );
}
