/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSiteContent } from "@/lib/storage";
export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const post = (await getSiteContent()).blog.find((entry) => entry.slug === slug && entry.published); if (!post) notFound(); return <article className="article-page section-shell"><Link className="text-link" href="/blog"><ArrowLeft />Volver al blog</Link><span>{post.category}</span><h1>{post.title}</h1><p className="article-excerpt">{post.excerpt}</p>{post.imageUrl && <div className="article-cover"><img src={post.imageUrl} alt="" /></div>}<div className="article-body">{post.body.split("\n").filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article> }
