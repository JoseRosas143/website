import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ArticleContent } from "./ArticleContent";
import { VisualPage } from "./VisualPage";
import { editableTree } from "@/lib/editable-tree";
import { defaultContent, mergeSiteContent } from "@/lib/site-content";
import { renderToStaticMarkup } from "react-dom/server";

afterEach(cleanup);
describe("contenido público", () => {
 it("muestra el Markdown existente como formato y no ejecuta HTML ni enlaces peligrosos", () => {
  const {container}=render(<ArticleContent body={'## Bienvenida\n\n- **Estrategia:** avanzar\n- *Tecnología*\n\n| Tema | Estado |\n| --- | --- |\n| Blog | Listo |\n\n<script>alert(1)</script>\n\n[malicioso](javascript:alert%281%29)'} />);
  expect(screen.getByRole("heading",{name:"Bienvenida",level:2})).toBeInTheDocument();
  expect(screen.getByText("Estrategia:").tagName).toBe("STRONG");
  expect(container.querySelectorAll("li")).toHaveLength(2);
  expect(container.querySelector("table")).toBeInTheDocument();
  expect(container.querySelector("script")).toBeNull();
  expect(container.querySelector('a[href^="javascript"]')).toBeNull();
 });
 it("migra contenido anterior sin perder artículos y normaliza etiquetas", () => {
  const content=mergeSiteContent({...defaultContent,blog:[{id:"old",title:"Guardado",body:"**Hola**",tags:["  IA ","ia","","Crecimiento"]}]});
  expect(content.blog[0].body).toBe("**Hola**");
  expect(content.blog[0].tags).toEqual(["IA","Crecimiento"]);
  expect(content.pages.growthlab).toBeDefined();
 });
 it("aplica edición, orden y visibilidad al HTML público, también al renderizar en servidor", () => {
  const page={...defaultContent.home,visualEdits:{"home.c.0.c.c":"Editado"},sectionOrder:["home.c.1","home.c.0"],hiddenSections:["home.c.2"]};
  const tree=editableTree(<><section><h1>Original</h1></section><section><h2>Segundo</h2></section><section><h2>Oculto</h2></section></>,"home");
  const markup=renderToStaticMarkup(<VisualPage pageKey="home" initialPage={page}>{tree}</VisualPage>);
  expect(markup).toContain("Editado");
  expect(markup).not.toContain("Original");
  expect(markup).not.toContain("Oculto");
  expect(markup.indexOf("Segundo")).toBeLessThan(markup.indexOf("Editado"));
 });
});