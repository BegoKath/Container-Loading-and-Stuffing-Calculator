import { useDispatch, useSelector } from "react-redux"
import { IBox } from "../interfaces/Ibox";
import { IResultState } from "../store/result/resultSlice"
import { resultThunks } from "../store/result/resultThunks";



export const useResult = () =>{
   
    const state= useSelector((state:any) => state.result) as IResultState;
    
    const dispatch = useDispatch();

   
    const volumenContainer = ()=> dispatch(resultThunks.volumenContainer())
    const resultUniqueBox =(values:IBox)=>dispatch(resultThunks.resultUniqueBox(values));

    return{
        state,
        resultUniqueBox,
        volumenContainer
    }
}