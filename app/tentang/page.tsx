import { buildPersonSchema } from "@/lib/schema";

export const metadata = { title: "Tentang" };

export default function TentangPage() {
  // TODO: ganti dengan identitas asli teman kamu — nama, jabatan, dan
  // sameAs mengarah ke LinkedIn/akun sosial miliknya sendiri, bukan milik
  // pemilik situs lain.
  const personSchema = buildPersonSchema({
    name: "Nama Teman Kamu",
    jobTitle: "Praktisi Asuransi",
    linkedinUrl: "https://linkedin.com/in/ganti-dengan-profil-asli",
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
        diverifikasi milik teman kamu — bukan disalin dari byline situs lain.
      </p>
    </div>
  );
}
