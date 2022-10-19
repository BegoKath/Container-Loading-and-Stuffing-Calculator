import { useDispatch, useSelector } from "react-redux";
import { IBox } from "../interfaces/Ibox";
import { IResultState, resultActions } from "../store/result/resultSlice";
import { resultThunks } from "../store/result/resultThunks";

export const useResult = () => {
  const state = useSelector((state: any) => state.result) as IResultState;
  const dispatch = useDispatch();
  const volumenContainer = () => dispatch(resultThunks.volumenContainer());
  const resultUniqueBox = (values: IBox) =>
    dispatch(resultThunks.resultUniqueBox(values, state.boxes));
  const resultMultiplesBoxes = (values: IBox, update: boolean) =>
    dispatch(resultThunks.resultMultiplesBoxes(state.boxes, values, update));
  const showWindowGold = (gold: boolean) =>
    dispatch(resultActions.setGold(gold));
  const showTransportContainer = (transport: boolean) =>
    dispatch(resultActions.setTransport(transport));

  const resetStateResult = ()=> dispatch(resultActions.resetStateToDefault());
  return {
    state,
    resultUniqueBox,
    volumenContainer,
    showWindowGold,
    resultMultiplesBoxes,
    showTransportContainer,
    resetStateResult
  };
};
