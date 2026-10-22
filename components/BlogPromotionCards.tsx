"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { teasersForPage, type BlogTeaser } from "@/lib/blog-promotion";
import { safeContentUrl } from "@/lib/visual-content";

export function BlogPromotionCards({ posts }: { posts: BlogTeaser[] }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const articles = teasersForPage(posts, pathname);
  return <aside className="blog-promotion" aria-labelledby="blog-promotion-title"><div className="section-shell">
    <div className="blog-promotion-heading"><div><span className="label">El blog de J R Consulting</span><h2 id="blog-promotion-title">Ideas para tu siguiente paso.</h2><p>Explora nuestras publicaciones y encuentra perspectivas para tomar decisiones con más claridad.</p></div><Link className="text-link" href="/blog">Ver todas las entradas <ArrowRight size={18} /></Link></div>
    {articles.length > 0 ? <div className="blog-promotion-grid">{articles.map((post) => <Link className="blog-promotion-card" key={post.id} href={`/blog/${post.slug}`}>
      <div className="blog-promotion-cover"><img src={safeContentUrl(post.imageUrl || "", true) || "/brand/jr-consulting.jpg"} alt="" loading="lazy" width={640} height={360} onError={(event) => { const image = event.currentTarget; if (!image.dataset.fallback) { image.dataset.fallback = "true"; image.src = "/brand/jr-consulting.jpg"; } }} /></div>
      <div className="blog-promotion-copy"><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="blog-promotion-read">Leer entrada <ArrowRight size={16} /></span></div>
    </Link>)}</div> : <p className="blog-promotion-empty">Próximamente encontrarás más publicaciones aquí. <Link href="/blog">Visitar el blog</Link></p>}
  </div></aside>;
}
