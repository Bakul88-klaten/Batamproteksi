import Link from "next/link";
import type { LayananContent } from "@/lib/content";
import Breadcrumb, { type BreadcrumbItem } from "./Breadcrumb";
import HeroIllustration from "./HeroIllustration";

interface LayananDetailLayoutProps {
  item: LayananContent;
  layananTerkait: LayananContent[];
  breadcrumb: BreadcrumbItem[];
  /**
   * JSON-LD blocks to render. Unlike the shared ProductPageLayout on the
   * Batam site (which auto-injects BreadcrumbList + FAQPage for every
   * product), this layout takes schema as an explicit prop: each page
   * decides which schema types apply to it and builds them via
   * lib/schema.ts, then passes the result in. Nothing is injected
   * implicitly.
   */
  jsonLd: Record<string, unknown>[];
  children?: React.ReactNode;
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function LayananDetailLayout({
  item,
  layananTerkait,
  breadcrumb,
  jsonLd,
  children,
}: LayananDetailLayoutProps) {
  return (
    <article>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <HeroIllustration ikon={item.ikon} />

      <Breadcrumb items={breadcrumb} />

      <p className="manifest-index mb-2">{item.kategori.toUpperCase()}</p>
      <h1 className="text-3xl mb-4">{item.judul}</h1>
      <p className="text-slate mb-3 max-w-2xl">{item.ringkasan}</p>
      <p className="font-mono text-xs text-slate mb-8">
        Ditinjau oleh {item.direview.nama}, {item.direview.jabatan} · Terakhir
        diperbarui{" "}
        {new Date(item.updatedAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <section className="ledger-rule pt-6 mb-10">
        <h2 className="text-xl mb-4">Cakupan</h2>
        <ul className="space-y-3">
          {item.poinUtama.map((poin, i) => (
            <li key={i} className="flex gap-4">
              <span className="manifest-index shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{poin}</span>
            </li>
          ))}
        </ul>
      </section>

      {item.cakupanDetail.length > 0 && (
        <section className="ledger-rule pt-6 mb-10">
          <h2 className="text-xl mb-4">Rincian Perlindungan</h2>
          <div className="space-y-6">
            {item.cakupanDetail.map((c, i) => (
              <div key={i}>
                <h3 className="font-display text-lg mb-1">{c.judul}</h3>
                <p className="text-slate max-w-2xl">{c.penjelasan}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="ledger-rule pt-6 mb-10">
        <h2 className="text-xl mb-3">Estimasi Premi</h2>
        <p className="text-2xl font-display">
          {formatRupiah(item.estimasiPremi.minimum)} –{" "}
          {formatRupiah(item.estimasiPremi.maksimum)}{" "}
          <span className="text-sm font-body text-slate">
            / {item.estimasiPremi.satuan}
          </span>
        </p>
        <p className="text-xs text-slate mt-2">{item.estimasiPremi.catatan}</p>
        <p className="text-xs text-slate mt-1">
          Estimasi mengikuti ketentuan tarif OJK yang berlaku dan dapat
          berbeda sesuai hasil penilaian risiko.
        </p>
      </section>

      {item.perbandingan && (
        <section className="ledger-rule pt-6 mb-10">
          <h2 className="text-xl mb-4">{item.perbandingan.judul}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-line text-left">
                  {item.perbandingan.kolom.map((kol, i) => (
                    <th key={i} className="py-2 pr-4 font-body font-medium">
                      {kol}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.perbandingan.baris.map((baris, i) => (
                  <tr key={i} className="border-b border-line align-top">
                    <td className="py-2 pr-4 font-medium">{baris.label}</td>
                    {baris.nilai.map((v, j) => (
                      <td key={j} className="py-2 pr-4 text-slate">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {item.konteksLokal && (
        <section className="ledger-rule pt-6 mb-10">
          <h2 className="text-xl mb-4">Konteks Batam</h2>
          <p className="text-slate max-w-2xl mb-4">
            {item.konteksLokal.narasi}
          </p>
          {item.konteksLokal.risiko.length > 0 && (
            <div className="mb-4">
              <h3 className="font-display text-lg mb-2">
                Risiko yang umum ditemui
              </h3>
              <ul className="list-disc list-inside space-y-1 text-slate">
                {item.konteksLokal.risiko.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
          {item.konteksLokal.area.length > 0 && (
            <div>
              <h3 className="font-display text-lg mb-2">Area layanan</h3>
              <p className="text-slate max-w-2xl">
                {item.konteksLokal.area.join(", ")}
              </p>
            </div>
          )}
        </section>
      )}

      {item.prosesKlaim.length > 0 && (
        <section className="ledger-rule pt-6 mb-10">
          <h2 className="text-xl mb-4">Proses Klaim</h2>
          <ol className="space-y-4">
            {item.prosesKlaim.map((langkah, i) => (
              <li key={i} className="flex gap-4">
                <span className="manifest-index shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium">{langkah.langkah}</p>
                  <p className="text-slate text-sm mt-1 max-w-2xl">
                    {langkah.penjelasan}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {item.studiKasus.length > 0 && (
        <section className="ledger-rule pt-6 mb-10">
          <h2 className="text-xl mb-1">Ilustrasi Kasus</h2>
          <p className="text-xs text-slate mb-4">
            Skenario di bawah bersifat ilustratif untuk menjelaskan cara kerja
            polis, bukan klaim aktual nasabah.
          </p>
          <div className="space-y-6">
            {item.studiKasus.map((s, i) => (
              <div key={i}>
                <h3 className="font-display text-lg mb-1">{s.judul}</h3>
                <p className="text-slate text-sm italic mb-2 max-w-2xl">
                  {s.skenario}
                </p>
                <p className="text-slate max-w-2xl">{s.penjelasan}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {item.faq.length > 0 && (
        <section className="ledger-rule pt-6 mb-10">
          <h2 className="text-xl mb-4">Pertanyaan Umum</h2>
          <dl className="space-y-5">
            {item.faq.map((f, i) => (
              <div key={i}>
                <dt className="font-medium">{f.pertanyaan}</dt>
                <dd className="text-slate mt-1">{f.jawaban}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {children}

      {layananTerkait.length > 0 && (
        <section className="ledger-rule pt-6 mb-10">
          <h2 className="text-xl mb-4">Layanan Terkait</h2>
          <ul className="space-y-2">
            {layananTerkait.map((related) => (
              <li key={related.slug}>
                <Link
                  href={`/layanan/${related.slug}`}
                  className="font-display text-lg hover:text-rust"
                >
                  {related.judul}
                </Link>
                <p className="text-slate text-sm">{related.ringkasan}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="ledger-rule pt-6">
        <a
          href={`https://wa.me/628981874808?text=${encodeURIComponent(
            `Halo, saya ingin bertanya tentang ${item.judul}`
          )}`}
          className="inline-block bg-rust text-sand px-6 py-3 font-body"
        >
          Tanya via WhatsApp
        </a>
      </div>
    </article>
  );
}
