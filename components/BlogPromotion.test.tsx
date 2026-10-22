import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { publishedTeasers } from "@/lib/blog-promotion";
import { BlogPromotionCards } from "./BlogPromotionCards";
import type { BlogPost } from "@/lib/site-content";
let pathname = "/seguros";
vi.mock("next/navigation",()=>({usePathname:()=>pathname}));
afterEach(()=>{cleanup();pathname="/seguros";});
const post = (id:string, published=true):BlogPost=>({id,slug:id,title:`Entrada ${id}`,body:"contenido privado innecesario",excerpt:"Resumen",category:"Ideas",published,publishedAt:`2026-10-${id === 'uno' ? '01' : '02'}`});
describe("promoción del blog",()=>{
 it("envía solo entradas publicadas sin cuerpos y en orden reciente",()=>{
  const result=publishedTeasers([post('uno'),post('dos'),post('borrador',false)]);
  expect(result.map(p=>p.slug)).toEqual(['dos','uno']);
  expect(result[0]).not.toHaveProperty('body');
 });
 it("excluye el artículo actual y muestra miniatura cuando no hay portada",()=>{
  pathname='/blog/uno'; render(<BlogPromotionCards posts={publishedTeasers([post('uno'),post('dos')])}/>);
  expect(screen.queryByText('Entrada uno')).toBeNull();
  expect(screen.getByRole('link',{name:/Entrada dos/})).toHaveAttribute('href','/blog/dos');
  expect(document.querySelector('img')).toHaveAttribute('src','/brand/jr-consulting.jpg');
 });
 it("no muestra promoción en administración",()=>{
  pathname='/admin'; const {container}=render(<BlogPromotionCards posts={publishedTeasers([post('uno')])}/>);
  expect(container).toBeEmptyDOMElement();
 });
 it("muestra un enlace al blog si no hay entradas publicadas",()=>{
  render(<BlogPromotionCards posts={[]}/>); expect(screen.getByRole('link',{name:'Visitar el blog'})).toHaveAttribute('href','/blog');
 });
});
