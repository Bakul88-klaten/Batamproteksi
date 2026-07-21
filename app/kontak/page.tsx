import { buildBreadcrumbSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";

const SITE_URL = "https://batamproteksi.biz.id";

export const metadata = {
  title: "Kontak",
  description:
    "Hubungi BatamProteksi untuk konsultasi asuransi kendaraan dan liability di Batam.",
};

export default function KontakPage() {
  const breadcrumb = [
    { name: "Beranda", href: "/" },
    { name: "Kontak", href: "/kontak" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(
    breadcrumb.map((b) => ({ name: b.name, url: `${SITE_URL}${b.href}` }))
  );

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb items={breadcrumb} />

      <p className="manifest-index mb-2">KONTAK</p>
      <h1 className="text-3xl mb-4">Kontak</h1>
      <p className="text-slate mb-6 max-w-lg">
        Hubungi kami langsung melalui WhatsApp untuk konsultasi seputar
        asuransi kendaraan atau liability di Batam.
      </p>
      <a
        href="https://wa.me/6281270826212"
        className="inline-block bg-rust text-sand px-6 py-3"
      >
        Chat WhatsApp
      </a>

      {/*
        NAP TODO — tambahkan alamat kantor/domisili usaha yang sama persis
        dengan yang terdaftar di Google Business Profile (bila ada), lalu:
        1. Render sebagai teks biasa di bawah ini.
        2. Teruskan ke buildLocalBusinessSchema({ address, telephone })
           di app/layout.tsx supaya schema situs konsisten dengan NAP.
        Jangan isi dengan alamat perkiraan — NAP yang tidak konsisten
        justru merusak sinyal LocalBusiness, bukan menguatkannya.
      */}
    </div>
  );
}
