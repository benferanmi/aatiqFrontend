import { Link } from "react-router-dom";
import Seo from "@/components/seo/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Not Found" />
      <div className="container min-h-[80vh] flex items-center justify-center pt-32 pb-20">
        <div className="max-w-xl text-center border border-hairline p-12 md:p-16">
          <p className="eyebrow-gold mb-6">
            № 404 — From the missing-artifact register
          </p>
          <h1 className="font-display text-7xl md:text-8xl leading-[0.9]">
            Untraced.
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            The piece you sought is not in our archive — it may have been
            deaccessioned, mis-catalogued, or never to have arrived. The atelier
            apologises for the absence.
          </p>
          <div className="hairline my-8" />
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="font-mono text-[11px] uppercase tracking-widest border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
            >
              Return home
            </Link>
            <Link
              to="/products"
              className="font-mono text-[11px] uppercase tracking-widest border border-hairline px-5 py-3 hover:border-gold hover:text-gold transition-colors"
            >
              Browse the vault
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
