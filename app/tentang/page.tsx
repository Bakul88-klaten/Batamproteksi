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
  // asli Nur dikirim (buildPersonSchema hanya menyertakan sameAs jika
  // linkedinUrl diisi, jadi aman untuk dikosongkan sementara).
  const personSchema = buildPersonSchema({
    name: "Nur",
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
        EEAT copy TODO — isi tiap bagian di bawah dengan data Nur yang
        benar-benar bisa diverifikasi, bukan disalin dari byline situs
        lain atau dikarang untuk mengisi ruang:

        1. Pengalaman: sejak kapan aktif di industri asuransi, jenis
           polis yang paling sering ditangani, dan pengalaman spesifik
           di pasar Batam (mis. sektor apa yang paling sering diajak
           bicara — logistik, ritel, kendaraan pribadi).
        2. Kredensial: lisensi/sertifikasi resmi (AAJI atau setara) jika
           ada, berikut nomor yang bisa diverifikasi publik. Jangan
           dicantumkan jika belum ada — lebih baik kosong daripada
           salah.
        3. Metode kerja: bagaimana proses konsultasi berjalan — misalnya
           berapa lama biasanya sampai rekomendasi diberikan, apakah
           mendampingi sampai proses klaim selesai.
        4. Foto profil asli (bukan stok) untuk memperkuat sinyal "real
           person" — tambahkan ke buildPersonSchema via imageUrl.
      */}
      <section className="ledger-rule pt-6 mb-8 max-w-xl">
        <h2 className="text-xl mb-3">Pengalaman</h2>
        <p className="text-slate">
          [Isi dengan pengalaman asli Nur di industri asuransi — sejak kapan,
          jenis polis yang paling sering ditangani, dan konteks pasar Batam
          secara spesifik.]
        </p>
      </section>

      <section className="ledger-rule pt-6 mb-8 max-w-xl">
        <h2 className="text-xl mb-3">Kredensial</h2>
        <p className="text-slate">
          [Isi dengan lisensi/sertifikasi resmi yang benar-benar dimiliki dan
          bisa diverifikasi. Kosongkan bagian ini jika belum ada — jangan
          diisi dengan nomor yang tidak bisa dibuktikan.]
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
