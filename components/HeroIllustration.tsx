import fs from "fs";
import path from "path";

const KEY_BY_IKON: Record<string, string> = {
  car: "mobil",
  shield: "liability",
  building: "properti",
  seal: "surety",
};

const CUSTOM_DIR = path.join(process.cwd(), "public", "images", "custom");
const CUSTOM_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

/**
 * Looks for a user-uploaded image at public/images/custom/{key}.{ext}.
 * Returns the public URL if found, otherwise null. Runs at request/build
 * time on the server, so dropping a new file in that folder takes effect
 * on the next deploy without touching any code.
 */
function findCustomImage(key: string): string | null {
  for (const ext of CUSTOM_EXTENSIONS) {
    const filePath = path.join(CUSTOM_DIR, `${key}.${ext}`);
    if (fs.existsSync(filePath)) {
      return `/images/custom/${key}.${ext}`;
    }
  }
  return null;
}

interface HeroIllustrationProps {
  /** Matches a LayananContent.ikon value. Falls back to the harbor/home
   * illustration if the icon has no dedicated hero art yet. */
  ikon?: string;
  className?: string;
}

export default function HeroIllustration({
  ikon,
  className,
}: HeroIllustrationProps) {
  const key = (ikon && KEY_BY_IKON[ikon]) || "home";
  const custom = findCustomImage(key);
  const src = custom ?? `/images/hero-${key}.svg`;

  return (
    <div
      className={
        className ??
        "w-full aspect-[5/2] overflow-hidden mb-8 bg-sand"
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- src can be
          either a static local SVG placeholder or a user-uploaded photo;
          next/image blocks SVG by default and adds no real benefit here. */}
      <img
        src={src}
        alt=""
        width={800}
        height={320}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
