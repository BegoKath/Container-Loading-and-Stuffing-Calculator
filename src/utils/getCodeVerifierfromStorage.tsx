import { Keys } from "../constants/Keys";

export const getCodeVerifierFromStorage = (): string | undefined => {
    try {
      const codeString = localStorage.getItem(Keys.CV);
      return codeString ? codeString : "";
    } catch (error) {
      return "";
    }
  }