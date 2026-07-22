import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { QuoteForm } from "./QuoteForm";

vi.mock("next/link", () => ({ default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a> }));

describe("QuoteForm", () => {
  afterEach(() => vi.restoreAllMocks());

  it("muestra confirmación cuando la solicitud se guarda", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    render(<QuoteForm defaultService="Seguros" />);
    fireEvent.change(screen.getByLabelText("Nombre completo"), { target: { value: "Persona de prueba" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "prueba@example.com" } });
    fireEvent.change(screen.getByLabelText("Teléfono o WhatsApp"), { target: { value: "2210000000" } });
    fireEvent.change(screen.getByLabelText("Cuéntanos brevemente qué necesitas"), { target: { value: "Quiero comparar opciones." } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" }));
    await waitFor(() => expect(screen.getByText("Recibimos tu solicitud.")).toBeInTheDocument());
  });
});
