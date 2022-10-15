import { Dispatch } from "@reduxjs/toolkit";
import { IBox } from "../../interfaces/Ibox";
import { IResult } from "../../interfaces/IResult";

import { resultActions } from "./resultSlice";

const volumenContainer = (): any => (dispatch: Dispatch, getState: any) => {
  const { width, heigth, long } = getState().container;
  const volumen = width * heigth * long;
  dispatch(resultActions.setVolumenContainer(volumen));
};
//calcula la cantidad de cajas y el espacio vacio en el contenedor
const calculeBoxes = (
  long: number,
  width: number,
  heigth: number,
  values: IBox
) => {
  const boxLong = [
    parseInt((long / values.long).toString()),
    parseInt((long / values.width).toString()),
    parseInt((long / values.height).toString()),
  ];
  const boxWidth = [
    parseInt((width / values.long).toString()),
    parseInt((width / values.width).toString()),
    parseInt((width / values.height).toString()),
  ];
  const boxHeight = [
    parseInt((heigth / values.long).toString()),
    parseInt((heigth / values.width).toString()),
    parseInt((heigth / values.height).toString()),
  ];
  var opt = [
    boxLong[0] * boxWidth[1] * boxHeight[2],
    boxLong[1] * boxWidth[2] * boxHeight[0],
    boxLong[2] * boxWidth[0] * boxHeight[1],
  ];
  var numBoxes = Math.max(...opt);
  var index = 0;
  // eslint-disable-next-line array-callback-return
  opt.map((e: number, i: number) => {
    if (e === numBoxes) {
      index = i;
    }
  });
  const emptySpaces = [
    [
      long - boxLong[0] * values.long,
      width - boxWidth[1] * values.width,
      heigth - boxHeight[2] * values.height,
    ],
    [
      long - boxLong[1] * values.width,
      width - boxWidth[2] * values.height,
      heigth - boxHeight[0] * values.long,
    ],
    [
      long - boxLong[2] * values.height,
      width - boxWidth[0] * values.long,
      heigth - boxHeight[1] * values.width,
    ],
  ];
  const emptySpace = emptySpaces[index];
  const space = Math.max(...emptySpace);
  var index1 = 0;
  // eslint-disable-next-line array-callback-return
  emptySpace.map((e: number, i: number) => {
    if (e === space) {
      index1 = i;
    }
  });

  return { numBoxes, space, index1 };
};
  //calcula cuantas cajas pueden entrar de una sola medida
  const resultUniqueBox =
  (values: IBox, boxes: IBox[]): any =>
  (dispatch: Dispatch, getState: any) => {
    const { width, heigth, long, weigthMax } = getState().container;
    const option1 = calculeBoxes(long, width, heigth, values);
    var numBoxes = 0;
    if (option1.index1 === 0) {
      const option2 = calculeBoxes(option1.space, width, heigth, values);
      numBoxes = option1.numBoxes + option2.numBoxes;
    }
    if (option1.index1 === 1) {
      const option2 = calculeBoxes(long, option1.space, heigth, values);
      numBoxes = option1.numBoxes + option2.numBoxes;
    }
    if (option1.index1 === 2) {
      const option2 = calculeBoxes(long, width, option1.space, values);
      numBoxes = option1.numBoxes + option2.numBoxes;
    }
    var weigthBoxes = values.weigth * numBoxes;
    const unitsBoxes = values.units * numBoxes;
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
    const re: IResult = {
      numboxes: numBoxes,
      weightMax: weigthBoxes,
      units: unitsBoxes,
      volumen: 0,
      percent: 0,
    };
    values.result = re;
    const newBoxes = boxes.map((e: IBox): IBox => {
      if (e.id === values.id) {
        e = values;
      }
      return e;
    });
    dispatch(resultActions.setBoxes(newBoxes));
  };


const resultMultiplesBoxes =
  (boxes: IBox[], values: IBox, update: boolean): any =>
  (dispatch: Dispatch, getState: any) => {
    const { isGold } = getState().result;
    const { width, heigth, long, weigthMax } = getState().container;    
    const option1 = calculeBoxes(long, width, heigth, values);
    var numBoxes = values.quantity;

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
    const newBoxes = boxes.map((e: IBox): IBox => {
      if (e.id === values.id) {
        e = {
          id: values.id,
          height: values.height,
          width: values.width,
          weigth: values.weigth,
          long: values.long,
          quantity: values.quantity,
          update: true,
          units:values.units,
          result: {
            numboxes: numBoxes,
            weightMax: weigthBoxes,
            units: unitsBoxes,
            volumen: 0,
            percent: 0,
          },
        };
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
        units:0,
        result: {
          numboxes: 0,
          weightMax: 0,
          units: 0,
          volumen: 0,
          percent: 0,
        },
      };
      newBoxes.push(newBox);
      dispatch(resultActions.setBoxes(newBoxes));
      dispatch(resultActions.setNumStep(boxes.length));
      return;
    }
    dispatch(resultActions.setBoxes(newBoxes));
  };
export const resultThunks = {
  volumenContainer,
  resultUniqueBox,
  resultMultiplesBoxes,
};
