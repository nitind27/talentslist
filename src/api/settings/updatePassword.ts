import { cCFetch } from "../basiApi";
import { IUpdatePasswordResponse } from "./types";


export const updatePassword = async (data: {
  current_password: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await cCFetch<IUpdatePasswordResponse>({
    url: "/talent/setting/update_password",
    data: JSON.stringify(data),
    method: "PUT",
  });
  return response;
};
