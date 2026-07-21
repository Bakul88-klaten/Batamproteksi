import type { Metadata } from "next";
import "./globals.css";
import { buildLocalBusinessSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SITE_TITLE = "BatamProteksi — Asuransi Kendaraan & Properti Batam";
const SITE_DESCRIPTION =
  "Konsultasi asuransi kendaraan, properti, dan surety bond untuk warga dan pelaku usaha di Batam.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | BatamProteksi",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  // Default OG/Twitter card — pages that need a different title/description
  // (e.g. app/layanan/[slug]) override just those fields; this fallback
  // means every page still gets a usable social preview instead of none.
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "BatamProteksi",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Single locale (id-ID). No [locale] route segment, no URL_MAP/REVERSE_MAP
  // language switcher — this site is Indonesian-only by design.
  // Site-wide entity schema. NAP data matches what's rendered in
  // app/kontak/page.tsx.
  const localBusinessSchema = buildLocalBusinessSchema({
    address: {
      streetAddress: "Komplek Tanjung Trisakti Blok A No. 8, Sei Panas",
      addressLocality: "Batam",
      addressRegion: "Kepulauan Riau",
    },
    telephone: "+628981874808",
  });

  return (
    <html lang="id-ID">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <header className="border-b border-line">
          <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
            <span className="font-display text-lg">BatamProteksi</span>
            <nav className="font-body text-sm flex gap-6">
              <a href="/layanan">Layanan</a>
              <a href="/tentang">Tentang</a>
              <a href="/kontak">Kontak</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
        <footer className="border-t border-line mt-16">
          <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-slate">
            © {new Date().getFullYear()} BatamProteksi
          </div>
        </footer>
      </body>
    </html>
  );
}
