/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getSiteContent } from "@/lib/storage";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = pageMetadata("Blog | J R Consulting", "Ideas prácticas de tecnología, negocios, seguros y aprendizaje para avanzar con dirección.", "/blog");
export default async function BlogPage({ searchParams }: { searchParams: Promise<{ etiqueta?: string }> }) {
  const { etiqueta = "" } = await searchParams;
  const { blog } = await getSiteContent();
  const published = blog.filter((post) => post.published);
  const tags = [...new Map(published.flatMap((post) => post.tags || []).map((tag) => [tag.toLocaleLowerCase("es"), tag])).values()];
  const posts = etiqueta ? published.filter((post) => post.tags?.some((tag) => tag.toLocaleLowerCase("es") === etiqueta.toLocaleLowerCase("es"))) : published;
  return <section className="blog-page section-shell">
    <span className="label">Ideas para avanzar</span><h1>Perspectivas que se pueden convertir en acción.</h1>
    <p className="section-intro">Tecnología, estrategia, seguros, aprendizaje y herramientas para tomar mejores decisiones.</p>
    {tags.length > 0 && <nav className="blog-tags" aria-label="Filtrar por etiqueta"><Link href="/blog" aria-current={!etiqueta ? "page" : undefined}>Todos</Link>{tags.map((tag) => <Link key={tag} href={`/blog?etiqueta=${encodeURIComponent(tag)}`} aria-current={tag.toLocaleLowerCase("es") === etiqueta.toLocaleLowerCase("es") ? "page" : undefined}>{tag}</Link>)}</nav>}
    {posts.length ? <div className="blog-grid">{posts.map((post) => <article key={post.id}>
      {post.imageUrl && <div className="blog-cover"><img src={post.imageUrl} alt={post.title} /></div>}
      <span>{post.category}</span><h2>{post.title}</h2><p>{post.excerpt}</p>
      <div className="blog-tags">{post.tags?.map((tag) => <Link key={tag} href={`/blog?etiqueta=${encodeURIComponent(tag)}`}>{tag}</Link>)}</div>
      <Link className="text-link" href={`/blog/${post.slug}`}>Leer artículo <ArrowRight /></Link>
    </article>)}</div> : <div className="blog-empty"><BookOpen /><h2>{etiqueta ? "No hay artículos con esta etiqueta." : "Estamos preparando los primeros artículos."}</h2>{etiqueta && <Link href="/blog">Ver todos los artículos</Link>}</div>}
  </section>;
}
