import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WebsiteMockup } from "./WebsiteMockup";

describe("WebsiteMockup", () => {
  it("cambia el contenido al seleccionar otra pestaña", () => {
    render(<WebsiteMockup />);
    expect(screen.getByText("Una propuesta clara desde el primer segundo.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Servicios" }));
    expect(screen.getByText("Explicar bien también es vender.")).toBeInTheDocument();
  });
});
