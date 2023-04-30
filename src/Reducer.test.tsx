import reducer from "features/customCounter/customCounterSlice";
import {
  increment,
  incrementByAmount,
} from "../src/features/customCounter/customCounterSlice";

describe("Reducer of reduxToolKit", () => {
  describe("increment action", () => {
    let initialState = { mode: 0, value: 1, username: "" };
    it("should increment by 1 with no payload", async () => {
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(2);
    });
    it("should increment by payload value", async () => {
      initialState = { mode: 1, value: 1, username: "" };
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(101);
    });
    it("should increment by payload value 10000", async () => {
      initialState = { mode: 2, value: 1, username: "" };
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(10001);
    });
  });
  describe("incrementByAmount action", () => {
    let initialState = { mode: 0, value: 1, username: "" };
    it("should increment by payload value with mode 0", async () => {
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(4);
    });
    it("should increment by 100 * payload value  with mode 1", async () => {
      initialState = { mode: 1, value: 1, username: "" };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(301);
    });
    it("should increment by 10000 * payload value  with mode 2", async () => {
      initialState = { mode: 2, value: 1, username: "" };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(30001);
    });
  });
});
