import React from "react";
import { CardsWidget17 } from "./CardsWidget17";
import Link from "next/link";
import {
  Booking_Count,
  Booking_Earning,
  Booking_Reviews,
  Booking_Service,
  Profile_Completion,
} from "@/api/Dashboard/Dashboard";
import { KTIcon } from "@/_metronic/helpers";
import { getprofileinformation } from "@/api/profile/get_profile_information";

const Dashboard4card = async () => {
  const response = await Booking_Earning();
  const earningData = response.data;

  const serviceResponse = await Booking_Service();
  const serviceData = serviceResponse.data;

  const reviewsResponse = await Booking_Reviews();
  const reviewsData = reviewsResponse.data;
  const reviewCounts = reviewsData?.ratings;

  const bookingresponse = await Booking_Count();
  const countdata = bookingresponse.data;

  return (
    <div className="row g-5 g-xl-10 ">
      <div className="col-xl-6 col-lg-6 col-md-12 mt-0  col-12 ">
        <div className="card card-flush h-md-50  mb-xl-10">
          <div className="card-header pt-5">
            <div className="card-title d-flex flex-column">
              <div className="d-flex align-items-center">
                <span className="fs-4 fw-semibold text-gray-300 align-self-start me-1">
                  $
                </span>
                <span className="fs-1 fw-bold ms-1 lh-1 ls-n2">
                  {earningData?.all_time || 0}
                </span>
              </div>
              <span className="text-gray-300 pt-1 fw-semibold fs-6">
                Booking earnings
              </span>
            </div>
          </div>
          <div className="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
            <div className="d-flex flex-column content-justify-center flex-row-fluid">
              <div className="d-flex fw-semibold align-items-center">
                <div className="bullet w-8px h-3px rounded-2 bg-skyblue me-3"></div>
                <div className="text-gray-300 flex-grow-1 me-4">This month</div>
                <div className="fw-bolder text-gray-700 text-xxl-end">
                  {earningData?.this_month || 0}
                </div>
              </div>
              <div className="d-flex fw-semibold align-items-center my-3">
                <div className="bullet w-8px h-3px rounded-2 bg-blue me-3"></div>
                <div className="text-gray-300 flex-grow-1 me-4">
                  {" "}
                  Last month
                </div>
                <div className="fw-bolder text-gray-700 text-xxl-end">
                  {earningData?.last_month || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-flush h-md-50 mb-5 mb-xl-10">
          <div className="card-header pt-5">
            <div className="card-title d-flex flex-column">
              <div className="d-flex align-items-center">
                <span className="fs-2 text-gray-900 fw-bold text-dark me-2 lh-1 ls-n2">
                  {reviewsData?.total.count || 0}
                </span>
              </div>
              <span className="text-gray-300 pt-1 fw-semibold fs-6">
                Reviews
              </span>
            </div>
          </div>
          <div className="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
            <div className="d-flex flex-column content-justify-center flex-row-fluid">
              <div className="d-flex fw-semibold align-items-center">
                <div className="text-gray-500 flex-grow-1 me-4">
                  <div className="rating">
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>

                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="fw-bolder text-gray-700 text-xxl-end">
                  {reviewCounts && reviewCounts[5] ? reviewCounts[5].count : 0}
                </div>
              </div>
              <div className="d-flex fw-semibold align-items-center">
                <div className="text-gray-500 flex-grow-1 me-4">
                  <div className="rating">
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>

                    <div className="rating-label">
                      <i className="ki-duotone ki-star fs-6"></i>
                    </div>
                  </div>
                </div>
                <div className="fw-bolder text-gray-700 text-xxl-end">
                  {reviewCounts && reviewCounts[4] ? reviewCounts[4].count : 0}
                </div>
              </div>
              <div className="d-flex fw-semibold align-items-center">
                <div className="text-gray-500 flex-grow-1 me-4">
                  <div className="rating">
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                    <div className="rating-label">
                      <i className="ki-duotone ki-star fs-6"></i>
                    </div>
                    <div className="rating-label">
                      <i className="ki-duotone ki-star fs-6"></i>
                    </div>
                  </div>
                </div>
                <div className="fw-bolder text-gray-700 text-xxl-end">
                  {reviewCounts && reviewCounts[3] ? reviewCounts[3].count : 0}
                </div>
              </div>
              <div className="d-flex fw-semibold align-items-center">
                <div className="text-gray-500 flex-grow-1 me-4">
                  <div className="rating">
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                    <div className="rating-label">
                      <i className="ki-duotone ki-star fs-6"></i>
                    </div>
                    <div className="rating-label">
                      <i className="ki-duotone ki-star fs-6"></i>
                    </div>
                    <div className="rating-label">
                      <i className="ki-duotone ki-star fs-6"></i>
                    </div>
                  </div>
                </div>
                <div className="fw-bolder text-gray-700 text-xxl-end">
                  {reviewCounts && reviewCounts[2] ? reviewCounts[2].count : 0}
                </div>
              </div>
              <div className="d-flex fw-semibold align-items-center">
                <div className="text-gray-500 flex-grow-1 me-4">
                  <div className="rating">
                    <div className="rating-label checked">
                      <i
                        className="ki-duotone ki-star fs-6"
                        style={{ color: "#ffbf00" }}
                      ></i>
                    </div>
                    <div className="rating-label">
                      <i className="ki-duotone ki-star fs-6"></i>
                    </div>
                    <div className="rating-label">
                      <i className="ki-duotone ki-star fs-6"></i>
                    </div>
                    <div className="rating-label">
                      <i className="ki-duotone ki-star fs-6"></i>
                    </div>
                    <div className="rating-label">
                      <i className="ki-duotone ki-star fs-6"></i>
                    </div>
                  </div>
                </div>
                <div className="fw-bolder text-gray-700 text-xxl-end">
                  {reviewCounts && reviewCounts[1] ? reviewCounts[1].count : 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6  mt-0 col-md-12 col-12 ">
        <CardsWidget17
          className="h-md-50 mb-5 mb-xl-10"
          countData={countdata}
        />
        <div className="card card-flush h-md-50 mb-5 mb-xl-10">
          <div className="card-header pt-5">
            <div className="card-title d-flex flex-column">
              <div className="d-flex align-items-center">
                <span className="fs-1 fw-bold ms-1 lh-1 ls-n2">
                  {serviceData?.all || 0}
                </span>
              </div>
              <span className="text-gray-300 pt-1 fw-semibold fs-6">
                Services
              </span>
            </div>
          </div>
          <div className="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
            <div className="d-flex flex-column content-justify-center flex-row-fluid">
              <div className="d-flex fw-semibold align-items-center">
                <div className="bullet w-8px h-3px rounded-2 bg-skyblue me-3"></div>
                <div className="text-gray-300 flex-grow-1 me-4">
                  Active Service
                </div>
                <div className="fw-bolder text-gray-700 text-xxl-end">
                  {serviceData?.active || 0}
                </div>
              </div>
              <div className="d-flex fw-semibold align-items-center my-3">
                <div className="bullet w-8px h-3px rounded-2 bg-blue me-3"></div>
                <div className="text-gray-300 flex-grow-1 me-4">
                  Inactive Service
                </div>
                <div className="fw-bolder text-gray-700 text-xxl-end">
                  {serviceData?.inactive || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard4card;
