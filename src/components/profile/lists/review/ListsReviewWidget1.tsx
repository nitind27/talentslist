"use client";
import React, { useEffect, useState } from "react";
import { KTIcon } from "@/_metronic/helpers";
import { getprofilereviewinformation } from "@/api/profile/get_review_information";
import Image from "next/image";
import { Iprofile } from "@/api/profile/types";
import StarRatings from "react-star-ratings";
import Nofound from "@/components/nofound/Nofound";
const ListsReviewWidget1 = ({ data }: { data: any }) => {
  const [profileReview, setProfileReview] = useState<Iprofile | null>(null);

  // useEffect(() => {
  //   const fetchProfileReviewInformation = async () => {
  //     try {
  //       const data = await getprofilereviewinformation();
  //       setProfileReview(data);

  //     } catch (error) {
  //       console.error("Error fetching profile review information:", error);
  //     } finally {
  //     }
  //   };

  //   fetchProfileReviewInformation();
  // }, []);

  return (
    <div>
      {!data?.data?.review && data.data.review.length > 0 ? (
        data.data.review.map((review: any, index: number) => {
          const rating = parseFloat(review.rate ?? 0);
          return (
            <div className="card card-flush mb-5 mb-xl-10" key={index}>
              <div
                className="card-header pt-9"
                style={{
                  display: "felx",
                  flexDirection: "column",
                  gap: "15px",
                }}
                key={index}
              >
                <div className="rating">
                  <div className="rating-label checked">
                    <StarRatings
                      rating={rating}
                      starRatedColor="#FFAD0F"
                      starDimension="25px"
                      starSpacing="3px"
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div className="symbol symbol-50px me-5">
                    <Image
                      width={100}
                      height={100}
                      src={
                        review?.rate_from_user?.profile?.profile_image
                          ? `/${review.rate_from_user.profile.profile_image}`
                          : "/media/avatars/300-3.jpg"
                      }
                      alt="image"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <a
                      href="#"
                      className="text-gray-800 text-hover-primary fw-bold"
                      style={{ fontSize: "14px" }}
                    >
                      {/* {review.rate_from_user.first_name} */}
                      {review?.rate_from_user?.first_name +
                        " " +
                        review?.rate_from_user?.last_name || ""}
                    </a>
                    <span className="text-gray-400 fw-semibold d-block">
                      {review?.formatted_created_at || ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="fs-6 fw-normal text-gray-700">
                  {review?.comment || ""}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="">
          <div className="p-7">
            <div
              className="alert alert-dismissible bg-light-danger border border-dashed border-danger d-flex flex-column flex-sm-row p-5 fw-bold text-gray-600"
              id="booking_chart_error"
            >
              <i className="ki-duotone ki-search-list fs-2hx text-danger me-4 mb-5 mb-sm-0">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
              </i>

              <div className="d-flex flex-column pe-0 pe-sm-10">
                <h5 className="mb-1">Record Not Found</h5>
                <span className="alert_msg">There are no reviews.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListsReviewWidget1;
