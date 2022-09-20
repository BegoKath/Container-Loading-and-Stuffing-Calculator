
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
   
  },
  middleware: (getDefaultMiddleware: (arg0: { serializableCheck: boolean; }) => any) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});