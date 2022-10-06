import { Dispatch } from "@reduxjs/toolkit";
import { IBox } from "../../interfaces/Ibox";
import { resultActions } from "./resultSlice";

const volumenContainer = (): any => (dispatch: Dispatch, getState: any) => {
  const { width, heigth, long } = getState().container;
  const volumen = width * heigth * long;
  dispatch(resultActions.setVolumenContainer(volumen));
};

const resultUniqueBox =
  (values: IBox): any =>
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
    dispatch(resultActions.setUnits(unitsBoxes));
    dispatch(resultActions.setWeightMax(weigthBoxes));
    dispatch(resultActions.setNumBoxes(numBoxes));
  };
const addBoxItem =
  (boxes: IBox[], values: IBox): any =>
  (dispatch: Dispatch, getState: any) => {
    const { isGold } = getState().result;
    const update = values.update;
    const newBoxes = boxes.map((e: IBox): IBox => {
      if (e.id === values.id) {
        e = values;
        e.update = true;
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
      };
      newBoxes.push(newBox);
    }
    dispatch(resultActions.setBoxes(newBoxes));
  };
export const resultThunks = { volumenContainer, resultUniqueBox, addBoxItem };
