import axios from "axios";
import { Codes } from "../interfaces/IResCodes";

export class Api {
  private static service = axios.create({
    timeout: 10 * 1000,
  });
  static post = async (
    url: string,
    body?: any,
    token?: string
  ): Promise<any> => {
    try {
      const res = await this.service.post(url, body, {
        headers: {         
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (!res.data) {
        return "Error";
      }
      return res.data;
    } catch (error) {      
      return "Error";
    }
  };
  static get =async(url:string):Promise<any>=>{
    try {
      const res = await this.service.get(url);
      if (!res.data) {
        return res;
      }
      const data = res.data as Codes;
      return data;
    } catch (error) {
      return error;
    }
  }
}
