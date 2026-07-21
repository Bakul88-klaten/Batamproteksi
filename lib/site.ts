// Single source of truth for the site's canonical URL. Every file that
// needs it (metadata, JSON-LD, sitemap, robots) should import from here
// instead of redeclaring its own copy — when the real domain is confirmed,
// this is the only line that needs to change.
export const SITE_URL = "https://batamproteksi.biz.id";
