import { Dispatch } from "@reduxjs/toolkit";
import { IBox } from "../../interfaces/Ibox";
import { IResult } from "../../interfaces/IResult";

import { resultActions } from "./resultSlice";

const volumenContainer = (): any => (dispatch: Dispatch, getState: any) => {
  const { width, heigth, long } = getState().container;
  const volumen = width * heigth * long;
  dispatch(resultActions.setVolumenContainer(volumen));
};

const resultUniqueBox =
  (values: IBox,boxes:IBox[]): any =>
  (dispatch: Dispatch, getState: any) => {
    const { width, heigth, long, weigthMax } = getState().container;
    const boxLong = parseInt((long / values.long).toString());
    const boxWidth = parseInt((width / values.width).toString());
    const boxHeight = parseInt((heigth / values.height).toString());
    var numBoxes = boxHeight * boxWidth * boxLong;
    var weigthBoxes = values.weigth * numBoxes;
    const unitsBoxes = values.quantity * numBoxes;
    if (weigthBoxes > parseInt(weigthMax)) {
      for (
        var i = weigthBoxes;
        i > parseInt(weigthMax);
        i = weigthBoxes - values.weigth
      ) {
        numBoxes = numBoxes - 1;
        weigthBoxes = i;
      }
      weigthBoxes = values.weigth * numBoxes;
    }
    const re:IResult={
      numboxes:numBoxes,
      weightMax:weigthBoxes,
      units:unitsBoxes,
      volumen:0,
      percent:0
    }
    values.update=true;
    values.result=re;
    const newBoxes = boxes.map((e: IBox): IBox => {
      if (e.id === values.id) {
        e = values;
      }
      return e;
    });
    dispatch(resultActions.setBoxes(newBoxes));
  };
const resultMultiplesBoxes =
  (boxes: IBox[], values: IBox,update:boolean): any =>
   (dispatch: Dispatch, getState: any) => {
    const { isGold } = getState().result;
    const { width, heigth, long, weigthMax } = getState().container;
    const boxLong = parseInt((long / values.long).toString());
    const boxWidth = parseInt((width / values.width).toString());
    const boxHeight = parseInt((heigth / values.height).toString());
    var numBoxes = boxHeight * boxWidth * boxLong;
    var weigthBoxes = values.weigth * numBoxes;
    const unitsBoxes = values.quantity * numBoxes;
    if (weigthBoxes > parseInt(weigthMax)) {
      for (
        var i = weigthBoxes;
        i > parseInt(weigthMax);
        i = weigthBoxes - values.weigth
      ) {
        numBoxes = numBoxes - 1;
        weigthBoxes = i;
      }
      weigthBoxes = values.weigth * numBoxes;
    }
    const newBoxes =  boxes.map((e: IBox): IBox => {
      if (e.id === values.id) {
       e={
        id: values.id,
        height: values.height,
        width: values.width,
        weigth: values.weigth,
        long: values.long,
        quantity: values.quantity,
        update: true,
        result:{
          numboxes:numBoxes,
          weightMax:weigthBoxes,
          units:unitsBoxes,
          volumen:0,
          percent:0
        }
      }      
      }
      return e;
    });
    
    if (isGold === true && update === false) {
      const newBox: IBox = {
        id: boxes.length,
        height: 0,
        width: 0,
        weigth: 0,
        long: 0,
        quantity: 0,
        update: false,
        result:{
          numboxes:0,
          weightMax:0,
          units:0,
          volumen:0,
          percent:0
        }
      };
      newBoxes.push(newBox);
      dispatch(resultActions.setBoxes(newBoxes));
      dispatch(resultActions.setNumStep(boxes.length));
      return;
    }
    dispatch(resultActions.setBoxes(newBoxes));
  };
export const resultThunks = { volumenContainer, resultUniqueBox, resultMultiplesBoxes };
