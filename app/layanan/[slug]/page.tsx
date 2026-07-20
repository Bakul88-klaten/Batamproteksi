import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLayanan, getAllLayananSlugs } from "@/lib/content";
import {
  buildServiceSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
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

  // Explicit, per-page schema composition — this page chooses Service +
  // FAQPage + BreadcrumbList; a different page type could choose a
  // different set. Nothing is auto-injected by the layout itself.
  const jsonLd: Record<string, unknown>[] = [
    buildServiceSchema(item),
    buildBreadcrumbSchema([
      { name: "Beranda", url: SITE_URL },
      { name: "Layanan", url: `${SITE_URL}/layanan` },
      { name: item.judul, url: `${SITE_URL}/layanan/${item.slug}` },
    ]),
  ];
  const faqSchema = buildFaqSchema(item);
  if (faqSchema) jsonLd.push(faqSchema);

  return <LayananDetailLayout item={item} jsonLd={jsonLd} />;
}
