import type { LayananContent } from "./content";

const SITE_URL = "https://batamproteksi.biz.id";
const BRAND_NAME = "BatamProteksi";

// NOTE: Person/Organization identity below must be filled in with the
// friend's own real, verifiable details (name, LinkedIn, license/AAJI
// number if any). Do not reuse identity data from any other site.
export function buildPersonSchema(person: {
  name: string;
  jobTitle: string;
  linkedinUrl?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
    ...(person.imageUrl ? { image: person.imageUrl } : {}),
    ...(person.linkedinUrl ? { sameAs: [person.linkedinUrl] } : {}),
  };
}

export function buildServiceSchema(item: LayananContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: item.judul,
    description: item.ringkasan,
    provider: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "Batam",
    },
    url: `${SITE_URL}/layanan/${item.slug}`,
  };
}

export function buildFaqSchema(item: LayananContent) {
  if (!item.faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: item.faq.map((f) => ({
      "@type": "Question",
      name: f.pertanyaan,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.jawaban,
      },
    })),
  };
}

export function buildBreadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}
