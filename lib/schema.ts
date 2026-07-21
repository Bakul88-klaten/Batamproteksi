import type { LayananContent } from "./content";
import { SITE_URL } from "./site";

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

// NOTE: `address` and `telephone` below are intentionally left out until
// real, verifiable NAP (Name/Address/Phone) data is provided — see the
// TODO in app/kontak/page.tsx. Do not fill this in with a placeholder
// address; an unverifiable LocalBusiness address is worse for trust
// (and for Google Business Profile matching) than omitting it.
export function buildLocalBusinessSchema(opts?: {
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
  };
  telephone?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: BRAND_NAME,
    url: SITE_URL,
    areaServed: {
      "@type": "City",
      name: "Batam",
    },
    ...(opts?.address
      ? {
          address: {
            "@type": "PostalAddress",
            ...opts.address,
            addressCountry: "ID",
          },
        }
      : {}),
    ...(opts?.telephone ? { telephone: opts.telephone } : {}),
  };
}

export function buildCollectionPageSchema(opts: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: opts.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}
