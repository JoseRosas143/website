/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CmsBlock, PageKey } from "@/lib/site-content";

export function CmsAdditionalBlocks({ blocks, pageKey }: { blocks: CmsBlock[]; pageKey: PageKey }) {
  const additions = blocks.filter((block) => block.enabled && block.id.includes(`-${pageKey}-`));
  if (!additions.length) return null;

  return <>
    {additions.map((block) => (
      <section className={`cms-public-block cms-public-block--${block.type}`} key={block.id}>
        <div className="section-shell">
          <div className="cms-public-copy">
            <h2>{block.title}</h2>
            <p>{block.body}</p>
            {block.ctaLabel && block.ctaHref && <Link className="text-link" href={block.ctaHref}>{block.ctaLabel}<ArrowRight /></Link>}
          </div>
          {block.mediaUrl && <div className="cms-public-media"><img src={block.mediaUrl} alt="" /></div>}
        </div>
      </section>
    ))}
  </>;
}
