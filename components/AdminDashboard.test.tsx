import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AdminDashboard } from "@/components/AdminDashboard";
import { defaultContent } from "@/lib/site-content";
vi.mock("next/navigation", () => ({ usePathname: () => "/admin" }));
describe("AdminDashboard", () => {
 afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
 it("incluye Growth Lab y conserva agregar / deshacer / rehacer", () => {
  render(<AdminDashboard initialContent={defaultContent} initialLeads={[]} />);
  fireEvent.click(screen.getByRole("button",{name:"Páginas"}));
  fireEvent.change(screen.getByRole("combobox",{name:"Página actual"}),{target:{value:"growthlab"}});
  expect(screen.getByTitle("Vista editable de la página")).toHaveAttribute("src","/growth-lab?__cms=1");
  fireEvent.click(screen.getByRole("button",{name:"Agregar sección"}));
  expect(screen.getByLabelText("Título")).toHaveValue("Nueva sección");
  fireEvent.click(screen.getByRole("button",{name:"Deshacer"}));
  expect(screen.queryByLabelText("Título")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Rehacer"}));
  expect(screen.getByLabelText("Título")).toHaveValue("Nueva sección");
 });
 it("guarda los últimos cambios del blog, etiquetas y formato sin borrar páginas", async () => {
  const request=vi.fn().mockResolvedValue({ok:true,json:async()=>({ok:true,storage:"supabase"})});
  vi.stubGlobal("fetch",request);
  const content={...defaultContent,blog:[{id:"post",title:"Bienvenida",slug:"bienvenida",body:"**Hola**",excerpt:"Resumen",category:"Empresa",published:false,publishedAt:"2026-09-25",tags:[]}]};
  render(<AdminDashboard initialContent={content} initialLeads={[]} />);
  fireEvent.click(screen.getByRole("button",{name:/^Blog/}));
  fireEvent.change(screen.getByLabelText("Etiquetas (separadas por comas)"),{target:{value:"Estrategia, Tecnología"}});
  fireEvent.click(screen.getByRole("button",{name:"Vista previa del artículo"}));
  expect(screen.getByText("Hola").tagName).toBe("STRONG");
  fireEvent.click(screen.getByRole("button",{name:"Publicar cambios"}));
  await waitFor(()=>expect(request).toHaveBeenCalled());
  const payload=JSON.parse(request.mock.calls[0][1].body);
  expect(payload.blog[0].tags).toEqual(["Estrategia"," Tecnología"]);
  expect(payload.blog[0].body).toBe("**Hola**");
  expect(payload.pages.growthlab).toBeDefined();
  expect(await screen.findByText("Cambios publicados.")).toBeInTheDocument();
 });
});