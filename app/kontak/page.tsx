export const metadata = { title: "Kontak" };

export default function KontakPage() {
  return (
    <div>
      <h1 className="text-3xl mb-4">Kontak</h1>
      <p className="text-slate mb-6">
        {/* TODO: isi dengan nama, nomor WhatsApp, dan alamat kantor teman
            kamu sendiri — jangan reuse data kontak dari situs lain. */}
        Hubungi kami langsung melalui WhatsApp untuk konsultasi.
      </p>
      <a
        href="https://wa.me/62xxxxxxxxxx"
        className="inline-block bg-rust text-sand px-6 py-3"
      >
        Chat WhatsApp
      </a>
    </div>
  );
}
