import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jrconsulting.mx";

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "J R Consulting",
      locale: "es_MX",
      type: "website"
    },
    twitter: { card: "summary_large_image", title, description }
  };
}
