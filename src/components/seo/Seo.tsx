import { Helmet } from "react-helmet-async";
import { APP_NAME } from "@/lib/constants";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown>;
}

export default function Seo({
  title,
  description,
  image,
  canonical,
  type = "website",
  jsonLd,
}: Props) {
  const fullTitle = title
    ? `${title} — ${APP_NAME}`
    : `${APP_NAME} — The Ivory Vault`;
  const desc =
    description ??
    "A private gallery of museum-quality antiques, rare coins, and vintage jewelry.";
  const url =
    canonical ?? (typeof window !== "undefined" ? window.location.href : "");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {url && <link rel="canonical" href={url} />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
