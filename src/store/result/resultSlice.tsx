import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBox } from "../../interfaces/Ibox";
import {IResult} from "../../interfaces/IResult";


export interface IResultState {
  boxes: IBox[];
  numStep:number;
  volumenContainer:number;
  isGold:boolean;
  isTransport:boolean;
  percentVolumen:number,
  percentWeigth:number, 
  clientID:string,
  response_type:string,
  code_challenge_method:string,
  optBox:boolean 
}
const result:IResult={
  numboxes:0,
  weightMax:0,
  units:0,
  volumen:0,
  percent:0
}
export const defaultState: IResultState = {
  boxes:[{ id:0,
    width:0,
    height:0,
    long:0,
    quantity:0,
    weigth:0,
    units:0,
    update:false,
    result:result}],
  volumenContainer:0,
  percentVolumen:0,
  percentWeigth:0,
  numStep:0,
  isGold:false,
  isTransport:false,
  clientID:'a5ecJGeXYcjULjmu48aqqFoy4GjiZvun1H1Ef9Ui',
  response_type:'code',
  code_challenge_method:'S256',
  optBox:false
};
const initialState: IResultState = defaultState;

export const resultSlice = createSlice({
  name: "result",
  initialState: initialState,
  reducers: {
    setBoxes: (state, action: PayloadAction<IBox[]>) => {
      state.boxes = action.payload;
    },
    setVolumenContainer: (state, action: PayloadAction<number>) => {
      state.volumenContainer = action.payload;
    },
    setNumStep: (state, action: PayloadAction<number>) => {
      state.numStep = action.payload;
    },
    setPercentVolumen: (state, action: PayloadAction<number>) => {
      state.percentVolumen = action.payload;
    },
    setPercentWeigth: (state, action: PayloadAction<number>) => {
      state.percentWeigth = action.payload;
    },
    setGold: (state, action: PayloadAction<boolean>) => {
      state.isGold = action.payload;
    },
    setTransport: (state, action: PayloadAction<boolean>) => {
      state.isTransport = action.payload;
    },
    setOptBox: (state, action: PayloadAction<boolean>) => {
      state.optBox = action.payload;
    },
    resetStateBoxes:(state)=>{
      state.boxes=[{ id:0,
        width:0,
        height:0,
        long:0,
        quantity:0,
        weigth:0,
        units:0,
        update:false,
        result:result}];
        state.percentVolumen=0;
        state.percentWeigth=0;
    },
    resetStateToDefault: () => {
      return defaultState;
    },
  },
});
export const resultActions = resultSlice.actions;
export const resultReducer = resultSlice.reducer;
