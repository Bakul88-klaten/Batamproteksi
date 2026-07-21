import { buildPersonSchema, buildBreadcrumbSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";

const SITE_URL = "https://batamproteksi.biz.id";

export const metadata = {
  title: "Tentang",
  description:
    "Tentang BatamProteksi dan praktisi di baliknya — pengalaman, area keahlian, dan cara kami mendampingi klaim asuransi di Batam.",
};

export default function TentangPage() {
  const breadcrumb = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/tentang" },
  ];

  // LinkedIn belum tersedia — sameAs baru ditambahkan setelah URL profil
  // asli Sutono dikirim (buildPersonSchema hanya menyertakan sameAs jika
  // linkedinUrl diisi, jadi aman untuk dikosongkan sementara).
  const personSchema = buildPersonSchema({
    name: "Sutono",
    jobTitle: "Praktisi Asuransi",
  });
  const breadcrumbSchema = buildBreadcrumbSchema(
    breadcrumb.map((b) => ({ name: b.name, url: `${SITE_URL}${b.href}` }))
  );

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb items={breadcrumb} />

      <p className="manifest-index mb-2">TENTANG</p>
      <h1 className="text-3xl mb-4">Tentang BatamProteksi</h1>

      {/*
        Foto profil asli (bukan stok) belum tersedia — tambahkan ke
        buildPersonSchema via imageUrl bila Sutono mengirimkan file foto.
      */}
      <section className="ledger-rule pt-6 mb-8 max-w-xl">
        <h2 className="text-xl mb-3">Pengalaman</h2>
        <p className="text-slate">
          Sutono memiliki 7 tahun pengalaman di industri asuransi kerugian,
          mendampingi klien di Batam dalam pemilihan dan pengurusan polis
          kendaraan maupun liability.
        </p>
      </section>

      <section className="ledger-rule pt-6 mb-8 max-w-xl">
        <h2 className="text-xl mb-3">Kredensial</h2>
        <p className="text-slate">
          Terdaftar sebagai Agen Asuransi Bersertifikat AAUI dengan nomor
          peserta 29.091210.00.00.005972.2901.
        </p>
      </section>

      <section className="ledger-rule pt-6 mb-8 max-w-xl">
        <h2 className="text-xl mb-3">Cara Kami Bekerja</h2>
        <p className="text-slate">
          [Isi dengan alur konsultasi yang sebenarnya dijalankan — dari
          kontak pertama, penilaian kebutuhan, rekomendasi polis, sampai
          pendampingan klaim.]
        </p>
      </section>
    </div>
  );
}
