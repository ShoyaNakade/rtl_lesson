import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RenderInput from "./RenderInput";

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<RenderInput outputConsole={jest.fn()} />);
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy();
  });
});

describe("Input form onChange event", () => {
  it("Should update input value correctly", async () => {
    render(<RenderInput outputConsole={console.log} />);
    const inputValue = screen.getByPlaceholderText("Enter") as HTMLInputElement;
    userEvent.type(inputValue, "test");
    await waitFor(() => expect(inputValue.value).toBe("test"));
  });
});

describe("Console button conditionally triggered", () => {
  it("Should not trigger output function", () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);
    userEvent.click(screen.getByRole("button"));
    expect(outputConsole).not.toHaveBeenCalled();
  });
  it("Should trigger output function", async () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);
    const inputValue = screen.getByPlaceholderText("Enter") as HTMLInputElement;
    await userEvent.type(inputValue, "test");
    await userEvent.click(screen.getByRole("button"));
    expect(outputConsole).toHaveBeenCalledTimes(1);
  });
});
