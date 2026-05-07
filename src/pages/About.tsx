import { Link } from "react-router-dom";
import { usePage, useSiteSettings } from "@/hooks/useApi";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Seo from "@/components/seo/Seo";

export default function About() {
  const { data: page } = usePage("about");
  const { data: settings } = useSiteSettings();

  return (
    <>
      <Seo
        title="About"
        description="Aatiq is a private dealer in museum-quality antiques, coins and vintage jewelry."
      />

      <div className="container pt-28 md:pt-36">
        <Breadcrumbs items={[{ label: "About" }]} />
        <div className="mt-6 max-w-4xl">
          <p className="eyebrow-gold mb-3">Established MMIV</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92]">
            A quiet practice, carried out with care.
          </h1>
        </div>
        <div className="hairline mt-12" />
      </div>

      <div className="container py-16 md:py-24 grid lg:grid-cols-12 gap-16">
        <article
          className="lg:col-span-7 lg:col-start-2 prose prose-neutral dark:prose-invert max-w-none
          [&_p.lead]:dropcap [&_p.lead]:text-2xl [&_p.lead]:font-display [&_p.lead]:leading-snug [&_p.lead]:text-foreground
          [&_p]:text-[17px] [&_p]:leading-[1.75] [&_p]:text-foreground/85
          [&_h3]:font-display [&_h3]:text-3xl [&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:text-foreground"
          dangerouslySetInnerHTML={{ __html: page?.content ?? "" }}
        />
        <aside className="lg:col-span-3 lg:col-start-10">
          <div className="lg:sticky lg:top-28 border-l border-gold pl-6 space-y-8">
            <div>
              <p className="eyebrow mb-3">Visit</p>
              {settings && (
                <address className="not-italic text-sm leading-relaxed">
                  {settings.address}
                  <br />
                  {settings.city}, {settings.country}
                  <br />
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-gold hover:underline"
                  >
                    {settings.email}
                  </a>
                </address>
              )}
            </div>
            <div>
              <p className="eyebrow mb-3">By appointment</p>
              <Link
                to="/contact"
                className="font-mono text-[11px] uppercase tracking-widest spotlight-link"
              >
                Arrange a viewing
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
