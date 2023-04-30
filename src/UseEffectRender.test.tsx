import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { UseEffectRender } from "UseEffectRender";

afterEach(() => {
  cleanup();
});

describe("Rendering the list with props", () => {
  it("Should render Loading... initially", () => {
    render(<UseEffectRender />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("Should render username when data fetch completes", async () => {
    render(<UseEffectRender />);
    expect(screen.queryByText(/I am /)).toBeNull();
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});
