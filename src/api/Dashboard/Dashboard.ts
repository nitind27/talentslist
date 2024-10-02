import { cCFetch, cFetch } from "../basiApi";
import {
  IDashboardBookingAvailabilityResponse,
  IDashboardBookingRevenueResponse,
  IDashboardEarningCountResponse,
  IDashboardEarningResponse,
  IDashboardEarningServiceResponse,
  IDashboardProfileResponse,
  IDashboardReviewsResponse,
} from "./types";

export const Booking_Earning = async (): Promise<IDashboardEarningResponse> => {
  const response = await cFetch<IDashboardEarningResponse>({
    url: "/talent/dashboard/get_booking_earnings",
    method: "GET",
  });
  return response.data;
};

export const Booking_Count =
  async (): Promise<IDashboardEarningCountResponse> => {
    const response = await cFetch<IDashboardEarningCountResponse>({
      url: "/talent/dashboard/get_bookings_count",
      method: "GET",
    });
   
    return response.data;
  };

export const Booking_Service =
  async (): Promise<IDashboardEarningServiceResponse> => {
    const response = await cFetch<IDashboardEarningServiceResponse>({
      url: "/talent/dashboard/get_services_count",
      method: "GET",
    });
   
    return response.data;
  };

export const Booking_Reviews = async (): Promise<IDashboardReviewsResponse> => {
  const response = await cFetch<IDashboardReviewsResponse>({
    url: "/talent/dashboard/get_reviews_count",
    method: "GET",
  });
 
  return response.data;
};


type TimePeriod = 'daily' | 'weekly' | 'monthly';

export const Booking_Revenue = async (period: TimePeriod): Promise<IDashboardBookingRevenueResponse> => {
  console.log("period", period)
  const response = await cCFetch<IDashboardBookingRevenueResponse>({
    url: `/talent/dashboard/get_booking_revenue/${period}`,
  });
  console.log('Response:', response);
  return response.data;
};


export const Profile_Completion = async () => {
  const response = await cFetch<IDashboardProfileResponse>({
    url: "/talent/dashboard/get_profile_completion",
  });
  return response;
};

export const Booking_Availability = async () => {
  const response = await cFetch<IDashboardBookingAvailabilityResponse>({
    url: "/talent/dashboard/get_availability",
  });
  return response;
};
