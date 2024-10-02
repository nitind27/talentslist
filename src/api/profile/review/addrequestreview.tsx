import { cCFetch } from "@/api/basiApi";
import { Ireviewrequest } from "../types";

export const addreviewrequest = async (
  formData: FormData
): Promise<Ireviewrequest> => {
  const response = await cCFetch<Ireviewrequest>({
    url: "/talent/profile/request_review",
    method: "POST",

    data: JSON.stringify(formData),
    customHeaders: {
      "Content-type": "application/json",
    },
  });

  return response.data;
};
