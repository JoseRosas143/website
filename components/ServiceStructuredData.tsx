import { siteUrl } from "@/lib/seo";

export function ServiceStructuredData({ name, description, path }: { name: string; description: string; path: string }) {
  const url = `${siteUrl}${path}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${url}#service`, name, description, url,
        provider: { "@type": "Organization", name: "J R Consulting", url: siteUrl } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
        { "@type": "ListItem", position: 2, name, item: url }
      ] }
    ]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}
