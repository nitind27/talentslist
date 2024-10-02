import { cCFetch } from "@/api/basiApi";

export const deleteFeaturedPhoto = async (id: string): Promise<void> => {
  await cCFetch<void>({
    url: `/talent/profile/delete_featured_photo/${id}`,
    method: "DELETE",
  });
};

export const deleteFeaturedVideo = async (id: string): Promise<void> => {
  await cCFetch<void>({
    url: `/talent/profile/delete_featured_video/${id}`,
    method: "DELETE",
  });
};

export const deletealbumsdVideoId = async (id: string): Promise<void> => {
  await cCFetch<void>({
    url: `/talent/profile/delete_playlist_video/${id}`,
    method: "DELETE",
  });
};
export const deletealbumsdAudiosId = async (id: string): Promise<void> => {
  await cCFetch<void>({
    url: `/talent/profile/delete_album_audio/${id}`,
    method: "DELETE",
  });
};

export const deleteplaylistalbums = async (id: string): Promise<void> => {
  await cCFetch<void>({
    url: `/talent/profile/delete_video_playlist/${id}`,
    method: "DELETE",
  });
};

export const deleteplaylistaudioalbums = async (id: string): Promise<void> => {
  await cCFetch<void>({
    url: `/talent/profile/delete_audio_album/${id}`,
    method: "DELETE",
  });
};

export const deleteFeaturedAudio = async (id: string): Promise<void> => {
  await cCFetch<void>({
    url: `/talent/profile/delete_featured_audio/${id}`,
    method: "DELETE",
  });
};
