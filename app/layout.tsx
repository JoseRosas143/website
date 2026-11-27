export const dynamic = "force-dynamic";
import { BlogPromotion } from "@/components/BlogPromotion";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./public-theme.css";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { AiConcierge } from "@/components/AiConcierge";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "J R Consulting | Estrategia, tecnología y crecimiento", template: "%s | J R Consulting" },
  description: "Consultoría estratégica, tecnología, inteligencia artificial, websites, capacitación e investigación aplicada para emprendedores, profesionales y pequeñas empresas.",
  applicationName: "J R Consulting",
  authors: [{ name: "J R Consulting" }],
  creator: "J R Consulting",
  category: "Consultoría empresarial",
  icons: { icon: [{ url: "/icon.png", type: "image/png" }], shortcut: "/icon.png", apple: "/brand/jr-consulting.png" },
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d0b14", colorScheme: "dark light" };

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "J R Consulting",
  url: siteUrl,
  telephone: "+52 221 375 9147",
  areaServed: { "@type": "Country", name: "México" },
  address: { "@type": "PostalAddress", addressLocality: "Puebla", addressCountry: "MX" },
  description: "Firma de crecimiento empresarial que implementa estrategia, tecnología, inteligencia artificial, educación y soluciones digitales.",
  sameAs: []
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <Nav />
        <div id="contenido">{children}</div>
        <BlogPromotion />
        <Footer />
        <AiConcierge />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
