import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBox } from "../../interfaces/Ibox";

export interface IBoxState {
  boxes?: IBox[];
  isComplete: boolean;
}
export const defaultState: IBoxState = {
  isComplete: false,
};
const initialState: IBoxState = defaultState;

export const boxSlice = createSlice({
  name: "box",
  initialState: initialState,
  reducers: {
    setBoxes: (state, action: PayloadAction<IBox[]>) => {
      state.boxes = action.payload;
    },
    setComplete: (state, action: PayloadAction<boolean>) => {
        state.isComplete = action.payload;
    },
    resetStateToDefault: () => {
        return defaultState;
      },
  },
});
export const boxActions = boxSlice.actions;
export const boxReducer = boxSlice.reducer;
