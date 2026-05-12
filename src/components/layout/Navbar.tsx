import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Search, Sun, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, COLLECTION_LINKS, APP_NAME } from "@/lib/constants";
import { useTheme } from "@/hooks/useTheme";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const setSearch = useUIStore((s) => s.setSearch);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Whether this page has a hero (transparent navbar needed)
  const isHeroPage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCollectionsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setCollectionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Transparent = on hero page AND not scrolled AND mobile menu not open
  const isTransparent = isHeroPage && !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isTransparent
          ? "bg-transparent"
          : "bg-[#F5EFE6] dark:bg-[#0F0F0F] border-b border-[#C6A96B]/20",
      )}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        {/* Left: Hamburger Menu (mobile only) */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "lg:hidden p-2.5 transition-colors shrink-0",
            isTransparent
              ? "text-white/70 hover:text-white"
              : "text-foreground hover:text-[#C6A96B]",
          )}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>

        {/* Center: Logo */}
        <Link
          to="/"
          className="flex items-baseline gap-2.5 group shrink-0 absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0"
        >
          <span
            className={cn(
              "font-display text-2xl md:text-[26px] leading-none tracking-tight transition-colors duration-300",
              isTransparent ? "text-white" : "text-foreground",
            )}
          >
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="h-[50px] md:h-[60px] w-auto"
            />
          </span>
        </Link>

        {/* Desktop nav (center) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center ml-12">
          {NAV_LINKS.map((l) => {
            if (l.label === "Collections") {
              return (
                <div key={l.to} className="relative" ref={dropdownRef}>
                  <button
                    onMouseEnter={() => setCollectionsOpen(true)}
                    onClick={() => setCollectionsOpen((v) => !v)}
                    className={cn(
                      "flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-300",
                      location.pathname.startsWith("/categories")
                        ? "text-[#C6A96B]"
                        : isTransparent
                          ? "text-white/75 hover:text-white"
                          : "text-foreground/70 hover:text-foreground",
                    )}
                  >
                    {l.label}
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform duration-300",
                        collectionsOpen ? "rotate-180" : "",
                      )}
                      strokeWidth={1.5}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    onMouseEnter={() => setCollectionsOpen(true)}
                    onMouseLeave={() => setCollectionsOpen(false)}
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 mt-5 w-[520px]",
                      "bg-[#F5EFE6] dark:bg-[#141210] border border-[#C6A96B]/20",
                      "shadow-[0_24px_64px_-12px_rgba(15,10,0,0.25)]",
                      "transition-all duration-300 origin-top",
                      collectionsOpen
                        ? "opacity-100 scale-y-100 pointer-events-auto translate-y-0"
                        : "opacity-0 scale-y-95 pointer-events-none -translate-y-2",
                    )}
                  >
                    {/* Search Bar */}
                    <div className="px-6 pt-5 pb-4 border-b border-[#C6A96B]/15">
                      <div className="relative">
                        <Search
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40"
                          strokeWidth={1.5}
                        />
                        <input
                          type="text"
                          placeholder="Search disciplines..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-[#EDE5D8] dark:bg-[#1C1714] border border-[#C6A96B]/20 rounded text-sm focus:outline-none focus:border-[#C6A96B]/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Header */}
                    <div className="px-6 pt-4 pb-3 border-b border-[#C6A96B]/15 flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50">
                        Three disciplines
                      </span>
                      <Link
                        to="/categories"
                        className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C6A96B] hover:text-foreground transition-colors"
                      >
                        View all →
                      </Link>
                    </div>

                    {/* Categories */}
                    <div className="divide-y divide-[#C6A96B]/10">
                      {COLLECTION_LINKS.map((c, i) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="group flex items-center gap-5 px-6 py-4 hover:bg-[#EDE5D8] dark:hover:bg-[#1C1714] transition-colors"
                        >
                          <span className="font-mono text-xs text-muted-foreground/40 shrink-0 w-5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-xl leading-none group-hover:text-[#C6A96B] transition-colors">
                              {c.label}
                            </p>
                            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/50 mt-1.5">
                              {c.description}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-[#C6A96B] opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3 border-t border-[#C6A96B]/15 bg-[#EDE5D8]/50 dark:bg-[#1C1714]/50">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                        Islamic · Mughal · Persian · Pre-Islamic
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-300 relative group",
                    isActive
                      ? "text-[#C6A96B]"
                      : isTransparent
                        ? "text-white/75 hover:text-white"
                        : "text-foreground/80 hover:text-foreground",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px bg-[#C6A96B] transition-all duration-400 origin-left",
                        isActive
                          ? "w-full scale-x-100"
                          : "w-full scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Theme Toggle & Enquiry */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0 ml-auto lg:ml-0">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className={cn(
              "p-2.5 transition-colors",
              isTransparent
                ? "text-white/70 hover:text-white"
                : "text-foreground hover:text-[#C6A96B]",
            )}
          >
            {theme === "dark" ? (
              <Sun className="h-[17px] w-[17px]" strokeWidth={1.5} />
            ) : (
              <Moon className="h-[17px] w-[17px]" strokeWidth={1.5} />
            )}
          </button>

          <Link
            to="/enquiry"
            className={cn(
              "hidden md:inline-flex ml-2 items-center font-mono text-xs uppercase tracking-[0.15em] px-5 py-2.5 transition-all duration-300",
              isTransparent
                ? "border border-white/30 text-white hover:bg-[#C6A96B] hover:border-[#C6A96B] hover:text-[#0F0F0F]"
                : "border border-foreground/40 text-foreground hover:bg-foreground hover:text-background",
            )}
          >
            Enquire
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden bg-[#F5EFE6] dark:bg-[#0F0F0F] border-t border-[#C6A96B]/15 transition-[max-height,opacity] duration-500",
          mobileOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container py-8 flex flex-col gap-1">
          {NAV_LINKS.map((l, i) => {
            if (l.label === "Collections") {
              return (
                <div key={l.to} className="border-b border-[#C6A96B]/15">
                  {/* Mobile Search */}
                  <div className="px-4 py-4">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40"
                        strokeWidth={1.5}
                      />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-[#EDE5D8] dark:bg-[#1C1714] border border-[#C6A96B]/20 rounded text-sm focus:outline-none focus:border-[#C6A96B]/50 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileCollectionsOpen((v) => !v)}
                    className="w-full flex items-baseline justify-between px-4 py-5 group text-foreground"
                  >
                    <span className="font-display text-3xl">Collections</span>
                    <div className="flex items-center gap-3">
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300 text-muted-foreground",
                          mobileCollectionsOpen ? "rotate-180" : "",
                        )}
                        strokeWidth={1.5}
                      />
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-[max-height,opacity] duration-400",
                      mobileCollectionsOpen
                        ? "max-h-80 opacity-100"
                        : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="pb-5 flex flex-col gap-1 pl-4">
                      {COLLECTION_LINKS.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="flex items-center gap-4 py-3 hover:text-[#C6A96B] transition-colors group"
                        >
                          <span className="font-display text-xl">
                            {c.label}
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                            {c.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-baseline justify-between border-b border-[#C6A96B]/15 px-4 py-5 group",
                    isActive ? "text-[#C6A96B]" : "text-foreground",
                  )
                }
              >
                <span className="font-display text-3xl">{l.label}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </NavLink>
            );
          })}

          <Link
            to="/enquiry"
            className="mt-7 mx-4 inline-flex items-center justify-center font-mono text-xs uppercase tracking-[0.2em] border border-[#C6A96B]/50 text-[#C6A96B] px-5 py-3.5 hover:bg-[#C6A96B] hover:text-[#0F0F0F] transition-colors"
          >
            Submit an Enquiry
          </Link>
        </nav>
      </div>
    </header>
  );
}
