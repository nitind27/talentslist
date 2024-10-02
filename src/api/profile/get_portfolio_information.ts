import { cCFetch, cFetch } from "../basiApi";
import { Icover, Iprofile } from "./types";

export const getfeaturedphotos = async () => {
  const response = await cCFetch<Iprofile>({
    url: `/talent/profile/get_featured_photos`,
  });
  return response.data;
};

export const getphotoalbums = async () => {
  const response = await cCFetch<Iprofile>({
    url: `/talent/profile/get_photo_albums`,
  });
  return response.data;
};

export const getphotoalbumsphotos = async (album_id: string) => {
  const response = await cCFetch<Iprofile>({
    url: `/talent/profile/get_photos_by_album_id?album_id=${album_id}`,
  });

  return response.data;
};

export const getvideosalbumsvideos = async (album_id: string) => {
  const response = await cCFetch<Iprofile>({
    url: `/talent/profile/get_videos_by_playlist_id?album_id=${album_id}`,
  });

  return response.data;
};
export const getaudiosalbumsvideos = async (album_id: string) => {
  const response = await cCFetch<Iprofile>({
    url: `/talent/profile/get_audios_by_album_id?album_id=${album_id}`,
  });

  return response.data;
};

export const getfeaturedvideos = async () => {
  const response = await cCFetch<Iprofile>({
    url: `/talent/profile/get_featured_videos`,
  });
  return response.data;
};

export const getvideosplaylist = async () => {
  const response = await cCFetch<Iprofile>({
    url: `/talent/profile/get_videos_playlist`,
  });
  return response.data;
};

export const getfeaturedaudios = async () => {
  const response = await cCFetch<Iprofile>({
    url: `/talent/profile/get_featured_audios`,
  });
  return response.data;
};
export const getaudioalbums = async () => {
  const response = await cCFetch<Iprofile>({
    url: `/talent/profile/get_audio_albums`,
  });
  return response.data;
};

export const getphotoalbumbyalbumid = async (
  album_id: string
): Promise<Icover> => {
  const response = await cCFetch<Icover>({
    url: `/talent/profile/get_photo_album_by_album_id?album_id=${album_id}`,
  });

  return response.data;
};

export const getvideoalbumbyalbumid = async (
  album_id: string
): Promise<Icover> => {
  const response = await cCFetch<Icover>({
    url: `/talent/profile/get_video_playlist_by_playlist_id?album_id=${album_id}`,
  });

  return response.data;
};

export const getaudioalbumbyalbumid = async (
  album_id: string
): Promise<Icover> => {
  const response = await cCFetch<Icover>({
    url: `/talent/profile/get_audio_album_by_album_id?album_id=${album_id}`,
  });

  return response.data;
};
