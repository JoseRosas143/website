import { describe, expect, it } from "vitest";
import { mergeSiteContent, defaultContent } from "./site-content";
import { serviceCopy } from "./service-copy";
import { pageMetadata, siteUrl } from "./seo";

describe("contenido comercial y SEO", () => {
  it("actualiza los títulos antiguos guardados sin sustituir contenido personalizado", () => {
    const content = mergeSiteContent({
      research: { ...defaultContent.research, title: "Protocolos claros, viables y defendibles.", description: "Descripción escrita por el usuario", visualEdits: { "research.c.0.c.0.c.0.c.0.c": "Título visual personalizado" } },
      pages: { seguros: { ...defaultContent.pages.seguros, title: "Protección cercana para lo que más importa." } }
    });
    expect(content.research.title).toBe(serviceCopy.research.title);
    expect(content.research.description).toBe("Descripción escrita por el usuario");
    expect(content.research.visualEdits?.["research.c.0.c.0.c.0.c.0.c"]).toBe("Título visual personalizado");
    expect(content.pages.seguros.title).toBe(serviceCopy.seguros.title);
  });
  it("no reemplaza títulos personalizados ni modifica el artículo publicado", () => {
    const blog = [{ id: "uno", title: "Mi artículo", body: "Contenido", tags: ["Investigación"] }];
    const content = mergeSiteContent({ research: { ...defaultContent.research, title: "Mi título" }, blog });
    expect(content.research.title).toBe("Mi título"); expect(content.blog[0].body).toBe("Contenido");
  });
  it("genera canónicas y enlaces sociales coherentes", () => {
    const metadata = pageMetadata("Seguros de auto en Puebla", "Cotización y asesoría", "/seguros");
    expect(metadata.alternates?.canonical).toBe(`${siteUrl}/seguros`);
    expect(metadata.openGraph).toMatchObject({url:`${siteUrl}/seguros`});
    expect(siteUrl.endsWith('/')).toBe(false);
  });
});
