import { ApiResponse } from "@/api/basiApi";
import { Iprofile } from "../types";
import { getSession } from "next-auth/react";
import axios from "axios";

export const addfeaturedphoto = async (
  data: File
): Promise<ApiResponse<Iprofile>> => {
  const session = await getSession();
  const formData = new FormData();
  formData.append("featured_images_url", data);
  const response: ApiResponse<Iprofile> = {
    error: false,
    data: {} as Iprofile,
    statusCode: -1,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/talent/profile/add_featured_photo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (res.data) {
      response.data = res.data.data;
      response.statusCode = res.status;
      return response;
    }
    response.error = true;
    return response;
  } catch (error) {
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as Iprofile;
    return response;
  }
};

export const updateProfileImage = async (
  data: File
): Promise<ApiResponse<Iprofile>> => {
  const session = await getSession();
  const formData = new FormData();
  formData.append("profile_image", data);
  formData.append("_method", "PUT"); // Add the _method parameter

  const response: ApiResponse<Iprofile> = {
    error: false,
    data: {} as Iprofile,
    statusCode: -1,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/talent/profile/update_profile_picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );

    if (res.data) {
      response.data = res.data.data;
      response.statusCode = res.status;
      return response;
    }

    response.error = true;
    return response;
  } catch (error) {
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as Iprofile;
    console.error("Error updating profile image:", error);
    return response;
  }
};
export const addphotosalbums = async (
  album_id: string,
  photo: File
): Promise<ApiResponse<Iprofile>> => {
  const session = await getSession();
  const formData = new FormData();
  formData.append("album_id", album_id);
  formData.append("photo", photo);
  const response: ApiResponse<Iprofile> = {
    error: false,
    data: {} as Iprofile,
    statusCode: -1,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/talent/profile/add_album_photos`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (res.data) {
      response.data = res.data.data;
      response.statusCode = res.status;
      return response;
    }
    response.error = true;
    return response;
  } catch (error) {
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as Iprofile;
    return response;
  }
};

export const addvideosalbumsid = async (
  album_id: string,
  photo: File
): Promise<ApiResponse<Iprofile>> => {
  const session = await getSession();
  const formData = new FormData();
  formData.append("album_id", album_id);
  formData.append("photo", photo);
  const response: ApiResponse<Iprofile> = {
    error: false,
    data: {} as Iprofile,
    statusCode: -1,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/talent/profile/add_album_photos`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (res.data) {
      response.data = res.data.data;
      response.statusCode = res.status;
      return response;
    }
    response.error = true;
    return response;
  } catch (error) {
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as Iprofile;
    return response;
  }
};

export const addfeaturedphotoalbums = async (
  name: string,
  image: File
): Promise<ApiResponse<Iprofile>> => {
  const session = await getSession();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  const response: ApiResponse<Iprofile> = {
    error: false,
    data: {} as Iprofile,
    statusCode: -1,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/talent/profile/add_photo_album`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (res.data) {
      response.data = res.data.data;
      response.statusCode = res.status;
      return response;
    }
    response.error = true;
    return response;
  } catch (error) {
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as Iprofile;
    return response;
  }
};

export const addfeaturedvideosalbums = async (
  name: string,
  image: File
): Promise<ApiResponse<Iprofile>> => {
  const session = await getSession();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  const response: ApiResponse<Iprofile> = {
    error: false,
    data: {} as Iprofile,
    statusCode: -1,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/talent/profile/add_video_playlist`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (res.data) {
      response.data = res.data.data;
      response.statusCode = res.status;
      return response;
    }
    response.error = true;
    return response;
  } catch (error) {
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as Iprofile;
    return response;
  }
};

export const addfeaturedaudioalbums = async (
  name: string,
  image: File
): Promise<ApiResponse<Iprofile>> => {
  const session = await getSession();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  const response: ApiResponse<Iprofile> = {
    error: false,
    data: {} as Iprofile,
    statusCode: -1,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/talent/profile/add_audio_album`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (res.data) {
      response.data = res.data.data;
      response.statusCode = res.status;
      return response;
    }
    response.error = true;
    return response;
  } catch (error) {
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as Iprofile;
    return response;
  }
};
export const updatePhotocover = async (
  album_id: string,
  title: string,
  data: File | string
): Promise<ApiResponse<Iprofile>> => {
  const session = await getSession();
  const formData = new FormData();
  if (data instanceof File) {
    formData.append("image", data);
  }

  formData.append("name", title);
  formData.append("_method", "PUT"); // Add the _method parameter

  const response: ApiResponse<Iprofile> = {
    error: false,
    data: {} as Iprofile,
    statusCode: -1,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/talent/profile/edit_photo_album/${album_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );

    if (res.data) {
      response.data = res.data.data;
      response.statusCode = res.status;
      return response;
    }

    response.error = true;
    return response;
  } catch (error) {
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as Iprofile;
    console.error("Error updating photo cover:", error);
    return response;
  }
};

export const updateVideocover = async (
  album_id: string,
  title: string,
  data: File | string
): Promise<ApiResponse<Iprofile>> => {
  const session = await getSession();
  const formData = new FormData();
  if (data instanceof File) {
    formData.append("image", data);
  }

  formData.append("name", title);
  formData.append("_method", "PUT"); // Add the _method parameter

  const response: ApiResponse<Iprofile> = {
    error: false,
    data: {} as Iprofile,
    statusCode: -1,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/talent/profile/edit_video_playlist/${album_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );

    if (res.data) {
      response.data = res.data.data;
      response.statusCode = res.status;
      return response;
    }

    response.error = true;
    return response;
  } catch (error) {
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as Iprofile;
    console.error("Error updating photo cover:", error);
    return response;
  }
};

export const updateAudiocover = async (
  album_id: string,
  title: string,
  data: File | string
): Promise<ApiResponse<Iprofile>> => {
  const session = await getSession();
  const formData = new FormData();
  if (data instanceof File) {
    formData.append("image", data);
  }

  formData.append("name", title);
  formData.append("_method", "PUT"); // Add the _method parameter

  const response: ApiResponse<Iprofile> = {
    error: false,
    data: {} as Iprofile,
    statusCode: -1,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/talent/profile/edit_audio_album/${album_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );

    if (res.data) {
      response.data = res.data.data;
      response.statusCode = res.status;
      return response;
    }

    response.error = true;
    return response;
  } catch (error) {
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as Iprofile;
    console.error("Error updating photo cover:", error);
    return response;
  }
};
