import Link from "next/link";
import { getAllLayanan } from "@/lib/content";

export default function HomePage() {
  const layananList = getAllLayanan();

  return (
    <div>
      <p className="manifest-index mb-2">BATAM · ASURANSI TERDAFTAR</p>
      <h1 className="text-4xl mb-4 max-w-xl">
        Perlindungan yang jelas, untuk risiko yang nyata di Batam.
      </h1>
      <p className="text-slate max-w-lg mb-10">
        Konsultasi asuransi kendaraan, properti, dan surety bond — dijelaskan
        dalam bahasa yang mudah dimengerti, bukan bahasa polis.
      </p>

      <section className="ledger-rule pt-6">
        <h2 className="text-xl mb-4">Layanan</h2>
        <ul className="space-y-4">
          {layananList.map((item) => (
            <li key={item.slug}>
              <Link href={`/layanan/${item.slug}`} className="font-display text-lg">
                {item.judul}
              </Link>
              <p className="text-slate text-sm">{item.ringkasan}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
