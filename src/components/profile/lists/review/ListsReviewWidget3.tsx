import React, { useState } from "react";
import { KTIcon } from "@/_metronic/helpers";
import Image from "next/image";
import Link from "next/link";
import { UncontrolledTooltip } from "reactstrap";
import { toast } from "react-toastify";
import { deleterequestreview } from "@/api/profile/review/deleterequest";

interface ReviewItem {
  clientName: string;
  email: string;
  eventName: string;
  avatarSrc: string;
}

interface RequestReviewProps {
  reviews: any; // Adjust this type based on your actual data structure
  onDataUpdate: () => void;
}

const ListsReviewWidget3: React.FC<RequestReviewProps> = ({
  reviews,
  onDataUpdate,
}) => {
  const [selectedReviews, setSelectedReviews] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  const handleCheckboxChange = (id: number) => {
    if (selectedReviews.includes(id)) {
      setSelectedReviews(selectedReviews.filter((item) => item !== id));
    } else {
      setSelectedReviews([...selectedReviews, id]);
    }
  };
  const handleDeleteClick = (ids: number[]) => {
    setSelectedReviews(ids); // Set selected reviews for deletion
    setShowDeleteModal(true); // Show delete confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await deleterequestreview(selectedReviews);
      toast.success("Reviews have been successfully deleted.");
      onDataUpdate();
    } catch (error) {
      console.error("Error deleting reviews:", error);
      toast.error("Failed to delete reviews.");
    }
    setShowDeleteModal(false);
    setSelectedReviews([]); // Clear selected reviews after deletion
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

  return (
    <>
      <div className="card mb-5 mb-xl-10">
        <div className="card-header">
          <div className="card-title align-items-center gap-3">
            <h4 className="card-title align-items-center gap-3">
              <KTIcon
                iconName="information-5"
                iconType="duotone"
                className="fs-2 "
              />
              <div className="d-flex flex-column">
                <span className="card-label fw-bold text-gray-900">
                  Add new request
                </span>
                <span className="text-muted mt-1 fw-semibold fs-7">
                  You can add 3 requests
                </span>
              </div>
            </h4>
          </div>

          <div className="card-toolbar">
            {selectedReviews.length > 0 && (
              <button
                type="button"
                className="btn btn-sm btn-icon btn-bg-light btn-active-color-danger menu-dropdown"
                onClick={() => handleDeleteClick(selectedReviews)}
                id="DeleteReviews"
              >
                <KTIcon iconName="trash" iconType="duotone" className="fs-4" />
                <UncontrolledTooltip
                  delay={0}
                  placement="top"
                  target="DeleteReviews"
                >
                  Delete Selected Reviews
                </UncontrolledTooltip>
              </button>
            )}
            <button
              type="button"
              className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary menu-dropdown"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-flip="top-end"
              id="Addrequest"
            >
              <Link href="/requestreview">
                <KTIcon iconName="plus" iconType="duotone" className="fs-4" />
                <UncontrolledTooltip
                  delay={0}
                  placement="top"
                  target="Addrequest"
                >
                  Add Request
                </UncontrolledTooltip>
              </Link>
            </button>
          </div>
        </div>

        <div className="card-body p-9">
          <div className="table-responsive">
            <table className="table table-row-dashed align-middle gs-0 gy-3 my-0">
              <thead>
                <tr className="fs-7 fw-bold text-gray-500 border-bottom-0">
                  <th className="p-0 pb-3 min-w-175px text-start">Client</th>
                  <th className="p-0 pb-3 min-w-100px text-end">Event name</th>
                </tr>
              </thead>
              <tbody>
                {reviews?.data.map((review: any) => (
                  <tr key={review.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input widget-9-check"
                          style={{ transform: "scale(0.8)" }}
                          onChange={() => handleCheckboxChange(review.id)}
                          checked={selectedReviews.includes(review.id)}
                        />

                        <div className="symbol symbol-50px me-3">
                          <Image
                            width={100}
                            height={100}
                            src={review.client.client_profile_image}
                            className=""
                            alt=""
                          />
                        </div>
                        <div className="d-flex justify-content-start flex-column">
                          <a
                            href="#"
                            className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                          >
                            {review.client_name}
                          </a>
                          <span className="text-gray-500 fw-semibold d-block fs-8">
                            {review.client_email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end pe-0">
                      <span className="text-gray-600 fw-bold fs-6">
                        {review.event_name}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this review?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListsReviewWidget3;
