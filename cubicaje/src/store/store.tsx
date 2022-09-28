
import { configureStore } from "@reduxjs/toolkit";
import { boxReducer } from "./box/boxSlice";
import { containerReducer } from "./containers/containerSlice";
import { resultReducer } from "./result/resultSlice";

export const store = configureStore({
  reducer: {
   container: containerReducer,
   box:boxReducer,
   result:resultReducer
  },
  middleware: (getDefaultMiddleware: (arg0: { serializableCheck: boolean; }) => any) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});