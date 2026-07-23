import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { getSiteContent } from "@/lib/storage";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/soluciones", "/google-workspace", "/websites", "/aprende", "/research", "/ramx", "/seguros", "/nosotros", "/blog", "/contacto", "/cotizar", "/aviso-de-privacidad", "/terminos"];
  const base = routes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.8 }));
  const content = await getSiteContent();
  return [...base, ...content.blog.filter((post) => post.published).map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: new Date(post.publishedAt), changeFrequency: "monthly" as const, priority: 0.7 }))];
}
