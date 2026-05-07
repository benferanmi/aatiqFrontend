

# Luxury Antiques — Curated Digital Gallery

A museum-grade, auction-house-caliber storefront for rare coins, vintage jewelry, and historical artifacts. Built React + Vite + TypeScript + Tailwind + Shadcn, with Zustand, TanStack Query, React Hook Form + Zod, and a typed mock data layer that exactly mirrors your documented API responses — flip one env var to go live.

## Creative direction — "The Ivory Vault"

A light, editorial canvas with cinematic dark moments. Not a template. Not an eCommerce grid. An archive you walk through.

- **Palette (light, default):** Ivory `#FBF9F4` canvas, Ink `#141210`, Gold `#A48E58`, Beige `#D7CBA8`, Bronze `#8B7355`. Hairline rules in warm graphite.
- **Palette (dark mode):** Obsidian `#0E0D0B` canvas, candle-warm Gold, ivory text. Toggle in the navbar — same brand, after-hours.
- **Type:** Cormorant Garamond (display, italic-friendly) for headlines, Inter for body, IBM Plex Mono for catalog numbers (`No. 0427 / 24`). Wide tracking on uppercase eyebrows.
- **Signature motifs:**
  - **Archive numbering** on every product card (`№ 0427`) and section (`I — The Vault`, `II — Just Acquired`).
  - **Hairline gold rules** between sections instead of heavy dividers.
  - **Asymmetric editorial grids** — products break the grid, captions sit in the margin like museum placards.
  - **Hover = spotlight:** card desaturates surroundings, image scales subtly, gold underline draws under the title.
  - **Slow reveal animations** — fade + 8px rise on scroll, never bouncy.
  - **Cursor-tracked vignette** on hero and product gallery (subtle, opt-out on touch).

## Pages (all 12)

1. **Home** — Cinematic hero with auto-advancing slideshow + ken-burns drift, brand mark with year-established line, then five editorially-numbered acts: *I. Featured Collections* (asymmetric 5-up grid), *II. Become Part of Our Story* (split text/image with pull-quote), *III. Just Acquired* (horizontal scroll rail), *IV. Noteworthy Highlights* (4-card mosaic), *V. Visit / CTA*.
2. **Products catalog** `/products` — Editorial grid with sticky sidebar filters on desktop, full-screen drawer on mobile. Active filters as removable pill badges. Sort dropdown styled as a museum label. Skeleton placards while loading.
3. **Product detail** `/products/[slug]` — Two-column: large gallery (main + vertical thumbnails on desktop, swipeable on mobile, click-to-zoom lightbox) and a placard column with title, archive №, price, ageRange, "Enquire" primary button, specifications as a clean definition-list table, then *Related from this Period* rail. Sticky bottom CTA on mobile.
4. **Categories index** `/categories` — Three large editorial tiles (Antiques / Jewelry / Coins) with product counts.
5. **Category** `/categories/[slug]` — Header with category image, subcategory chip-nav, then filtered product grid.
6. **Subcategory** `/categories/[slug]/[subSlug]` — Same shell, deeper breadcrumbs.
7. **Age Ranges index** `/age-ranges` — A vertical timeline (Ancient → Modern) — each era is a clickable band with year span and count.
8. **Age Range detail** `/age-ranges/[slug]` — Period header with year span + short intro, then product grid.
9. **Enquiry** `/enquiry` — Standalone form page, also reusable as a modal from product pages with product context pre-filled. Zod validation, inline errors, success state with "What happens next" timeline.
10. **About** `/about` — Long-form editorial with drop caps, brand story, and contact info from site settings.
11. **Contact** `/contact` — Two columns: contact card (email, phones, address, business hours table, social) + contact form. Static map placeholder.
12. **Terms** `/terms` and **Privacy** `/privacy` — Typographically-pleasing long-form pages from `/pages/[slug]`.
- **Plus:** **Search** `/search?q=` and a custom **404** styled as a missing-artifact placard.

## Filtering & search

- Zustand `filterStore` holds `{ type, categoryId, subcategoryId, ageRangeIds[], priceMin, priceMax, sort, page }`, synced to URL query params for shareable links.
- TanStack Query keyed on the filter object → instant refetch, cached per combination.
- Filters: Category (single), Age Ranges (multi checkbox), Price (dual slider), Sort (New / Featured / Price ↑ / Price ↓). Active filters render as removable pills above the grid; "Clear all" at the end.
- Search bar in navbar opens a command-palette-style overlay, debounced, hits `/products?search=`.

## Data layer (the swap-ready mock)

- `src/lib/api.ts` — Axios instance, base URL from `VITE_API_URL`.
- `src/lib/mock/` — Typed fixtures matching every documented response (products, categories, subcategories, age ranges, site settings, pages, featured, highlights, home, enquiry POST). Realistic luxury copy + Unsplash/Cloudinary-style sample imagery.
- `src/lib/client.ts` — Thin wrapper: if `VITE_USE_MOCKS=true`, resolves from fixtures with simulated latency; otherwise hits the real API. **One env var to go live.** A small dev-only ribbon in the corner shows "MOCK DATA" so it's never shipped accidentally.
- TanStack Query cache policies per your spec (products 5min, categories 1h, settings 24h).

## Forms

- React Hook Form + Zod schema exactly per your validation rules. Inline field errors, disabled submit while pending, sonner toast on success/failure, optimistic reset, productId injected when launched from a product page.

## SEO & deployment-ready

- `react-helmet-async` per page: title, description, canonical, Open Graph, Twitter card, JSON-LD `Product` schema on detail pages.
- `public/robots.txt` and a build-time-generated `public/sitemap.xml` script that reads from mock/live products + static routes.
- Semantic HTML, alt text on every image, focus-visible rings, prefers-reduced-motion respected, Lighthouse-friendly.
- Lazy-loaded route chunks, image `loading="lazy"`, `srcset` via a small `<Image>` wrapper.

## Theming

- CSS variables in `index.css` for both light (default) and `.dark` palettes. Toggle in navbar persists to `localStorage`. All Shadcn components rewired to brand tokens — no default blue anywhere.
- Tailwind config extended with `brand.*` tokens, `font-display` (Cormorant), `font-sans` (Inter), `font-mono` (Plex Mono).

## Folder structure (Vite, Next-style names)

```
src/
  app/                     # route components, mirrors Next's app/ naming
    (marketing)/{home,about,contact,terms,privacy}
    products/{list,detail}
    categories/{index,detail,subcategory}
    age-ranges/{index,detail}
    enquiry, search, not-found
  components/
    layout/  common/  products/  filters/  forms/  home/  search/  seo/
  hooks/     # useProducts, useProduct, useCategories, useAgeRanges, useSiteSettings, useFilters, useSearchProducts
  store/     # filterStore, uiStore, searchStore (Zustand)
  lib/       # api, client, mock/, queryClient, validation, constants, types, helpers
  styles/    # globals.css, variables.css
  utils/     # cn, formatPrice, formatDate, slugify
  router.tsx
```

## Out of scope for v1 (call out clearly)

- No actual checkout / payments (leads model — confirmed).
- No auth (no `(auth)` group built; folder reserved).
- Image zoom uses CSS transform + lightbox, not a paid library.
- Map on Contact is a styled placeholder unless you want a Mapbox/Google key wired later.

Approve and I'll build the whole thing in one pass — themed, mocked, responsive, SEO-ready, deployable.

