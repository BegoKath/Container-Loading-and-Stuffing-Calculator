import { IResult } from "./IResult";

export interface IBox{
    id:number,
    width: number,
    height:number,
    long:number,
    weigth:number,
    quantity:number,
    update:boolean,
    units:number,
    result:IResult    
}