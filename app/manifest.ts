import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "J R Consulting",
    short_name: "J R Consulting",
    description: "Estrategia, tecnología y conocimiento para crecer con dirección.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0b14",
    theme_color: "#0d0b14",
    lang: "es-MX",
    icons: [{ src: "/brand/jr-consulting.png", sizes: "942x942", type: "image/png", purpose: "any" }]
  };
}
