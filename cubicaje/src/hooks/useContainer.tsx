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
    dispatch(containerActions.setWidth(2345));
    dispatch(containerActions.setHeigth(2400));
    dispatch(containerActions.setLong(5900));
    dispatch(containerActions.setWeigthMax(28240));
    volumenContainer();
  };
  const changeContainerDry40FT = () => {
    dispatch(containerActions.setType("Contenedor Seco o Dry "));
    dispatch(containerActions.setMeasure("40FT"));
    dispatch(containerActions.setWidth(2345));
    dispatch(containerActions.setHeigth(2400));
    dispatch(containerActions.setLong(12030));
    dispatch(containerActions.setWeigthMax(26850));
    volumenContainer();
  };
  const changeContainerDry40HQ = () => {
    dispatch(containerActions.setType("Contenedor Seco o Dry "));
    dispatch(containerActions.setMeasure("40HQ"));
    dispatch(containerActions.setWidth(2350));
    dispatch(containerActions.setHeigth(2710));
    dispatch(containerActions.setLong(12030));
    dispatch(containerActions.setWeigthMax(26600));
    volumenContainer();
  };
  const changeContainerReffer20FT = () => {
    dispatch(containerActions.setType("Contenedor Refrigerado "));
    dispatch(containerActions.setMeasure("20FT"));
    dispatch(containerActions.setWidth(2285));
    dispatch(containerActions.setHeigth(2255));
    dispatch(containerActions.setLong(5500));
    dispatch(containerActions.setWeigthMax(27280));
    volumenContainer();
  };
  const changeContainerReffer40FT = () => {
    dispatch(containerActions.setType("Contenedor Refrigerado "));
    dispatch(containerActions.setMeasure("40FT"));
    dispatch(containerActions.setWidth(2285));
    dispatch(containerActions.setHeigth(2250));
    dispatch(containerActions.setLong(11575));
    dispatch(containerActions.setWeigthMax(30400));
    volumenContainer();
  };
  const changeContainerReffer40HQ = () => {
    dispatch(containerActions.setType("Contenedor Refrigerado "));
    dispatch(containerActions.setMeasure("40HQ"));
    dispatch(containerActions.setWidth(2290));
    dispatch(containerActions.setHeigth(2550));
    dispatch(containerActions.setLong(11575));
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
