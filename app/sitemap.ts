import type { MetadataRoute } from "next";
import { getAllLayananSlugs } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/layanan`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tentang`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/kontak`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const layananRoutes: MetadataRoute.Sitemap = getAllLayananSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/layanan/${slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...layananRoutes];
}
