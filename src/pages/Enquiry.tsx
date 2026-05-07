import { useSearchParams } from "react-router-dom";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Seo from "@/components/seo/Seo";

export default function Enquiry() {
  const [params] = useSearchParams();
  const productId = params.get("productId") ?? undefined;

  return (
    <>
      <Seo
        title="Enquire"
        description="Speak privately to the atelier — replies within one business day."
      />

      <div className="container pt-28 md:pt-36">
        <Breadcrumbs items={[{ label: "Enquire" }]} />
      </div>

      <div className="container grid lg:grid-cols-12 gap-16 py-12 md:py-20">
        <div className="lg:col-span-5">
          <p className="eyebrow-gold mb-3">Private channel</p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
            Speak to the atelier.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md">
            Whether you have a question about a piece in the catalogue, or you
            are searching for something specific, we'd be pleased to hear from
            you.
          </p>

          <ol className="mt-10 space-y-6">
            {[
              [
                "You write to us",
                "Tell us what you're looking for. Be as specific or as open as you like.",
              ],
              [
                "We read it personally",
                "Every enquiry is opened by a member of the atelier — never an autoresponder.",
              ],
              [
                "A reply within a day",
                "We respond by email or by phone, whichever you prefer. If your enquiry concerns a specific piece, we hold it pending your reply.",
              ],
            ].map(([t, d], i) => (
              <li key={i} className="flex gap-5">
                <span className="font-mono text-[11px] uppercase tracking-widest text-gold pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-2xl">{t}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {d}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-28 border border-hairline p-8 md:p-12 bg-card">
            <EnquiryForm productId={productId} />
          </div>
        </div>
      </div>
    </>
  );
}
