import { cCFetch, cFetch } from "../basiApi";
import {
  Data,
  IActiveInactiveServices,
  IAvailability,
  ICancellation,
  IDeleteServices,
  IEditAvailability,
  IParentsSkills,
  IPlatform,
  IServiceData,
  IServiceID,
  IServiceIdData,
  IServices,
  ITravelData,
} from "./types";

export const getServices = async ({
  page,
  per_page,
}: {
  page?: string | number;
  per_page?: string | number;
}) => {
  const response = await cFetch<IServices>({
    url: `/talent/services/get_services` + `?page=${page}&per_page=${per_page}`,
  });
  return response.data;
};

export const getParentsSkills = async () => {
  const response = await cCFetch<IParentsSkills>({
    url: `/talent/services/get_parent_skills`,
  });
  return response;
};

export const getChildSkills = async (id: number) => {
  const response = await cCFetch<IParentsSkills>({
    url: `/talent/services/get_child_skills_by_parent_id/${id}`,
  });
  return response;
};

export const getServicebyID = async (id: number) => {
  const response = await cFetch<IServiceID>({
    url: `/talent/services/get_service_by_id/${id}`,
  });
  return response;
};

export const getAddServices = async (data: IServiceIdData) => {
  console.log("objhtruject", data);
  const response = await cCFetch<IServices>({
    url: `/talent/services/add_service`,
    method: "POST",
    data: JSON.stringify(data),
  });
  console.log("response from API:", response);
  return response;
};

export const getEditServices = async (id: number, data: IServiceIdData) => {
  const response = await cCFetch<IServices>({
    url: `/talent/services/edit_service/${id}`,
    method: "PUT",
    data: JSON.stringify(data),
  });
  return response;
};

export const getDeleteServices = async (data: any) => {
  const response = await cCFetch<IDeleteServices>({
    url: `/talent/services/delete_service`,
    method: "DELETE",
    data: JSON.stringify(data),
  });
  return response;
};

export const getActiveInactive = async (id: number) => {
  const response = await cCFetch<IActiveInactiveServices>({
    url: `/talent/services/active_inactive_service/${id}`,
    method: "POST",
  });
  return response.data;
};

export const getTravelDetails = async () => {
  const response = await cFetch<ITravelData>({
    url: `/talent/services/get_travel_preference`,
  });
  return response;
};

export const getPlatform = async (): Promise<IPlatform> => {
  const response = await cFetch<IPlatform>({
    url: `/talent/services/get_platform`,
  });
  return response.data;
};

export const updatePlatform = async (platform_data: number[]) => {
  const response = await cCFetch<IPlatform>({
    url: `/talent/services/edit_platform`,
    method: "PUT",
    data: JSON.stringify({ platform_data }),
  });
  return response;
};

export const getCancellation = async () => {
  const response = await cFetch<ICancellation>({
    url: `/talent/services/get_cancellation`,
  });
  return response.data;
};

export const updateCancellation = async (data: ICancellation) => {
  const response = await cCFetch<ICancellation>({
    url: `/talent/services/edit_cancellation`,
    method: "PUT",
    data: JSON.stringify(data),
  });
  return response;
};

export const getAvailability = async () => {
  const response = await cFetch<IAvailability>({
    url: `/talent/services/get_availability`,
  });
  return response;
};

export const getEditAvailability = async (data: Data) => {
  const response = await cCFetch<IEditAvailability>({
    url: `/talent/services/edit_availability`,
    method: "PUT",
    data: JSON.stringify(data),
  });
  return response;
};
