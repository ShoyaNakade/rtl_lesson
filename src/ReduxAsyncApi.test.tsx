import React from "react";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { configureStore } from "@reduxjs/toolkit";
import customCounterReducer from "../src/features/customCounter/customCounterSlice";
import counterReducer from "../src/features/counter/counterSlice";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { RootState } from "app/store";
import { ReduxAsync } from "ReduxAsync";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  // 疑似的なサーバーを作成
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("Redux Async Mocking API", () => {
  let store: ToolkitStore<RootState>;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        counter: counterReducer,
        customCounter: customCounterReducer,
      },
    });
  });
  it("[Fetch success]Should display fetched data correctly and button disable", async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole("heading")).toBeNull();
    userEvent.click(screen.getByText("fetchJSON"));
    await waitFor(
      () =>
        expect(screen.getByTestId("dummy-async-result")).toHaveTextContent(
          "Bred dummy"
        ),
      { timeout: 3000 }
    );
  });
  it("[Fetch failure]Should display error msg, no render heading and button abled", async () => {
    // responseを404にする
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    userEvent.click(screen.getByText("fetchJSON"));
    await waitFor(
      () =>
        expect(screen.getByTestId("dummy-async-result")).toHaveTextContent(
          "anonymous"
        ),
      { timeout: 3000 }
    );
  });
});
