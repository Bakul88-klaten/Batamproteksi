import { buildPersonSchema } from "@/lib/schema";

export const metadata = { title: "Tentang" };

export default function TentangPage() {
  // LinkedIn belum tersedia — sameAs baru ditambahkan setelah URL profil
  // asli Nur dikirim (buildPersonSchema hanya menyertakan sameAs jika
  // linkedinUrl diisi, jadi aman untuk dikosongkan sementara).
  const personSchema = buildPersonSchema({
    name: "Nur",
    jobTitle: "Praktisi Asuransi",
  });

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <h1 className="text-3xl mb-4">Tentang BatamProteksi</h1>
      <p className="text-slate max-w-xl">
        Tulis di sini pengalaman dan kredensial yang benar-benar bisa
        diverifikasi milik Nur — bukan disalin dari byline situs lain.
      </p>
    </div>
  );
}
