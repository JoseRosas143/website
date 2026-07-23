import { describe, expect, it } from "vitest";
import { defaultContent, mergeSiteContent } from "./site-content";

describe("mergeSiteContent", () => {
  it("conserva valores predeterminados cuando el CMS está vacío", () => {
    expect(mergeSiteContent({}).home.title).toBe(defaultContent.home.title);
  });

  it("combina cambios parciales sin eliminar otros campos", () => {
    const content = mergeSiteContent({ home: { title: "Nuevo título" } });
    expect(content.home.title).toBe("Nuevo título");
    expect(content.home.primaryCta).toBe(defaultContent.home.primaryCta);
  });

  it("recupera Google Workspace aunque Supabase tenga una estructura anterior", () => {
    const content = mergeSiteContent({
      pages: {
        soluciones: { title: "Soluciones antiguas" }
      }
    });
    expect(content.pages.workspace.title).toBe("Google Workspace para empresas");
    expect(content.pages.workspace.blocks.length).toBeGreaterThan(0);
  });

  it("descarta bloques dañados sin romper el administrador", () => {
    const content = mergeSiteContent({
      pages: {
        workspace: {
          blocks: [
            { id: "ok", type: "hero", title: "Correcto", body: "Contenido", enabled: true },
            { id: "bad", type: "tipo-inexistente", title: "Dañado" }
          ]
        }
      }
    });
    expect(content.pages.workspace.blocks).toHaveLength(1);
    expect(content.pages.workspace.blocks[0].id).toBe("ok");
  });
});
