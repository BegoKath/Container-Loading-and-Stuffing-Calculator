
import { configureStore } from "@reduxjs/toolkit";
import { containerReducer } from "./containers/containerSlice";

export const store = configureStore({
  reducer: {
   container: containerReducer
  },
  middleware: (getDefaultMiddleware: (arg0: { serializableCheck: boolean; }) => any) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});