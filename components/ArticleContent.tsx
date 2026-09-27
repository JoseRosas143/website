import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { normalizeMathDelimiters } from "@/lib/blog-math";
import "katex/dist/katex.min.css";

/** Raw HTML is intentionally disabled; React escapes text and Markdown filters URLs. */
export function ArticleContent({ body }: { body: string }) {
  return <div className="article-body markdown-body"><ReactMarkdown
    remarkPlugins={[remarkGfm, remarkMath]}
    rehypePlugins={[[rehypeKatex, { trust: false, maxExpand: 500, maxSize: 20, strict: "ignore" }]]}
    components={{ table: ({ children }) => <div className="blog-table-scroll" role="region" aria-label="Tabla del artículo" tabIndex={0}><table>{children}</table></div> }}
    skipHtml>{normalizeMathDelimiters(body)}</ReactMarkdown></div>;
}
