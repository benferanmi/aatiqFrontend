import { Link } from "react-router-dom";
import { useAgeRanges } from "@/hooks/useApi";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Seo from "@/components/seo/Seo";
import { yearLabel } from "@/lib/helpers";

export default function AgeRanges() {
  const { data, isLoading } = useAgeRanges();

  return (
    <>
      <Seo
        title="Eras"
        description="Browse the archive by historical period — antiquity to the early modern."
      />

      <div className="container pt-28 md:pt-36">
        <Breadcrumbs items={[{ label: "Eras" }]} />
        <div className="mt-6">
          <p className="eyebrow-gold mb-3">A Timeline</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            By era — antiquity to the early modern.
          </h1>
        </div>
        <div className="hairline mt-10" />
      </div>

      <div className="container py-16 md:py-20">
        {isLoading && (
          <p className="eyebrow-gold animate-pulse">Reading the archive…</p>
        )}

        <div className="relative max-w-4xl mx-auto">
          {/* Center timeline rail */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-hairline -translate-x-px"
            aria-hidden
          />

          <div className="space-y-1">
            {data?.map((a, i) => (
              <Link
                key={a.id}
                to={`/age-ranges/${a.slug}`}
                className="group relative grid grid-cols-12 items-center py-7 md:py-10 hover:bg-muted/40 px-4 -mx-4 transition-colors"
              >
                {/* Dot */}
                <span className="absolute left-4 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-background border border-foreground group-hover:bg-gold group-hover:border-gold transition-colors" />

                {/* Year (left on desktop, inline on mobile) */}
                <div className="col-span-12 md:col-span-5 md:text-right md:pr-12 pl-12 md:pl-0">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {yearLabel(a.startYear, a.endYear)}
                  </p>
                </div>

                {/* Label (right on desktop) */}
                <div className="col-span-12 md:col-span-7 md:pl-12 pl-12">
                  <h2 className="font-display text-3xl md:text-5xl group-hover:text-gold transition-colors">
                    {a.label}
                  </h2>
                  {a.description && (
                    <p className="text-sm text-muted-foreground mt-2 max-w-md">
                      {a.description}
                    </p>
                  )}
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-3">
                    {String(a.count ?? 0).padStart(2, "0")} pieces
                  </p>
                </div>

                {/* Numeral */}
                <span className="hidden md:block absolute right-0 top-7 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
