// store/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (page: number) => {
    const response = await axios.get(
      `${process.env.PUBLIC_URL}/data?page=${page}`
    );
    return response.data;
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    status: "idle",
    page: 1,
  },
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.concat(action.payload);
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { incrementPage } = dataSlice.actions;

export default dataSlice.reducer;
