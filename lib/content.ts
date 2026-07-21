import fs from "fs";
import path from "path";

const LAYANAN_DIR = path.join(process.cwd(), "content", "layanan");

export interface LayananFAQ {
  pertanyaan: string;
  jawaban: string;
}

export interface CakupanDetail {
  judul: string;
  penjelasan: string;
}

export interface LangkahKlaim {
  langkah: string;
  penjelasan: string;
}

export interface StudiKasus {
  judul: string;
  skenario: string;
  penjelasan: string;
}

export interface PerbandinganBaris {
  label: string;
  nilai: string[];
}

export interface Perbandingan {
  judul: string;
  kolom: string[];
  baris: PerbandinganBaris[];
}

export interface KonteksLokal {
  narasi: string;
  area: string[];
  risiko: string[];
}

export interface Reviewer {
  nama: string;
  jabatan: string;
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
  konteksLokal: KonteksLokal;
  cakupanDetail: CakupanDetail[];
  prosesKlaim: LangkahKlaim[];
  perbandingan?: Perbandingan;
  studiKasus: StudiKasus[];
  faq: LayananFAQ[];
  layananTerkait: string[];
  direview: Reviewer;
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

/**
 * Resolves an item's `layananTerkait` slugs into full content objects, for
 * rendering silo cross-links between service pages. Silently skips slugs
 * that don't resolve (e.g. a related page not yet published).
 */
export function getLayananTerkait(item: LayananContent): LayananContent[] {
  return item.layananTerkait
    .map((slug) => getLayanan(slug))
    .filter((related): related is LayananContent => related !== null);
}

/** Groups all layanan by kategori, for the /layanan silo hub page. */
export function getLayananByKategori(): Map<string, LayananContent[]> {
  const groups = new Map<string, LayananContent[]>();
  for (const item of getAllLayanan()) {
    const list = groups.get(item.kategori) ?? [];
    list.push(item);
    groups.set(item.kategori, list);
  }
  return groups;
}
