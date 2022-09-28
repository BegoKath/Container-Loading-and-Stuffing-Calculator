import { Dispatch } from "@reduxjs/toolkit";
import { IBox } from "../../interfaces/Ibox";
import { resultActions } from "./resultSlice";

const volumenContainer= (): any=>(dispatch: Dispatch, getState: any)=>{
    const {width,heigth,long} = getState().container;

    const volumen = width*heigth*long;    
    dispatch(resultActions.setVolumenContainer(volumen))
}
const resultUniqueBox =(values:IBox):any=>(dispatch: Dispatch, getState: any)=>{
    const {volumenContainer}= getState().result;
    const volumenBox = values.height*values.width*values.long;
    const numBoxes=volumenContainer/volumenBox;
    const num = parseInt(numBoxes.toString());
    const weigthBoxes=num*values.weigth;
    console.log(weigthBoxes)
    dispatch(resultActions.setBoxes(num));
}
export const resultThunks ={volumenContainer,resultUniqueBox}