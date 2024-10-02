import { cCFetch } from "@/api/basiApi";

export const deleterequestreview = async (ids: number[]): Promise<void> => {
  try {
    await cCFetch<void>({
      url: `/talent/profile/delete_request_review`,
      method: "DELETE",
      data: JSON.stringify({ id: ids }),
    });
  } catch (error) {
    throw new Error(`Failed to delete reviews: `);
  }
};
