import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IContainerState {
  type: string;
  measure: string;
  width: number;
  heigth: number;
  long: number;
  weigthMax: number;
}
export const defaultState: IContainerState = {
  type: "Contenedor Seco o Dry ",
  measure: "20FT",
  width: 235.2,
  heigth: 239.3,
  long: 589.8,
  weigthMax: 28180,
};
const initialState: IContainerState = defaultState;
export const containerSlice = createSlice({
  name: "container",
  initialState: initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setMeasure: (state, action: PayloadAction<string>) => {
      state.measure = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setHeigth: (state, action: PayloadAction<number>) => {
      state.heigth = action.payload;
    },
    setLong: (state, action: PayloadAction<number>) => {
      state.long = action.payload;
    },
    setWeigthMax: (state, action: PayloadAction<number>) => {
      state.weigthMax = action.payload;
    },
    resetStateToDefault: () => {
      return defaultState;
    },
  },
});
export const containerActions = containerSlice.actions;
export const containerReducer = containerSlice.reducer;
