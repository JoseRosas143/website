import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AdminDashboard } from "@/components/AdminDashboard";
import { defaultContent } from "@/lib/site-content";

vi.mock("next/navigation", () => ({ usePathname: () => "/admin" }));

describe("AdminDashboard", () => {
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
});
