import { cCFetch } from "@/api/basiApi";
import { INationality, Ilanguages } from "../types";

export const getlanguages = async () => {
    const response = await cCFetch<Ilanguages>({
      url: `/talent/profile/get_languages`,
    });
    return response.data;
  };


  
export const getNationality = async () => {
  const response = await cCFetch<INationality>({
      url: `/talent/profile/get_nationality_data`,   
  })
  return response.data
}
