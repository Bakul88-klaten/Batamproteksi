import type { LayananContent } from "@/lib/content";

interface LayananDetailLayoutProps {
  item: LayananContent;
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

      <p className="manifest-index mb-2">{item.kategori.toUpperCase()}</p>
      <h1 className="text-3xl mb-4">{item.judul}</h1>
      <p className="text-slate mb-8">{item.ringkasan}</p>

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

      <div className="ledger-rule pt-6">
        <a
          href={`https://wa.me/62xxxxxxxxxx?text=${encodeURIComponent(
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
