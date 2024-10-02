import { auth, signOut } from "../../auth";
import axios from "axios";
import { signOut as clientSignOut } from "next-auth/react";
import { getSession } from "next-auth/react";

export const API_BASE_URL = process.env.NEXT_PUBLIC_APP_API_ENDPOINT;
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export interface ApiResponse<T> {
  error: boolean;
  data: T;
  statusCode: number;
}

export const cFetch = async <TResponse>({
  url,
  method = "GET",
  data,
  customHeaders = {},
}: {
  url: string;
  method?: HttpMethod;
  data?: any;
  customHeaders?: any;
}): Promise<ApiResponse<TResponse>> => {
  console.log("Log from Custom Log hell", API_BASE_URL + url);

  const response: ApiResponse<TResponse> = {
    error: false,
    data: {} as TResponse,
    statusCode: 0,
  };
  const session = await auth();
  const token = session ? session?.user?.token : "";
  console.log("BASE URL ", API_BASE_URL);
  console.log("Token ", token);
  try {
    const res = await fetch(API_BASE_URL + url, {
      method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
        ...customHeaders,
      },
      body: data && JSON.stringify(data),
    });

    if (res.status === 401) {
      signOut(); // Call your logout function here
      response.error = true;
      response.data = await res.json();
      response.statusCode = res.status;
      return response;
    }
    const bodyData = await res.json();
    if (res.ok) {
      response.data = bodyData;
    } else {
      response.error = true;
      response.data = bodyData;
      response.statusCode = res.status;
    }
    return response;
  } catch (error) {
    // console.error(`Error in fethcing ${url}`, error);
    if (error instanceof Error) {
      console.error(`Error in fethcing 343424`, error.message);
    }
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as TResponse;
    return response;
  }
};

export const cCFetch = async <TResponse>({
  url,
  method = "GET",
  data,
  customHeaders = {},
}: {
  url: string;
  method?: HttpMethod;
  data?: any;
  customHeaders?: any;
}): Promise<ApiResponse<TResponse>> => {
  console.log("Log from client custom fetch ", API_BASE_URL + url);
  const session = await getSession();
  const response: ApiResponse<TResponse> = {
    error: false,
    data: {} as TResponse,
    statusCode: 0,
  };
  console.log("BASE URL ", API_BASE_URL);
  try {
    const res = await fetch(API_BASE_URL + url, {
      method,
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
        "Content-type": "application/json",
        "Access-Control-Allow-Origin":
          process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        ...customHeaders,
      },
      body: data,
      cache: "reload",
    });
    if (res.status === 401) {
      // Perform logout if the status is 401
      clientSignOut(); // Call your logout function here
      return response;
    }
    if (res.ok) {
      response.data = await res.json();
    } else {
      response.error = true;
      response.data = await res.json();
      response.statusCode = res.status;
    }
    return response;
  } catch (error) {
    console.error(error);
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as TResponse;
    return response;
  }
};

export const aCFetch = async <TResponse>({
  url,
  method = "GET",
  data,
  customHeaders = {},
}: {
  url: string;
  method?: HttpMethod;
  data?: any;
  customHeaders?: Record<string, string>;
}): Promise<ApiResponse<TResponse>> => {
  console.log("Log from client custom fetch ", API_BASE_URL + url);
  const session = await getSession();
  const response: ApiResponse<TResponse> = {
    error: false,
    data: {} as TResponse,
    statusCode: 0,
  };
  console.log("BASE URL ", API_BASE_URL);
  try {
    const res = await axios(API_BASE_URL + url, {
      method,
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
        "Content-type": "application/json",
        "Access-Control-Allow-Origin":
          process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        ...customHeaders,
      },
      data: data,
    });
    if (res.status === 401) {
      // Perform logout if the status is 401
      clientSignOut(); // Call your logout function here
      return response;
    }
    if (res.status > 199 && res.status < 300) {
      response.data = res.data;
    } else {
      response.error = true;
      response.data = res.data;
      response.statusCode = res.status;
    }
    return response;
  } catch (error) {
    console.error(error);
    response.error = true;
    if (axios.isAxiosError(error)) {
      response.data = error.response?.data;
      response.statusCode = error?.status || 0;
    } else {
      response.data = {
        message: "Network error or invalid JSON response.",
      } as TResponse;
    }
    return response;
  }
};
