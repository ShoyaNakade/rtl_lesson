import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render";

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<Render />);
    // screen.debug();
    // screen.debug(screen.getByRole("heading"));
    // screen.debug(screen.getByRole("textbox"));
    // screen.debug(screen.getAllByRole("button"));
    // screen.debug(screen.getByText("Udemy"));
    // screen.debug(screen.getByText("@React"));
    expect(screen.getByRole("heading")).toBeTruthy();
    expect(screen.getByRole("textbox")).toBeTruthy();
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[1]).toBeTruthy();
    expect(screen.getByText("Udemy")).toBeTruthy();
    expect(screen.queryByText("Udeaamy")).toBeNull();
    expect(screen.getByTestId("copyright")).toBeTruthy();
    expect(screen.getByText("@React")).toBeTruthy();
  });
});

// Path: src/Render.test.js
