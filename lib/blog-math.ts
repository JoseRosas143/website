/** Convert common copied TeX delimiters, while preserving code examples. */
export function normalizeMathDelimiters(body: string) {
  return body.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)/g).map((part, i) => i % 2 ? part : part
    .replace(/\\\[([\s\S]*?)\\\]/g, (_match, tex) => `\n\n$$\n${tex.trim()}\n$$\n\n`)
    .replace(/\\\(([^\n]*?)\\\)/g, (_match, tex) => `$${tex}$`)).join("");
}
