"use client";
/* eslint-disable @next/next/no-img-element */
import { ArrowRight } from "lucide-react";
import { CmsBlock, PageKey } from "@/lib/site-content";
import { ArticleContent } from "@/components/ArticleContent";
import { useVisualPage } from "@/components/VisualPage";
import { safeContentUrl } from "@/lib/visual-content";
export function CmsAdditionalBlocks({ blocks, pageKey }: { blocks: CmsBlock[]; pageKey: PageKey }) {
  const context = useVisualPage();
  const additions = (context?.page.blocks || blocks).filter((block) => block.enabled && block.id.includes(`-${pageKey}-`));
  return <>{additions.map((block) => <section className={`cms-public-block cms-public-block--${block.type}`} key={block.id}>
    <div className="section-shell"><div className="cms-public-copy">
      <h2>{block.title}</h2><ArticleContent body={block.body} />
      {block.ctaLabel && safeContentUrl(block.ctaHref || "") && <a className="text-link" href={safeContentUrl(block.ctaHref || "")}>{block.ctaLabel}<ArrowRight /></a>}
    </div>{safeContentUrl(block.mediaUrl || "",true) && <div className="cms-public-media"><img src={safeContentUrl(block.mediaUrl || "",true)} alt={block.title} /></div>}</div>
  </section>)}</>;
}
