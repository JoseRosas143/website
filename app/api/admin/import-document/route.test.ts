import JSZip from "jszip";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/admin-auth", () => ({ isAdmin: vi.fn(async () => true) }));

describe("POST /api/admin/import-document", () => {
  beforeEach(() => vi.resetModules());

  it("extrae texto legible de un DOCX en lugar de devolver bytes ZIP", async () => {
    const zip = new JSZip();
    zip.file("[Content_Types].xml", `<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`);
    zip.folder("_rels")?.file(".rels", `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`);
    zip.folder("word")?.file("document.xml", `<?xml version="1.0"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>Portafolio maestro de servicios</w:t></w:r></w:p></w:body></w:document>`);
    const buffer = await zip.generateAsync({ type: "uint8array" });
    const { extractDocumentText } = await import("./route");
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
    const text = await extractDocumentText({
      name: "servicios.docx",
      arrayBuffer: async () => arrayBuffer,
      text: async () => ""
    });

    expect(text).toBe("Portafolio maestro de servicios");
    expect(text).not.toContain("PK");
    expect(text).not.toContain("word/document.xml");
  });
});
