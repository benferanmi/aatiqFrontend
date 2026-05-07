export function formatPrice(amountKobo: number, currency = "NGN"): string {
  // Backend stores in smallest unit (kobo). Convert to major unit.
  const major = amountKobo / 100;
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(major);
  } catch {
    return `₦${major.toLocaleString()}`;
  }
}

export function archiveNumber(itemNumber: string): string {
  // turn "AUR-0427" or "0427/24" into "№ 0427"
  const digits = itemNumber.match(/\d+/g)?.[0] ?? "0000";
  return `№ ${digits.padStart(4, "0")}`;
}

export function yearLabel(start: number, end: number): string {
  const fmt = (y: number) => (y < 0 ? `${Math.abs(y)} BC` : `${y} AD`);
  return `${fmt(start)} — ${fmt(end)}`;
}

export function romanize(num: number): string {
  const map: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let n = num;
  let out = "";
  for (const [v, s] of map) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}
export function parseRoman(s: string): number {
  const map: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = map[s[i]] ?? 0;
    const nxt = map[s[i + 1]] ?? 0;
    total += cur < nxt ? -cur : cur;
  }
  return total || 1;
}
