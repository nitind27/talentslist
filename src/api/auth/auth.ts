import { cCFetch, cFetch } from "../basiApi";
import {
  ForgatePasswordtData,
  ILoginResponse,
  IPassword,
  ResetPasswordtData,
} from "./types";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await cFetch<ILoginResponse>({
    url: "/talent/login",
    method: "POST",
    data: { email, password },
  });
  return response;
};

export const register = async (data: any) => {
  console.log("data refister ", data);

  const response = await cCFetch<{ message: string }>({
    url: "/talent/signup",
    data: JSON.stringify(data),
    method: "POST",
  });
  console.log("response from API:", response);
  return response;
};

export const logout = async () => {
  const response = await cCFetch<{ message: string; status: boolean }>({
    url: "/talent/logout",
    method: "POST",
  });
  console.log("response from API:", response);
  return response;
};

export const forgatepassword = async (data: ForgatePasswordtData) => {
  const response = await cCFetch<IPassword>({
    url: "/talent/forgot_password",
    data: JSON.stringify(data),
    method: "POST",
  });
  console.log("response from API:", response);
  return response;
};

export const resetpassword = async (data: ResetPasswordtData) => {
  const response = await cCFetch<IPassword>({
    url: "/talent/reset_password",
    data: JSON.stringify(data),
    method: "POST",
  });
  console.log("response from API:", response);
  return response;
};
