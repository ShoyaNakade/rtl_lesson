import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

export const fetchDummy = createAsyncThunk(
  "fetch/dummy",
  async (num: number) => {
    await sleep(2000);
    return num;
  }
);

export const fetchJSON = createAsyncThunk("fetch/json", async () => {
  await sleep(2000);
  const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
  return res.data.username;
});

const initialState = {
  value: 0,
  status: "idle",
};

export const customCounterSlice = createSlice({
  name: "customeCounter",
  initialState: {
    mode: 0,
    value: 0,
    username: "",
  },
  reducers: {
    increment: (state) => {
      switch (state.mode) {
        case 0:
          state.value += 1;
          break;
        case 1:
          state.value += 100;
          break;
        case 2:
          state.value += 10000;
          break;
        default:
          break;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      switch (state.mode) {
        case 0:
          state.value += action.payload;
          break;
        case 1:
          state.value += 100 * action.payload;
          break;
        case 2:
          state.value += 10000 * action.payload;
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchDummy.pending, (state) => {
      //   state.value = 100;
      // })
      .addCase(fetchDummy.fulfilled, (state, action) => {
        state.value = 100 + action.payload;
      })
      .addCase(fetchDummy.rejected, (state, action) => {
        state.value = 100 - (action.payload as number);
        // state.username = action.error.message ? action.error.message : "";
      })
      // .addCase(fetchJSON.pending, (state) => {
      //   state.value = "loading";
      // })
      .addCase(fetchJSON.fulfilled, (state, action) => {
        state.username = action.payload;
      })
      .addCase(fetchJSON.rejected, (state, action) => {
        state.username = "anonymous";
      });
  },
});

export const { increment, decrement, incrementByAmount } =
  customCounterSlice.actions;

export const selectCount = (state: RootState) => state.customCounter.value;

export const selectUsername = (state: RootState) =>
  state.customCounter.username;

export default customCounterSlice.reducer;
