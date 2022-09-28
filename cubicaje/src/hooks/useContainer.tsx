import { useDispatch, useSelector } from "react-redux";
import {
  containerActions,
  IContainerState,
} from "../store/containers/containerSlice";

export const useContainer = () => {
  const state = useSelector((state: any) => state.container) as IContainerState;
  const dispatch = useDispatch();
  const changeContainerDry20FT = () => {
    dispatch(containerActions.setType("Contenedor Seco o Dry "));
    dispatch(containerActions.setMeasure("20FT"));
    dispatch(containerActions.setWidth(235.2));
    dispatch(containerActions.setHeigth(239.3));
    dispatch(containerActions.setLong(589.8));
    dispatch(containerActions.setWeigthMax(28180));
  };
  const changeContainerDry40FT = () => {
    dispatch(containerActions.setType("Contenedor Seco o Dry "));
    dispatch(containerActions.setMeasure("40FT"));
    dispatch(containerActions.setWidth(235.2));
    dispatch(containerActions.setHeigth(239.3));
    dispatch(containerActions.setLong(1203.2));
    dispatch(containerActions.setWeigthMax(28750));
  };
  const changeContainerDry40HQ = () => {
    dispatch(containerActions.setType("Contenedor Seco o Dry "));
    dispatch(containerActions.setMeasure("40HQ"));
    dispatch(containerActions.setWidth(235.2));
    dispatch(containerActions.setHeigth(269.8));
    dispatch(containerActions.setLong(1203.2));
    dispatch(containerActions.setWeigthMax(28560));
  };
  const changeContainerReffer20FT = () => {
    dispatch(containerActions.setType("Contenedor Refrigerado "));
    dispatch(containerActions.setMeasure("20FT"));
    dispatch(containerActions.setWidth(222.5));
    dispatch(containerActions.setHeigth(216.9));
    dispatch(containerActions.setLong(502.5));
    dispatch(containerActions.setWeigthMax(27400));
  };
  const changeContainerReffer40FT = () => {
    dispatch(containerActions.setType("Contenedor Refrigerado "));
    dispatch(containerActions.setMeasure("40FT"));
    dispatch(containerActions.setWidth(222.5));
    dispatch(containerActions.setHeigth(216.9));
    dispatch(containerActions.setLong(1005));
    dispatch(containerActions.setWeigthMax(27700));
  };
  const changeContainerReffer40HQ = () => {
    dispatch(containerActions.setType("Contenedor Refrigerado "));
    dispatch(containerActions.setMeasure("40HQ"));
    dispatch(containerActions.setWidth(228.6));
    dispatch(containerActions.setHeigth(253.2));
    dispatch(containerActions.setLong(12.571));
    dispatch(containerActions.setWeigthMax(29520));
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
