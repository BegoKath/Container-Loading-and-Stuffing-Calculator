import { Dispatch } from "@reduxjs/toolkit";
import { IBox } from "../../interfaces/Ibox";
import { Codes } from "../../interfaces/IResCodes";
import { AuthorizationService } from "../../services/AuthorizationService";
import { Alert } from "../../utils/Alert";

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
  (values: IBox, boxes: IBox[], optBox: boolean): any =>
  (dispatch: Dispatch, getState: any) => {
    try {
      const { volumenContainer } = getState().result;
      const { width, heigth, long, weigthMax } = getState().container;
      var numBoxes = 0;
      if (optBox) {
        const option1 = calculeBoxes(long, width, heigth, values);

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
      } else {
        const w= parseInt((width/values.width).toString());
        const l= parseInt((long/values.long).toString());      
        const h=parseInt((heigth/values.height).toString());        
        numBoxes= w*l*h;
      }
      var weigthBoxes = values.weigth * numBoxes;
      
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
      const unitsBoxes = values.units * numBoxes;
      const volumenBox = values.height * values.width * values.long;
      const percent = ((volumenBox * numBoxes) / volumenContainer) * 100;
      const newBoxes = boxes.map((e: IBox): IBox => {
        if (e.id === values.id) {
          const obj = Object.freeze({
            id: values.id,
            height: values.height,
            width: values.width,
            weigth: values.weigth,
            long: values.long,
            quantity: values.quantity,
            update: true,
            units: values.units,
            result: {
              numboxes: numBoxes,
              weightMax: weigthBoxes,
              units: unitsBoxes,
              volumen: volumenBox,
              percent: percent,
            },
          });
          e = obj;
        }
        return e;
      });
      const percentWeigth = (weigthBoxes / weigthMax) * 100;
      dispatch(resultActions.setPercentVolumen(Number(percent.toFixed(2))));
      dispatch(
        resultActions.setPercentWeigth(Number(percentWeigth.toFixed(2)))
      );
      dispatch(resultActions.setBoxes(newBoxes));
    } catch (error) {
      Alert.showError("Por favor verifique los datos de la caja.");
    }
  };

const resultMultiplesBoxes =
  (boxes: IBox[], values: IBox, update: boolean): any =>
  (dispatch: Dispatch, getState: any) => {
    try {
      const { isGold, volumenContainer } = getState().result;
      const { weigthMax } = getState().container;
      var numBoxes = values.quantity;
      const volumenBox = values.height * values.width * values.long;
      var volumenNumBox = volumenBox * numBoxes;
      var volumenBoxes = 0;
      var weigthBoxes = values.weigth * numBoxes;
      var weigthBoxesMax = 0;
      if (boxes.length > 1) {
        // eslint-disable-next-line array-callback-return
        boxes.map((e: IBox) => {
          if (e.id !== values.id) {
            volumenBoxes = volumenBoxes + e.result.volumen;
            weigthBoxesMax = weigthBoxesMax + e.result.weightMax;
          }
        });
        volumenBoxes = volumenNumBox + volumenBoxes;
        weigthBoxesMax = weigthBoxesMax + weigthBoxes;
      } else {
        volumenBoxes = volumenNumBox;
        weigthBoxesMax = weigthBoxes;
      }
      //verifica si queda espacio en el contenedor
      if (volumenBoxes < volumenContainer && weigthBoxesMax < weigthMax) {
        const unitsBoxes = values.units * numBoxes;
        const percent = (volumenNumBox / volumenContainer) * 100;
        const percentWeigth = (weigthBoxesMax / weigthMax) * 100;
        var percentVolumen = 0;
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
              units: values.units,
              result: {
                numboxes: numBoxes,
                weightMax: weigthBoxes,
                units: unitsBoxes,
                volumen: volumenNumBox,
                percent: Number(percent.toFixed(2)),
              },
            };
          }
          percentVolumen = percentVolumen + e.result.percent;
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
            units: 0,
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
          dispatch(
            resultActions.setPercentVolumen(Number(percentVolumen.toFixed(2)))
          );
          dispatch(
            resultActions.setPercentWeigth(Number(percentWeigth.toFixed(2)))
          );
          return;
        }

        dispatch(resultActions.setBoxes(newBoxes));
        dispatch(
          resultActions.setPercentVolumen(Number(percentVolumen.toFixed(2)))
        );
        dispatch(
          resultActions.setPercentWeigth(Number(percentWeigth.toFixed(2)))
        );
      } else {
        Alert.showWarning(
          "Por favor verfique el espacio disponible del contenedor.",
          { title: "Contenedor lleno", timer: 3000 }
        );
      }
    } catch (error) {
      Alert.showError("Por favor verifique los datos de la caja.");
    }
  };

const getAuthorization =
  (id: string, code: string, codeVerifier: string): any =>
  async (dispatch: Dispatch) => {
    const res = await AuthorizationService.authorizationGold({
      id,
      code,
      codeVerifier,
    });   
    if (res === "Error") {
      await Alert.showError("Error");
      window.location.href = `${process.env.REACT_APP_URL_LOCAL}/gold`;
      return;
    }
    if (res.access_token) {      
      window.location.href = `${process.env.REACT_APP_URL_LOCAL}/gold?gold=${res.access_token}`;
    }
  };

const getCodes = async (): Promise<Codes> => {
  const res = await AuthorizationService.getCodes();
  const codes = res as Codes;

  return codes;
};
export const resultThunks = {
  volumenContainer,
  resultUniqueBox,
  resultMultiplesBoxes,
  getAuthorization,
  getCodes,
};
