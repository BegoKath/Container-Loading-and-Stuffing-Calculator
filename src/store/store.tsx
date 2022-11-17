
import { configureStore } from "@reduxjs/toolkit";

import { containerReducer } from "./containers/containerSlice";
import { resultReducer } from "./result/resultSlice";

export const store = configureStore({
  reducer: {
   container: containerReducer,
   result:resultReducer
  },
  middleware: (getDefaultMiddleware: (arg0: { serializableCheck: boolean; }) => any) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});