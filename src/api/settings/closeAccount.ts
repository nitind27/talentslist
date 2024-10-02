import { cCFetch } from "../basiApi";
import { CloseAccountData, IUpdatePasswordResponse } from "./types";

export const closeAccount = async (data: CloseAccountData) => {
    const response = await cCFetch<IUpdatePasswordResponse>({
      url: "/talent/setting/close_account",
      data: JSON.stringify(data),
      method: "POST",
    });
    return response;
  };