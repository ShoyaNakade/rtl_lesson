import { act, cleanup, renderHook } from "@testing-library/react";
import { useCounter } from "./useCounter";

afterEach(() => {
  cleanup();
});

describe("useCounter custom hook", () => {
  it("Should increment counter by 1", () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(4);
  });

  it("Should decrement counter", () => {
    const { result } = renderHook(() => useCounter(3));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(2);
  });
  it("Should double counter", () => {
    const { result } = renderHook(() => useCounter(3));
    act(() => {
      result.current.double();
    });
    expect(result.current.count).toBe(6);
  });
  it("Should triple counter", () => {
    const { result } = renderHook(() => useCounter(3));
    act(() => {
      result.current.triple();
    });
    expect(result.current.count).toBe(9);
  });

  it("Should reset counter", () => {
    const { result } = renderHook(() => useCounter(3));
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });
});
