"use client";
import { KTIcon } from "@/_metronic/helpers";
import { getprofilereviewinformation } from "@/api/profile/get_review_information";
import { Iprofile } from "@/api/profile/types";
import Link from "next/link";
import { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";

interface Rating {
  id: number;
  value: number;
}

interface ReviewCardProps {
  averageRating: number;
  totalReviews: number;
}

const ReviewCard = ({ reviews }: { reviews: any }) => {
  const [profileReview, setProfileReview] = useState<Iprofile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileReviewInformation = async () => {
      try {
        const data = await getprofilereviewinformation();
        setProfileReview(data);
      } catch (error) {
        console.error("Error fetching profile review information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileReviewInformation();
  }, []);

  const calculateProgressBarWidth = (count: number) => {
    const totalReviews = profileReview?.data?.count || 1; // Avoid division by zero
    return (count / totalReviews) * 100;
  };

  return (
    <div className="card mb-10">
      <div className="card-header">
        <div className="card-title m-0">
          <h4 className=" m-0 d-flex gap-3">
            <KTIcon
              iconName="medal-star"
              iconType="duotone"
              className="fs-1 me-2 "
            />
            Reviews
          </h4>
        </div>
        <div className="card-toolbar">
          <button
            className="btn btn-icon btn-color-gray-400
             btn-active-color-primary justify-content-end align-items-center"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-overflow="true"
          >
            <KTIcon
              iconName="dots-horizontal"
              iconType="solid"
              className="fs-2x "
            />
          </button>
          <div
            className="menu  menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px"
            data-kt-menu="true"
          >
            <div className="menu-item px-3">
              <Link href="#" className="menu-link px-3">
                Manage reviews
              </Link>
            </div>
            <div className="menu-item px-3">
              <Link href="#" className="menu-link px-3">
                Share review form
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body p-9">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-gray-800 fw-bold fs-1">
              {reviews?.data?.average_rate || "0"}
            </span>
            <span className="text-muted d-block fw-semibold">
              <div className="rating justify-content-center">
                <StarRatings
                  rating={reviews?.data?.average_rate}
                  starRatedColor="#FFAD0F"
                  starDimension="25px"
                  starSpacing="3px"
                />
              </div>
            </span>
            <span className="text-gray-400 fw-semibold d-block">
              {reviews?.data?.count || "0"} reviews
            </span>
            <div className="rating_stars mt-3 w-100">
              {reviews?.data?.rate_counts &&
                Object.entries(reviews.data?.rate_counts)
                  .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Sort in descending order
                  .map(([rating, count]: [string, any]) => (
                    <div
                      className="rating_star d-flex align-items-center"
                      key={rating}
                    >
                      <div className="h-5px me-3 w-50 bg-secondary ">
                        <div
                          className="bg-blue rounded h-5px"
                          role="progressbar"
                          style={{
                            width: `${calculateProgressBarWidth(count)}%`,
                          }}
                          aria-valuenow={count}
                          aria-valuemin={0}
                          aria-valuemax={reviews?.data?.count}
                        ></div>
                      </div>
                      <div className="rating">
                        <div className="rating-label checked">
                          <div key={rating} className="star-wrapper">
                            <StarRatings
                              rating={parseInt(rating)} // Reverse the rating
                              starRatedColor="#FFAD0F"
                              starDimension="25px"
                              starSpacing="3px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
