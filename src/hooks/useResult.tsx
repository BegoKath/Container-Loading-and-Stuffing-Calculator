
import { useDispatch, useSelector } from "react-redux";
import { IBox } from "../interfaces/Ibox";
import { IResultState, resultActions } from "../store/result/resultSlice";
import { resultThunks } from "../store/result/resultThunks";
import CriptoJS from "crypto-js";
import { AuthorizationService } from "../services/AuthorizationService";
import { Codes } from "../interfaces/IResCodes";



export const useResult = () => {
  const state = useSelector((state: any) => state.result) as IResultState;
  const dispatch = useDispatch();
  const volumenContainer = () => dispatch(resultThunks.volumenContainer());
  const resultUniqueBox = (values: IBox,optBox:boolean) =>
    dispatch(resultThunks.resultUniqueBox(values, state.boxes,optBox));
  const resultMultiplesBoxes = (values: IBox, update: boolean) =>
    dispatch(resultThunks.resultMultiplesBoxes(state.boxes, values, update));
  const showWindowGold = (gold: boolean) =>
    dispatch(resultActions.setGold(gold));
  const showTransportContainer = (transport: boolean) =>
    dispatch(resultActions.setTransport(transport));

  const resetStateResult = ()=> dispatch(resultActions.resetStateToDefault());
  
  const getAuthorization = (id:string,code:string,codeVerifier:string)=>{
    dispatch(resultThunks.getAuthorization(id,code,codeVerifier))
  } 
  const getCodes =async ():Promise<Codes>=> {
    const res = await AuthorizationService.getCodes();
    const codes = res as Codes;
    console.log(codes)
    return codes;
  };
    const setCodeVerifier = ():string=>{
    const code =CodeVerifier(getRandomArbitrary(43,128));
    
    return code;
  }
  const getRandomArbitrary=(min:number, max:number)=> {
    return Math.random() * (max - min) + min;
  }
  const CodeVerifier = (length: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const word = CriptoJS.enc.Utf8.parse(result);
    let encode=word.toString(CriptoJS.enc.Base64)
    encode= encodeURI(encode);
    
   // CriptoJS.enc.Base64.parse(word.toString());//encode Base64
    return encode;
  };
  const codeChallenge =(code:string)=>{
    let result= CriptoJS.SHA256(code);      
    var str= result.toString(CriptoJS.enc.Base64);
    str=encodeURI(str);
    str=str.replace("=","");    
    return str;
  }
  const setOptBox = (opt:boolean)=> dispatch(resultActions.setOptBox(opt));

  const resetStateBoxes= ()=> dispatch(resultActions.resetStateBoxes());
  return {
    state,
    resultUniqueBox,
    volumenContainer,
    showWindowGold,
    resultMultiplesBoxes,
    showTransportContainer,
    resetStateResult,
    setCodeVerifier,
    codeChallenge,
    getAuthorization,
    getCodes,
    setOptBox,
    resetStateBoxes
  };
};
