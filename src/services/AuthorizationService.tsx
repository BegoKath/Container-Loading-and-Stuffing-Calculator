
import { Codes } from "../interfaces/IResCodes";
import { Api } from "./Api";

export class AuthorizationService {
  static authorizationGold = async (props: {
    id: string;
    code: string;
    codeVerifier:string;
  }): Promise<any> => {
    const redirect=`http://localhost:3000/gold`;
    const url = "http://185.197.194.217/o/token/";
    const body = {
      client_id: props.id,
      code: props.code,
      code_verifier: props.codeVerifier,
      redirect_uri: redirect,
      grant_type: "authorization_code",
    };
    return await Api.post(url, body);
  };
  static getCodes =async ():Promise <Codes>=>{
    const url ='http://liquidadorbusinesshy.com/security/v1/challenge';
    return Api.get(url);
  }
}
