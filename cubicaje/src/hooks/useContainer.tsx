import { useDispatch, useSelector } from "react-redux";
import {
  containerActions,
  IContainerState,
} from "../store/containers/containerSlice";
import { useResult } from "./useResult";

export const useContainer = () => {
  const state = useSelector((state: any) => state.container) as IContainerState;
  const dispatch = useDispatch();
  const {volumenContainer} = useResult();
  const changeContainerDry20FT = () => {
    dispatch(containerActions.setType("Contenedor Seco o Dry "));
    dispatch(containerActions.setMeasure("20FT"));
    dispatch(containerActions.setWidth(2350));
    dispatch(containerActions.setHeigth(2393));
    dispatch(containerActions.setLong(5895));
    dispatch(containerActions.setWeigthMax(28200));
    volumenContainer();
  };
  const changeContainerDry40FT = () => {
    dispatch(containerActions.setType("Contenedor Seco o Dry "));
    dispatch(containerActions.setMeasure("40FT"));
    dispatch(containerActions.setWidth(2352));
    dispatch(containerActions.setHeigth(2393));
    dispatch(containerActions.setLong(12032));
    dispatch(containerActions.setWeigthMax(28750));
    volumenContainer();
  };
  const changeContainerDry40HQ = () => {
    dispatch(containerActions.setType("Contenedor Seco o Dry "));
    dispatch(containerActions.setMeasure("40HQ"));
    dispatch(containerActions.setWidth(2352));
    dispatch(containerActions.setHeigth(2698));
    dispatch(containerActions.setLong(12032));
    dispatch(containerActions.setWeigthMax(28560));
    volumenContainer();
  };
  const changeContainerReffer20FT = () => {
    dispatch(containerActions.setType("Contenedor Refrigerado "));
    dispatch(containerActions.setMeasure("20FT"));
    dispatch(containerActions.setWidth(2225));
    dispatch(containerActions.setHeigth(2169));
    dispatch(containerActions.setLong(5025));
    dispatch(containerActions.setWeigthMax(27400));
    volumenContainer();
  };
  const changeContainerReffer40FT = () => {
    dispatch(containerActions.setType("Contenedor Refrigerado "));
    dispatch(containerActions.setMeasure("40FT"));
    dispatch(containerActions.setWidth(2225));
    dispatch(containerActions.setHeigth(2169));
    dispatch(containerActions.setLong(10050));
    dispatch(containerActions.setWeigthMax(27700));
    volumenContainer();
  };
  const changeContainerReffer40HQ = () => {
    dispatch(containerActions.setType("Contenedor Refrigerado "));
    dispatch(containerActions.setMeasure("40HQ"));
    dispatch(containerActions.setWidth(2286));
    dispatch(containerActions.setHeigth(2532));
    dispatch(containerActions.setLong(12571));
    dispatch(containerActions.setWeigthMax(29520));
    volumenContainer();
  };
  
  return {
    state,
    changeContainerDry20FT,
    changeContainerDry40FT,
    changeContainerDry40HQ,
    changeContainerReffer20FT,
    changeContainerReffer40FT,
    changeContainerReffer40HQ
  };
};
