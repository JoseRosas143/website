import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Raw HTML is intentionally disabled; React escapes text and Markdown filters URLs. */
export function ArticleContent({ body }: { body: string }) {
  return <div className="article-body markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>{body}</ReactMarkdown></div>;
}
