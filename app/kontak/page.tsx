import { buildBreadcrumbSchema } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Kontak",
  description:
    "Hubungi BatamProteksi untuk konsultasi asuransi kendaraan dan liability di Batam.",
  alternates: { canonical: "/kontak" },
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
        href="https://wa.me/628981874808"
        className="inline-block bg-rust text-sand px-6 py-3"
      >
        Chat WhatsApp
      </a>

      <p className="text-slate mt-6 max-w-lg">
        Komplek Tanjung Trisakti Blok A No. 8, Sei Panas, Batam
      </p>
    </div>
  );
}
