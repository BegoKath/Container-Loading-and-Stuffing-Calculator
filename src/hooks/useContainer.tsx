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
    dispatch(containerActions.setWidth(234.5));
    dispatch(containerActions.setHeigth(240));
    dispatch(containerActions.setLong(590));
    dispatch(containerActions.setWeigthMax(28240));
    volumenContainer();
  };
  const changeContainerDry40FT = () => {
    dispatch(containerActions.setType("Contenedor Seco o Dry "));
    dispatch(containerActions.setMeasure("40FT"));
    dispatch(containerActions.setWidth(234.5));
    dispatch(containerActions.setHeigth(240));
    dispatch(containerActions.setLong(1203));
    dispatch(containerActions.setWeigthMax(26850));
    volumenContainer();
  };
  const changeContainerDry40HQ = () => {
    dispatch(containerActions.setType("Contenedor Seco o Dry "));
    dispatch(containerActions.setMeasure("40HQ"));
    dispatch(containerActions.setWidth(235));
    dispatch(containerActions.setHeigth(271));
    dispatch(containerActions.setLong(1203));
    dispatch(containerActions.setWeigthMax(26600));
    volumenContainer();
  };
  const changeContainerReffer20FT = () => {
    dispatch(containerActions.setType("Contenedor Refrigerado "));
    dispatch(containerActions.setMeasure("20FT"));
    dispatch(containerActions.setWidth(228.5));
    dispatch(containerActions.setHeigth(225.5));
    dispatch(containerActions.setLong(550));
    dispatch(containerActions.setWeigthMax(27280));
    volumenContainer();
  };
  const changeContainerReffer40FT = () => {
    dispatch(containerActions.setType("Contenedor Refrigerado "));
    dispatch(containerActions.setMeasure("40FT"));
    dispatch(containerActions.setWidth(228.5));
    dispatch(containerActions.setHeigth(225));
    dispatch(containerActions.setLong(1157.5));
    dispatch(containerActions.setWeigthMax(30400));
    volumenContainer();
  };
  const changeContainerReffer40HQ = () => {
    dispatch(containerActions.setType("Contenedor Refrigerado "));
    dispatch(containerActions.setMeasure("40HQ"));
    dispatch(containerActions.setWidth(229));
    dispatch(containerActions.setHeigth(255));
    dispatch(containerActions.setLong(1157.5));
    dispatch(containerActions.setWeigthMax(29250));
    volumenContainer();
  };
  const changeTransport = (values:IContainerState) => {
    dispatch(containerActions.setType(values.type));
    dispatch(containerActions.setMeasure(values.measure));
    dispatch(containerActions.setWidth(values.width));
    dispatch(containerActions.setHeigth(values.heigth));
    dispatch(containerActions.setLong(values.long));
    dispatch(containerActions.setWeigthMax(values.weigthMax));
    volumenContainer();
  };
  return {
    state,
    changeContainerDry20FT,
    changeContainerDry40FT,
    changeContainerDry40HQ,
    changeContainerReffer20FT,
    changeContainerReffer40FT,
    changeContainerReffer40HQ,
    changeTransport
  };
};
