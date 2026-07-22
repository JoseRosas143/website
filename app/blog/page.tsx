import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getSiteContent } from "@/lib/storage";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata("Blog | J R Consulting", "Ideas prácticas de tecnología, negocios, seguros y aprendizaje para avanzar con dirección.", "/blog");
export default async function BlogPage() { const { blog } = await getSiteContent(); const posts = blog.filter((post) => post.published); return <section className="blog-page section-shell"><span className="label">Ideas para avanzar</span><h1>Perspectivas que se pueden convertir en acción.</h1><p className="section-intro">Tecnología, estrategia, seguros, aprendizaje y herramientas para tomar mejores decisiones.</p>{posts.length ? <div className="blog-grid">{posts.map((post) => <article key={post.id}><span>{post.category}</span><h2>{post.title}</h2><p>{post.excerpt}</p><Link className="text-link" href={`/blog/${post.slug}`}>Leer artículo <ArrowRight /></Link></article>)}</div> : <div className="blog-empty"><BookOpen /><h2>Estamos preparando los primeros artículos.</h2><p>Muy pronto encontrarás guías y perspectivas prácticas de J R Consulting.</p></div>}</section> }
