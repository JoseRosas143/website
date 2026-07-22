import Link from "next/link";

export function Mark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`brand-mark${inverted ? " brand-mark--inverted" : ""}`} aria-hidden="true">
      <span>J</span><span>R</span>
    </span>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link className={`brand-lockup${inverted ? " brand-lockup--inverted" : ""}`} href="/" aria-label="J R Consulting — inicio">
      <Mark inverted={inverted} />
      <span className="brand-name"><strong>J R</strong><small>Consulting</small></span>
    </Link>
  );
}
