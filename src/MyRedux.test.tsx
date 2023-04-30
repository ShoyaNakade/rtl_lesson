import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MyRedux } from "./MyRedux";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import customCounterReducer from "../src/features/customCounter/customCounterSlice";
import counterReducer from "../src/features/counter/counterSlice";
import { RootState } from "app/store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

afterEach(() => {
  window.localStorage.removeItem("reduxState");
});

describe("Redux Integration Test", () => {
  let store: ToolkitStore<RootState>;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        counter: counterReducer,
        customCounter: customCounterReducer,
      },
    });
  });
  it("Should display value with increment by 1 per click", () => {
    render(
      <Provider store={store}>
        <MyRedux />
      </Provider>
    );
    const countValue = screen.getByTestId("count-value");
    const incrementButton = screen.getByText("+");
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(countValue).toHaveTextContent("3");
  });
  it("Should display value with decrement by 1 per click", () => {
    render(
      <Provider store={store}>
        <MyRedux />
      </Provider>
    );
    const countValue = screen.getByTestId("count-value");
    const decrementButton = screen.getByText("-");
    fireEvent.click(decrementButton);
    fireEvent.click(decrementButton);
    expect(countValue).toHaveTextContent("-2");
  });
  it("Should display value with increment by 10 per click", () => {
    render(
      <Provider store={store}>
        <MyRedux />
      </Provider>
    );
    const countValue = screen.getByTestId("count-value");
    const input = screen.getByPlaceholderText("Enter");
    const incrementByAmountButton = screen.getByText("IncrementByAmount");
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(incrementByAmountButton);
    fireEvent.click(incrementByAmountButton);
    expect(countValue).toHaveTextContent("20");
  });
});
