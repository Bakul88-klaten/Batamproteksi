import type { Metadata } from "next";
import "./globals.css";
import { buildLocalBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    default: "BatamProteksi — Asuransi Kendaraan & Properti Batam",
    template: "%s | BatamProteksi",
  },
  description:
    "Konsultasi asuransi kendaraan, properti, dan surety bond untuk warga dan pelaku usaha di Batam.",
  metadataBase: new URL("https://batamproteksi.biz.id"),
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
