const HERO_BY_IKON: Record<string, string> = {
  car: "/images/hero-mobil.svg",
  shield: "/images/hero-liability.svg",
  building: "/images/hero-properti.svg",
  seal: "/images/hero-surety.svg",
};

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
  const src = (ikon && HERO_BY_IKON[ikon]) || "/images/hero-home.svg";
  // eslint-disable-next-line @next/next/no-img-element -- static local SVG,
  // no benefit from next/image's raster optimization pipeline.
  return (
    <img
      src={src}
      alt=""
      width={800}
      height={320}
      className={className ?? "w-full h-auto mb-8"}
    />
  );
}
