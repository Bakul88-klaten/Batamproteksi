import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLayanan, getAllLayananSlugs, getLayananTerkait } from "@/lib/content";
import {
  buildServiceSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";
import LayananDetailLayout from "@/components/LayananDetailLayout";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getAllLayananSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getLayanan(slug);
  if (!item) return {};
  return {
    title: item.judul,
    description: item.ringkasan,
    alternates: { canonical: `/layanan/${item.slug}` },
    openGraph: {
      title: item.judul,
      description: item.ringkasan,
      url: `${SITE_URL}/layanan/${item.slug}`,
      // No OG image yet — see audit notes. Add one to /public/og/ once
      // designed, then reinstate `images: [...]` here.
    },
  };
}

export default async function LayananPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getLayanan(slug);
  if (!item) notFound();

  const breadcrumb = [
    { name: "Beranda", href: "/" },
    { name: "Layanan", href: "/layanan" },
    { name: item.judul, href: `/layanan/${item.slug}` },
  ];

  // Explicit, per-page schema composition — this page chooses Service +
  // FAQPage + BreadcrumbList. LocalBusiness is already emitted site-wide
  // in app/layout.tsx with the real NAP data, so it isn't repeated here.
  const jsonLd: Record<string, unknown>[] = [
    buildServiceSchema(item),
    buildBreadcrumbSchema(
      breadcrumb.map((b) => ({ name: b.name, url: `${SITE_URL}${b.href}` }))
    ),
  ];
  const faqSchema = buildFaqSchema(item);
  if (faqSchema) jsonLd.push(faqSchema);

  const layananTerkait = getLayananTerkait(item);

  return (
    <LayananDetailLayout
      item={item}
      layananTerkait={layananTerkait}
      breadcrumb={breadcrumb}
      jsonLd={jsonLd}
    />
  );
}
