import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AdminDashboard } from "@/components/AdminDashboard";
import { defaultContent } from "@/lib/site-content";

vi.mock("next/navigation", () => ({ usePathname: () => "/admin" }));

describe("AdminDashboard", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("muestra todas las páginas y permite agregar, deshacer y rehacer un bloque", () => {
    render(<AdminDashboard initialContent={defaultContent} initialLeads={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Páginas" }));
    const pageSelector = screen.getByRole("combobox", { name: "Página actual" });
    expect(pageSelector).toHaveDisplayValue("Inicio");
    expect(screen.getByRole("option", { name: "Google Workspace" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Seguros" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Nosotros / Acerca de" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Contacto" })).toBeInTheDocument();

    fireEvent.change(pageSelector, { target: { value: "workspace" } });
    fireEvent.click(screen.getByRole("button", { name: /Texto libre/ }));

    expect(screen.getByRole("textbox", { name: "Título" })).toHaveValue("Texto libre");
    expect(screen.getByDisplayValue("Contenido editorial flexible.")).toBeInTheDocument();
    expect(screen.getByText("Cambios sin publicar")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Deshacer" }));
    expect(screen.queryByDisplayValue("Contenido editorial flexible.")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Rehacer" }));
    expect(screen.getByDisplayValue("Contenido editorial flexible.")).toBeInTheDocument();
  });

  it("publica el orden más reciente de los bloques", async () => {
    const request = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, storage: "supabase" })
    });
    vi.stubGlobal("fetch", request);
    render(<AdminDashboard initialContent={defaultContent} initialLeads={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Páginas" }));
    const originalFirstId = defaultContent.home.blocks[0].id;
    const originalSecondId = defaultContent.home.blocks[1].id;
    fireEvent.click(screen.getByRole("button", { name: "Bajar" }));
    fireEvent.click(screen.getByRole("button", { name: "Publicar cambios" }));

    await waitFor(() => expect(request).toHaveBeenCalledWith("/api/admin/content", expect.objectContaining({ method: "PATCH" })));
    const payload = JSON.parse(request.mock.calls[0][1].body as string);
    expect(payload.home.blocks[0].id).toBe(originalSecondId);
    expect(payload.home.blocks[1].id).toBe(originalFirstId);
    expect(await screen.findByText("Cambios publicados.")).toBeInTheDocument();
  });
});
