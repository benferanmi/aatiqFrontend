import { useSiteSettings } from "@/hooks/useApi";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Seo from "@/components/seo/Seo";
import EnquiryForm from "@/components/forms/EnquiryForm";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

const ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
} as const;

export default function Contact() {
  const { data: settings } = useSiteSettings();

  return (
    <>
      <Seo
        title="Contact"
        description="Visit the atelier in United States — by appointment, by enquiry."
      />

      <div className="container pt-28 md:pt-36">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <div className="mt-6">
          <p className="eyebrow-gold mb-3">Atelier · United States</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95]">
            By appointment.
          </h1>
        </div>
        <div className="hairline mt-12" />
      </div>

      <div className="container py-12 md:py-16 grid lg:grid-cols-12 gap-12">
        {/* Card */}
        <div className="lg:col-span-5 space-y-10">
          {settings && (
            <div className="space-y-6">
              <Item icon={MapPin} label="Address">
                {settings.address}
                <br />
                {settings.city}, {settings.country} {settings.zipCode}
              </Item>
              <Item icon={Mail} label="Email">
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-gold"
                >
                  {settings.email}
                </a>
              </Item>
              <Item icon={Phone} label="Telephone">
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="hover:text-gold block"
                >
                  {settings.phone}
                </a>
                {settings.alternatePhone && (
                  <a
                    href={`tel:${settings.alternatePhone.replace(/\s/g, "")}`}
                    className="hover:text-gold block"
                  >
                    {settings.alternatePhone}
                  </a>
                )}
              </Item>
            </div>
          )}

          {settings?.businessHours && (
            <div>
              <p className="eyebrow-gold mb-4">Hours</p>
              <table className="w-full text-sm">
                <tbody>
                  {settings.businessHours.map((h) => (
                    <tr key={h.day} className="border-b border-hairline/60">
                      <td className="py-2 text-muted-foreground font-mono uppercase tracking-widest text-[11px]">
                        {h.day}
                      </td>
                      <td className="py-2 text-right">
                        {h.isClosed ? (
                          <span className="text-muted-foreground italic">
                            Closed
                          </span>
                        ) : (
                          `${h.openTime} — ${h.closeTime}`
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {settings?.socialLinks && (
            <div>
              <p className="eyebrow mb-3">Follow</p>
              <div className="flex gap-2">
                {settings.socialLinks.map((s) => {
                  const Icon = ICONS[s.platform as keyof typeof ICONS];
                  if (!Icon) return null;
                  return (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:text-gold border border-hairline"
                      aria-label={s.platform}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <div className="border border-hairline p-8 md:p-12 bg-card">
            <p className="eyebrow-gold mb-2">Send a note</p>
            <h2 className="font-display text-3xl md:text-4xl mb-6">
              Write to the atelier
            </h2>
            <EnquiryForm />
          </div>

          {/* Map placeholder */}
          <div className="mt-8 aspect-[16/8] bg-muted relative overflow-hidden border border-hairline">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--gold)/0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)/0.15) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 border border-gold">
                  <MapPin className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </div>
                <p className="font-display text-xl mt-3">{settings?.address}</p>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  {settings?.city} · {settings?.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Item({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="shrink-0 w-10 h-10 border border-hairline flex items-center justify-center text-gold">
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </div>
      <div>
        <p className="eyebrow mb-1">{label}</p>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
