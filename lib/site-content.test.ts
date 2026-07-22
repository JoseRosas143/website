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
});
