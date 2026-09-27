import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BlogEditor } from "./BlogEditor";
import { ArticleContent } from "./ArticleContent";
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
function Editor() { const [value,setValue]=useState('Inicio '); return <BlogEditor value={value} onChange={setValue}/>; }
describe('editor de contenido enriquecido',()=>{
 it('pega HTML en el cursor y muestra una tabla y fórmula reales en la vista previa',async()=>{
  render(<Editor/>); const input=screen.getByLabelText('Contenido del artículo') as HTMLTextAreaElement;
  input.setSelectionRange(7,7);
  fireEvent.paste(input,{clipboardData:{getData:(type:string)=>type==='text/html'?'<table><tr><th>Plan</th><th>Costo</th></tr><tr><td>A</td><td>100</td></tr></table><span class="katex"><math><annotation encoding="application/x-tex">x^2</annotation></math></span>':'',files:[]}});
  await screen.findByText(/Contenido insertado/);
  expect(input.value).toContain('Inicio ');
  fireEvent.click(screen.getByRole('button',{name:'Vista previa del artículo'}));
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(document.querySelector('.katex')).toBeTruthy();
 });
 it('conserva el texto si falla subir una imagen y desbloquea el editor',async()=>{
  vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:false,json:async()=>({error:'Sin conexión'})}));
  render(<Editor/>); const input=screen.getByLabelText('Contenido del artículo');
  fireEvent.paste(input,{clipboardData:{getData:()=>'',files:[new File(['png'],'foto.png',{type:'image/png'})]}});
  await screen.findByText('Sin conexión');
  expect(input).toHaveValue('Inicio '); expect(input).not.toHaveAttribute('readonly');
 });
 it('inserta una imagen subida en el cuerpo y no altera la portada',async()=>{
  vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,json:async()=>({url:'/uploads/foto.png'})}));
  render(<Editor/>); const input=screen.getByLabelText('Contenido del artículo') as HTMLTextAreaElement;
  input.setSelectionRange(7,7);
  fireEvent.paste(input,{clipboardData:{getData:()=>'',files:[new File(['png'],'foto.png',{type:'image/png'})]}});
  await waitFor(()=>expect(input.value).toContain('![')); expect(input.value).toContain('/uploads/foto.png');
 });
 it('renderiza fórmulas inválidas sin romper el artículo y mantiene desactivadas órdenes HTML de TeX',()=>{
  const {container}=render(<ArticleContent body={'$$\n\\frac{\n$$\n\n$\\href{javascript:alert(1)}{x}$\n\nFinal'}/>);
  expect(screen.getByText('Final')).toBeInTheDocument();
  expect(container.querySelector('a[href^="javascript:"]')).toBeNull();
  expect(container.querySelector('.katex-error')).toBeTruthy();
 });
});
