import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLayanan, getAllLayananSlugs, getLayananTerkait } from "@/lib/content";
import {
  buildServiceSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
} from "@/lib/schema";
import LayananDetailLayout from "@/components/LayananDetailLayout";

const SITE_URL = "https://batamproteksi.biz.id";

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
    openGraph: {
      title: item.judul,
      description: item.ringkasan,
      url: `${SITE_URL}/layanan/${item.slug}`,
      images: [`${SITE_URL}/og/${item.slug}.png`],
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
  // FAQPage + BreadcrumbList; a different page type could choose a
  // different set. Nothing is auto-injected by the layout itself.
  const jsonLd: Record<string, unknown>[] = [
    buildServiceSchema(item),
    buildLocalBusinessSchema(),
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
