import { aCFetch, cCFetch, cFetch } from "../basiApi";
import {
  ICityData,
  ICountryData,
  ISettingProfilUpadeteResponse,
  ISettingProfileResponse,
  Iemployee,
  UpdateProfile,
} from "./types";

export const getSettingsProfile = async () => {
  const response = await cFetch<ISettingProfileResponse>({
    url: `/talent/setting/get_info`,
  });
  return response;
};

export const updateSettingsProfile = async (data: UpdateProfile) => {
  const response = await aCFetch<ISettingProfilUpadeteResponse>({
    url: "/talent/setting/update_info",
    data: JSON.stringify(data),
    method: "PUT",
  });
  return response;
};

export const getCountry = async () => {
  const response = await cCFetch<ICountryData>({
    url: "/get_country",
  });
  return response;
};
export const getCountryServer = async () => {
  const response = await cFetch<ICountryData>({
    url: "/get_country",
  });
  return response;
};

export const getCity = async (country_id: string) => {
  const response = await cCFetch<ICityData>({
    url: `/get_city_by_country?country_id=${country_id}`,
  });
  return response;
};

export const getCityserver = async (country_id: string) => {
  const response = await cFetch<ICityData>({
    url: `/get_city_by_country?country_id=${country_id}`,
  });
  return response;
};

export const getemploymenttype = async () => {
  const response = await cCFetch<Iemployee>({
    url: "/talent/profile/get_employment_type",
  });
  return response;
};
export const getevenettype = async () => {
  const response = await cCFetch<Iemployee>({
    url: "/talent/profile/get_events_type",
  });
  return response;
};
