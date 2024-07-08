import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IData, Item } from "../types";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (page: number) => {
    const response = await axios.get(`http://localhost:3001/data?page=${page}`);
    return response.data as Item[];
  }
);

const initialState: IData = {
  items: [],
  status: "idle",
  page: 1,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
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
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.status = "success";
        state.items.push(...action.payload);
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { incrementPage } = dataSlice.actions;

export default dataSlice.reducer;
