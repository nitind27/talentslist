import { cCFetch } from "@/api/basiApi";

export const deletephotoalbum = async (id: string): Promise<void> => {
  await cCFetch<void>({
    url: `/talent/profile/delete_photo_album/${id}`,
    method: "DELETE",
  });
};

export const deletealbumphoto = async (id: string): Promise<void> => {
  await cCFetch<void>({
    url: `/talent/profile/delete_album_photo/${id}`,
    method: "DELETE",
  });
};
