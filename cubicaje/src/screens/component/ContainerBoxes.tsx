import { useResult } from "../../hooks/useResult";
import { ContainerBox } from "./ContainerBox";

export const ContainerBoxes=()=>{
    const {state:{isGold}} = useResult();

    return(<div className="d-flex align-items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
        <ContainerBox/>
    </div>);
}