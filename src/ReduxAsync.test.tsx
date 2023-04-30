import React from "react";
import { render, cleanup, screen, waitFor } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import customCounterReducer from "../src/features/customCounter/customCounterSlice";
import counterReducer from "../src/features/counter/counterSlice";
import { RootState } from "app/store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import { ReduxAsync } from "ReduxAsync";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
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
  it("Should display value with 100 + payload", async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    await userEvent.click(screen.getByText("fetchDummy"));
    await waitFor(
      () =>
        expect(screen.getByTestId("count-value-async")).toHaveTextContent(
          "105"
        ),
      { timeout: 3000 }
    );
  });
});
