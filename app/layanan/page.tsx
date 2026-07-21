import type { Metadata } from "next";
import Link from "next/link";
import { getLayananByKategori } from "@/lib/content";
import { buildCollectionPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Layanan Asuransi",
  description:
    "Pilihan asuransi kendaraan, properti, liability, dan surety bond untuk warga serta pelaku usaha di Batam.",
  alternates: { canonical: "/layanan" },
};

const KATEGORI_INTRO: Record<string, string> = {
  Kendaraan:
    "Perlindungan untuk kendaraan pribadi yang dipakai sehari-hari di jalanan Batam — dari kepadatan Batam Centre dan Nagoya sampai jalur logistik ke Batu Ampar.",
  Properti:
    "Perlindungan rumah, ruko, kantor, dan gudang dari kebakaran, banjir, dan risiko lain — relevan baik untuk hunian di area padat maupun gudang logistik di kawasan industri.",
  Liability:
    "Perlindungan tanggung jawab hukum bagi usaha yang beroperasi di Batam, termasuk usaha ritel, F&B, kontraktor, dan penyelenggara acara yang menerima kunjungan pihak ketiga.",
  "Surety Bond":
    "Jaminan formal bagi kontraktor dan pelaku usaha yang mengikuti tender maupun menjalankan proyek di Batam, dari jaminan penawaran sampai jaminan pemeliharaan pasca-proyek.",
};

export default function LayananIndexPage() {
  const grouped = getLayananByKategori();
  const breadcrumb = [
    { name: "Beranda", href: "/" },
    { name: "Layanan", href: "/layanan" },
  ];

  const allItems = Array.from(grouped.values()).flat();
  const jsonLd = [
    buildCollectionPageSchema({
      name: "Layanan Asuransi BatamProteksi",
      description: metadata.description as string,
      url: `${SITE_URL}/layanan`,
      items: allItems.map((item) => ({
        name: item.judul,
        url: `${SITE_URL}/layanan/${item.slug}`,
      })),
    }),
    buildBreadcrumbSchema(
      breadcrumb.map((b) => ({ name: b.name, url: `${SITE_URL}${b.href}` }))
    ),
  ];

  return (
    <div>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Breadcrumb items={breadcrumb} />

      <p className="manifest-index mb-2">BATAM · MANIFEST LAYANAN</p>
      <h1 className="text-3xl mb-4">Layanan Asuransi</h1>
      <p className="text-slate max-w-xl mb-10">
        Empat jalur perlindungan yang paling sering dibutuhkan warga dan
        pelaku usaha di Batam: risiko di jalan, risiko pada properti, risiko
        terhadap pihak ketiga, dan jaminan proyek. Pilih kategori sesuai
        kebutuhan Anda di bawah ini.
      </p>

      {Array.from(grouped.entries()).map(([kategori, items]) => (
        <section key={kategori} className="ledger-rule pt-6 mb-10">
          <h2 className="text-xl mb-2">{kategori}</h2>
          {KATEGORI_INTRO[kategori] && (
            <p className="text-slate max-w-xl mb-6">
              {KATEGORI_INTRO[kategori]}
            </p>
          )}
          <ul className="space-y-5">
            {items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/layanan/${item.slug}`}
                  className="font-display text-lg hover:text-rust"
                >
                  {item.judul}
                </Link>
                <p className="text-slate text-sm">{item.ringkasan}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
