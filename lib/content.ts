import fs from "fs";
import path from "path";

const LAYANAN_DIR = path.join(process.cwd(), "content", "layanan");

export interface LayananFAQ {
  pertanyaan: string;
  jawaban: string;
}

export interface LayananContent {
  slug: string;
  judul: string;
  ringkasan: string;
  kategori: string;
  ikon: string;
  estimasiPremi: {
    minimum: number;
    maksimum: number;
    satuan: string;
    catatan: string;
  };
  poinUtama: string[];
  faq: LayananFAQ[];
  updatedAt: string;
}

/**
 * Reads a single layanan (product) file from content/layanan/{slug}.json.
 * Each product lives in its own file — there is no single shared
 * translations/content object that every page pulls from.
 */
export function getLayanan(slug: string): LayananContent | null {
  const filePath = path.join(LAYANAN_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as LayananContent;
}

export function getAllLayananSlugs(): string[] {
  if (!fs.existsSync(LAYANAN_DIR)) return [];
  return fs
    .readdirSync(LAYANAN_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function getAllLayanan(): LayananContent[] {
  return getAllLayananSlugs()
    .map((slug) => getLayanan(slug))
    .filter((item): item is LayananContent => item !== null);
}
