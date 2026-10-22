import Image from "next/image";
import Link from "next/link";

export function Mark({ inverted = false }: { inverted?: boolean }) {
  return <Image className={`brand-logo-image${inverted ? " brand-logo-image--on-dark" : ""}`} src="/brand/jr-consulting.jpg" alt="J R Consulting — Asesoría profesional" width={1280} height={1280} sizes="(max-width: 640px) 64px, 96px" />;
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return <Link className={`brand-lockup${inverted ? " brand-lockup--inverted" : ""}`} href="/" aria-label="J R Consulting — inicio"><Mark inverted={inverted} /></Link>;
}
