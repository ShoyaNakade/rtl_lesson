import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { MockServer } from "MockServer";
import { rest } from "msw";
import { setupServer } from "msw/node";

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

describe("Mocking API", () => {
  it("[Fetch success]Should display fetched data correctly and button disable", async () => {
    render(<MockServer />);
    expect(screen.queryByText(/Bred/)).toBeNull();
    expect(screen.getByRole("button")).toHaveTextContent("Start Fetch");
    screen.getByRole("button").click();
    expect(await screen.findByText(/Bred/)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Loaded");
    expect(screen.getByRole("button")).toBeDisabled();
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
    render(<MockServer />);
    screen.getByRole("button").click();
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Fetching Failed!"
    );
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
    expect(screen.getByRole("button")).toBeEnabled();
  });
});
