import { Helmet } from "react-helmet-async";
import { APP_NAME } from "@/lib/constants";
import { useLocation } from "react-router-dom"; 

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

  // Get the clean pathname (e.g., "/products/rare-coin") without query strings
  const location = useLocation(); 
  
  // Construct a perfectly clean canonical URL every time
  const baseDomain = "https://aatiq.com";
  const cleanPathname = location.pathname === "/" ? "" : location.pathname;
  const url = canonical ?? `${baseDomain}${cleanPathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={url} />
      
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