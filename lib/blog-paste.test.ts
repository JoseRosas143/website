import { describe, expect, it, vi } from "vitest";
import { htmlToBlogMarkdown, uploadBlogImage } from "./blog-paste";
import { normalizeMathDelimiters } from "./blog-math";

describe("pegado del blog", () => {
  it("conserva encabezados, listas, enlaces, negritas y tablas sin encabezado HTML", async () => {
    const {markdown} = await htmlToBlogMarkdown('<h2>Comparación</h2><p><b>Importante</b> <a href="https://example.com">Fuente</a></p><ul><li>Uno</li></ul><table><tr><td>Plan</td><td>Precio</td></tr><tr><td>A | B</td><td><strong>100</strong></td></tr></table>');
    expect(markdown).toContain('## Comparación'); expect(markdown).toContain('**Importante**');
    expect(markdown).toContain('| Plan | Precio |'); expect(markdown).toContain('| --- | --- |');
    expect(markdown).toContain('A \\| B'); expect(markdown).toContain('**100**');
  });
  it("extrae una sola fórmula de KaTeX y elimina contenido activo", async () => {
    const {markdown} = await htmlToBlogMarkdown('<div class="katex-display"><span class="katex"><math><annotation encoding="application/x-tex">\\frac{a}{b}</annotation></math><span>duplicado</span></span></div><script>alert(1)</script><a href="javascript:alert(1)">Texto</a><img src="https://example.com/foto.png" onerror="alert(1)" alt="Foto">');
    expect(markdown).toContain('$$\n\\frac{a}{b}\n$$');
    expect(markdown).not.toMatch(/duplicado|script|javascript|onerror/);
    expect(markdown).toContain('![Foto](<https://example.com/foto.png>)');
  });
  it("sube imágenes incrustadas y avisa de imágenes temporales sin perder texto", async () => {
    const upload = vi.fn().mockResolvedValue('/uploads/test.png');
    const {markdown,warnings} = await htmlToBlogMarkdown('<p>Antes</p><img src="data:image/png;base64,aGVsbG8=" alt="Ejemplo"><img src="blob:temporal"><p>Después</p>',upload);
    expect(upload).toHaveBeenCalledOnce(); expect(markdown).toContain('/uploads/test.png');
    expect(markdown).toContain('Después'); expect(warnings).toHaveLength(1);
  });
  it("conserva código y acepta delimitadores LaTeX copiados", () => {
    expect(normalizeMathDelimiters('\\(x^2\\) y \\[x+1\\]')).toContain('$x^2$');
    expect(normalizeMathDelimiters('`\\(x\\)`')).toBe('`\\(x\\)`');
  });
  it("rechaza imágenes demasiado grandes antes de enviarlas", async () => {
    const file = new File([new Uint8Array(4 * 1024 * 1024 + 1)],'big.png',{type:'image/png'});
    await expect(uploadBlogImage(file)).rejects.toThrow('4 MB');
  });
});
