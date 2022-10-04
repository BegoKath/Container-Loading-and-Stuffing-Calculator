import { Dispatch } from "@reduxjs/toolkit";
import { IBox } from "../../interfaces/Ibox";
import { resultActions } from "./resultSlice";

const volumenContainer= (): any=>(dispatch: Dispatch, getState: any)=>{
    const {width,heigth,long} = getState().container;
    const volumen = width*heigth*long;    
    dispatch(resultActions.setVolumenContainer(volumen))
}
const resultUniqueBox =(values:IBox):any=>(dispatch: Dispatch, getState: any)=>{
    const {width,heigth,long} = getState().container;
    const boxLong = parseInt((long/values.long).toString());
    const boxWidth = parseInt((width/values.width).toString());
    const boxHeight = parseInt((heigth/values.height).toString());
    const numBoxes=boxHeight*boxWidth*boxLong;
    const weigthBoxes = values.weigth*numBoxes;
    const unitsBoxes= values.quantity*numBoxes;
    dispatch(resultActions.setUnits(unitsBoxes));
    dispatch(resultActions.setWeightMax(weigthBoxes));
    dispatch(resultActions.setNumBoxes(numBoxes));

}

export const resultThunks ={volumenContainer,resultUniqueBox}