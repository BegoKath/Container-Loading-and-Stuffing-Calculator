import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IResultState {
  boxes: number;
  units: number;
  weightMax: number;
  volumenContainer:number;
}
export const defaultState: IResultState = {
  boxes: 0,
  units: 0,
  weightMax: 0,
  volumenContainer:0
};
const initialState: IResultState = defaultState;

export const resultSlice = createSlice({
  name: "result",
  initialState: initialState,
  reducers: {
    setBoxes: (state, action: PayloadAction<number>) => {
      state.boxes = action.payload;
    },
    setUnits: (state, action: PayloadAction<number>) => {
      state.units = action.payload;
    },
    setWeightMax: (state, action: PayloadAction<number>) => {
      state.weightMax = action.payload;
    },
    setVolumenContainer: (state, action: PayloadAction<number>) => {
      state.volumenContainer = action.payload;
    },
    resetStateToDefault: () => {
      return defaultState;
    },
  },
});
export const resultActions = resultSlice.actions;
export const resultReducer = resultSlice.reducer;
