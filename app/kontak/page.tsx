export const metadata = { title: "Kontak" };

export default function KontakPage() {
  return (
    <div>
      <h1 className="text-3xl mb-4">Kontak</h1>
      <p className="text-slate mb-6">
        Hubungi kami langsung melalui WhatsApp untuk konsultasi.
      </p>
      <a
        href="https://wa.me/6281270826212"
        className="inline-block bg-rust text-sand px-6 py-3"
      >
        Chat WhatsApp
      </a>
      {/* TODO: tambahkan alamat kantor/domisili usaha di sini jika ada,
          untuk melengkapi NAP (Name, Address, Phone) yang konsisten. */}
    </div>
  );
}
