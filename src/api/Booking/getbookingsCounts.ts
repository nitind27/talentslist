import { cCFetch, cFetch } from "../basiApi";
import {
  IAcceptbooking,
  IBookingAllData,
  IBookingCode,
  IBookingData,
  Ibookingcount,
} from "./types";

export const getbookingsCounts = async (): Promise<Ibookingcount> => {
  const response = await cFetch<Ibookingcount>({
    url: `/talent/bookings/counts`,
    method: "GET",
  });
  return response.data;
};

export const getbookingsData = async ({
  sorting,
  sorting_order,
  search,
  date,
  page,
  per_page,
  booking_status,
}: {
  sorting?: string;
  sorting_order?: string;
  search?: string;
  date?: string;
  page?: string | number;
  per_page?: string | number;
  booking_status?: string | number;
}) => {
  const queryString = `?sorting=${sorting}&sorting_order=${sorting_order}&search=${search}&page=${page}&per_page=${per_page}&booking_status=${booking_status}`;
  const response = await cFetch<IBookingData>({
    url:
      `/talent/bookings` +
      `?page=${page}&per_page=${per_page}&date=${date}&booking_status=${booking_status}`,
    method: "GET",
  });

  if (response.error) {
    return {
      current_page: 1,
      data: [],
      first_page_url: "",
      from: 1,
      last_page: 1,
      last_page_url: "",
      links: [],
      next_page_url: "",
      path: "",
      per_page: 1,
      prev_page_url: null,
      to: 1,
      total: 1,
      count: 0,
    } as IBookingData;
  }
  return response.data;
};

export const getbookingsCode = async (booking_code: number | string) => {
  const response = await cFetch<IBookingCode>({
    url: `/talent/booking/${booking_code}`,
    method: "GET",
  });
  return response;
};

export const updateAcceptbooking = async (bookingCode: number) => {
  const response = await cCFetch<IAcceptbooking>({
    url: `/talent/accept_booking`,
    data: JSON.stringify({ booking_code: bookingCode }),
    method: "PUT",
  });
  return response;
};

export const updateRejectbooking = async (
  booking_code: number,
  reject_reason: string
) => {
  const response = await cCFetch<IAcceptbooking>({
    url: `/talent/reject_booking`,
    data: JSON.stringify({ booking_code, reject_reason }),
    method: "PUT",
  });
  return response;
};
