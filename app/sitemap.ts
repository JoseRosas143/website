import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/soluciones", "/websites", "/aprende", "/research", "/ramx", "/seguros", "/contacto", "/cotizar", "/aviso-de-privacidad", "/terminos"];
  return routes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : 0.8 }));
}
