import { usePage } from "@/hooks/useApi";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Seo from "@/components/seo/Seo";

export default function StaticPage({
  slug,
  eyebrow,
}: {
  slug: "terms" | "privacy";
  eyebrow: string;
}) {
  const { data } = usePage(slug);

  return (
    <>
      <Seo
        title={data?.title ?? eyebrow}
        description={`${eyebrow} — Aatiq.`}
      />

      <div className="container pt-28 md:pt-36">
        <Breadcrumbs items={[{ label: data?.title ?? eyebrow }]} />
        <div className="mt-6 max-w-3xl">
          <p className="eyebrow-gold mb-3">{eyebrow}</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[0.95]">
            {data?.title}
          </h1>
        </div>
        <div className="hairline mt-12" />
      </div>

      <div className="container py-16 md:py-20">
        <article
          className="max-w-3xl prose prose-neutral dark:prose-invert
            [&_h3]:font-display [&_h3]:text-3xl [&_h3]:mt-12 [&_h3]:mb-3
            [&_p]:text-[16px] [&_p]:leading-[1.8] [&_p]:text-foreground/85
            [&_a]:text-gold [&_a]:underline-offset-4"
          dangerouslySetInnerHTML={{ __html: data?.content ?? "" }}
        />
      </div>
    </>
  );
}
