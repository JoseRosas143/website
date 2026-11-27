import Image from "next/image";

/** Decorative illustration; CMS identifiers stay in the page template. */
export function BusinessSystemVisual() {
  return <div className="system-visual system-visual--violet" aria-hidden="true">
    <Image src="/brand/consulting-hero.webp" alt="" width={1440} height={1080}
      sizes="(max-width: 900px) 100vw, 55vw" priority />
  </div>;
}
