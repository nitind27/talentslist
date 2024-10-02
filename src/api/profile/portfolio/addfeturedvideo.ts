import { cCFetch } from "@/api/basiApi";
import { Iprofile } from "../types";

export const addfeaturedvideo = async (
  formData: FormData
): Promise<Iprofile> => {
  const response = await cCFetch<Iprofile>({
    url: "/talent/profile/add_featured_video",
    method: "POST",
    data: JSON.stringify(Object.fromEntries(formData.entries())),
    customHeaders: {
      "Content-type": "application/json",
    },
  });

  return response.data;
};

export const addfeaturedvideoid = async (
  formData: FormData
): Promise<Iprofile> => {
  const response = await cCFetch<Iprofile>({
    url: "/talent/profile/add_playlist_video",
    method: "POST",
    data: JSON.stringify(Object.fromEntries(formData.entries())),
    customHeaders: {
      "Content-type": "application/json",
    },
  });

  return response.data;
};

export const addfeaturedaudioid = async (
  formData: FormData
): Promise<Iprofile> => {
  const response = await cCFetch<Iprofile>({
    url: "/talent/profile/add_album_audio",
    method: "POST",
    data: JSON.stringify(Object.fromEntries(formData.entries())),
    customHeaders: {
      "Content-type": "application/json",
    },
  });

  return response.data;
};

export const addfeaturedaudio = async (
  formData: FormData
): Promise<Iprofile> => {
  const response = await cCFetch<Iprofile>({
    url: "/talent/profile/add_featured_audio",
    method: "POST",
    data: JSON.stringify(Object.fromEntries(formData.entries())),
    customHeaders: {
      "Content-type": "application/json",
    },
  });

  return response.data;
};
