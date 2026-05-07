import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { useSiteSettings } from "@/hooks/useApi";
import { APP_NAME } from "@/lib/constants";

const ICONS: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
};

export default function Footer() {
  const { data: settings } = useSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-hairline">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-5">
            <Link to="/" className="font-display text-3xl md:text-4xl">
              {APP_NAME.split(" ")[0]}
              <span className="text-gold italic">
                {" "}
                {APP_NAME.split(" ")[1]}
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm md:text-[15px] leading-relaxed text-muted-foreground">
              A private gallery of museum-quality antiques, coins and vintage
              jewelry — held briefly, catalogued carefully, sent only where they
              belong.
            </p>
            <div className="mt-6 flex items-center gap-1">
              {settings?.socialLinks?.map((s) => {
                const Icon = ICONS[s.platform];
                if (!Icon) return null;
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="p-2 hover:text-gold transition-colors"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div className="col-span-1 md:col-span-2">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/products" className="hover:text-gold">
                  The Vault
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-gold">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/age-ranges" className="hover:text-gold">
                  Eras
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-gold">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* {Menu} */}
          <div className="col-span-1 md:col-span-2">
            <p className="eyebrow mb-5">Menus</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-gold">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/enquiry" className="hover:text-gold">
                  Enquire
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gold">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-gold">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit */}
          <div className="col-span-2 md:col-span-3">
            <p className="eyebrow mb-5">Visit by appointment</p>
            {settings && (
              <address className="not-italic text-sm leading-relaxed text-muted-foreground space-y-1">
                <div>{settings.address}</div>
                <div>
                  {settings.city}, {settings.country}
                </div>
                <div className="pt-2">
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-gold"
                  >
                    {settings.email}
                  </a>
                </div>
                <div>
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="hover:text-gold"
                  >
                    {settings.phone}
                  </a>
                </div>
              </address>
            )}
          </div>
        </div>

        <div className="hairline mt-16 mb-6" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
          <p>
            © {year} {APP_NAME} — All rights reserved
          </p>
          <p>Curated in United States · Shipped worldwide</p>
        </div>
      </div>
    </footer>
  );
}
