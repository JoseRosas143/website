import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "J R Consulting",
    short_name: "J R Consulting",
    description: "Estrategia, tecnología y conocimiento para crecer con dirección.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "es-MX",
    icons: [{ src: "/brand/jr-consulting.jpg", sizes: "1280x1280", type: "image/jpeg", purpose: "any" }]
  };
}
