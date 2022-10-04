import { useDispatch, useSelector } from "react-redux"
import { IBox } from "../interfaces/Ibox";
import { IResultState, resultActions } from "../store/result/resultSlice"
import { resultThunks } from "../store/result/resultThunks";



export const useResult = () =>{
   
    const state= useSelector((state:any) => state.result) as IResultState;    
    const dispatch = useDispatch();   
    const volumenContainer = ()=> dispatch(resultThunks.volumenContainer())
    const resultUniqueBox =(values:IBox)=>dispatch(resultThunks.resultUniqueBox(values));
    const showWindowGold = (gold:boolean)=> dispatch(resultActions.setGold(gold));
    return{
        state,
        resultUniqueBox,
        volumenContainer,
        showWindowGold
    }
}