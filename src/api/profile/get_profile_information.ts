import { cCFetch, cFetch } from "../basiApi";
import { Iprofile, IReviewRequest } from "./types";

export const getprofileinformation = async (): Promise<Iprofile> => {
  const response = await cFetch<Iprofile>({
    url: "/talent/profile/get_profile_information",
    method: "GET",
  });

  return response.data;
};
export const getprofileinformationClient = async (): Promise<Iprofile> => {
  const response = await cCFetch<Iprofile>({
    url: "/talent/profile/get_profile_information",
    method: "GET",
  });

  return response.data;
};
export const getprofileappearancedata = async (): Promise<Iprofile> => {
  const response = await cCFetch<Iprofile>({
    url: "/talent/profile/get_appearance_data",
    method: "GET",
  });

  return response.data;
};

export const getprofileshare = async (): Promise<Iprofile> => {
  const response = await cCFetch<Iprofile>({
    url: "/talent/profile/get_share_profile_links",
    method: "GET",
  });

  return response.data;
};

export const getprofilereview = async (): Promise<Iprofile> => {
  const response = await cFetch<Iprofile>({
    url: "/talent/profile/review",
    method: "GET",
  });

  return response.data;
};

export const getprofilereviewpendingrequest =
  async (): Promise<IReviewRequest> => {
    const response = await cCFetch<IReviewRequest>({
      url: "/talent/profile/request_review",
      method: "GET",
    });

    return response.data;
  };

export const updateProfileInformation = async (
  formData: FormData
): Promise<Iprofile> => {
  const response = await cCFetch<Iprofile>({
    url: "/talent/profile/update_personal_information",
    method: "PUT",

    data: JSON.stringify(formData),
    customHeaders: {
      "Content-type": "application/json",
    },
  });

  return response.data;
};

export const updateProfileLocationtravel = async (
  formData: FormData
): Promise<Iprofile> => {
  const response = await cCFetch<Iprofile>({
    url: "/talent/profile/update_location_and_travel",
    method: "PUT",

    data: JSON.stringify(formData),
    customHeaders: {
      "Content-type": "application/json",
    },
  });

  return response.data;
};

export const updateProfileEducation = async (
  formData: any
): Promise<Iprofile> => {
  try {
    const response = await cCFetch<Iprofile>({
      url: "/talent/profile/update_education",
      method: "PUT",
      data: JSON.stringify(formData),
      customHeaders: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Assuming response contains the updated profile data
  } catch (error) {
    throw new Error(`Failed to update profile education:`);
  }
};

export const updateProfileExperience = async (
  formData: any
): Promise<Iprofile> => {
  try {
    const response = await cCFetch<Iprofile>({
      url: "/talent/profile/update_experience",
      method: "PUT",
      data: JSON.stringify(formData),
      customHeaders: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Assuming response contains the updated profile data
  } catch (error) {
    throw new Error(`Failed to update profile education:`);
  }
};

export const updateProfileAppearance = async (
  formData: FormData
): Promise<Iprofile> => {
  const response = await cCFetch<Iprofile>({
    url: "/talent/profile/update_appearance",
    method: "PUT",

    data: JSON.stringify(formData),
    customHeaders: {
      "Content-type": "application/json",
    },
  });

  return response.data;
};

export const updatesocialmedia = async (
  formData: FormData
): Promise<Iprofile> => {
  const response = await cCFetch<Iprofile>({
    url: "/talent/profile/update_social_media",
    method: "PUT",

    data: JSON.stringify(formData),
    customHeaders: {
      "Content-type": "application/json",
    },
  });

  return response.data;
};
