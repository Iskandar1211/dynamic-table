import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./data-slice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
