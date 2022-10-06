import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBox } from "../../interfaces/Ibox";

export interface IResultState {
  boxes: IBox[];
  numboxes: number;
  units: number;
  weightMax: number;
  volumenContainer:number;
  isGold:boolean;
}
export const defaultState: IResultState = {
  boxes:[{ id:0,
    width:0,
    height:0,
    long:0,
    quantity:0,
    weigth:0,
    update:false}],
  numboxes: 0,
  units: 0,
  weightMax: 0,
  volumenContainer:0,
  isGold:false,
};
const initialState: IResultState = defaultState;

export const resultSlice = createSlice({
  name: "result",
  initialState: initialState,
  reducers: {
    setBoxes: (state, action: PayloadAction<IBox[]>) => {
      state.boxes = action.payload;
    },
    setNumBoxes: (state, action: PayloadAction<number>) => {
      state.numboxes = action.payload;
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
    setGold: (state, action: PayloadAction<boolean>) => {
      state.isGold = action.payload;
    },
    resetStateToDefault: () => {
      return defaultState;
    },
  },
});
export const resultActions = resultSlice.actions;
export const resultReducer = resultSlice.reducer;
