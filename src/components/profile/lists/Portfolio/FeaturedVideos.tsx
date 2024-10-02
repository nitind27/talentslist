import { Iconplus } from "@/_metronic/assets/Svgicons/Svgicons/Svg14";
import { getfeaturedvideos } from "@/api/profile/get_portfolio_information";
import { Iprofile } from "@/api/profile/types";
import React, { useEffect, useState } from "react";

import { IconCross } from "@/_metronic/assets/Svgicons/Svgicons/Svg13";
import { deleteFeaturedVideo } from "@/api/profile/portfolio/deletephotos";
import AddFeaturedVideos from "./Model/AddfeturedVideos";

interface FeaturedVideoProps {
  data: any; // Adjust this type based on your actual data structure
  onDataUpdate: () => void;
}

const FeaturedVideos: React.FC<FeaturedVideoProps> = ({
  data,
  onDataUpdate,
}) => {
  const [profilesvideos, setProfilesvideos] = useState<Iprofile[]>([]);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<any>(null);

  const handleDelete = async (video: any) => {
    setVideoToDelete(video);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteFeaturedVideo(videoToDelete.id);
      const response = await getfeaturedvideos();
      setProfilesvideos(response.data);
      onDataUpdate();
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
  };

  const handleVideoAdded = async () => {
    setShowAddVideoModal(false);
    const response = await getfeaturedvideos();
    setProfilesvideos(response.data);
    onDataUpdate();
  };

  return (
    <div className="row pt-7 pb-0 px-0 mb-2">
      <AddFeaturedVideos
        show={showAddVideoModal}
        onClose={handleVideoAdded}
        onload={onDataUpdate}
      />
      <div className="col-lg-3 ">
        <label
          className="d-flex bg-secondary card-rounded cursor-pointer text-center justify-content-center"
          data-fslightbox="lightbox-basic"
          onClick={() => setShowAddVideoModal(true)}
        >
          <div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px d-flex align-items-center justify-content-center">
            <Iconplus />
          </div>
        </label>
      </div>

      {data?.map((video: any, index: any) => {
        const videoUrl = video || "";
        const adjustedVideoUrl = videoUrl.iframe.replace(
          /<iframe([^>]*)>/,
          '<iframe$1 style="height: 100%; width: 100%;">'
        );

        return (
          <div key={index} className="col-lg-3 mb-5">
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "5px",
                  zIndex: 1,
                }}
                onClick={() => handleDelete(video)}
                className="cursor-pointer"
              >
                <IconCross />
              </div>
              <div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px img-fluid img-thumbnail img-rounded">
                <div
                  dangerouslySetInnerHTML={{ __html: adjustedVideoUrl }}
                  className="card-rounded"
                  style={{ height: "175px", width: "300px" }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Confirmation Modal */}
      <div
        className={`modal fade ${showConfirmationModal ? "show" : ""}`}
        id="confirmationModal"
        tabIndex={-1}
        aria-labelledby="confirmationModalLabel"
        aria-hidden={!showConfirmationModal}
        style={{
          display: showConfirmationModal ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmationModalLabel">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={cancelDelete}
              />
            </div>
            <div className="modal-body">
              Are you sure you want to delete this featured video?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
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
    </div>
  );
};

export default FeaturedVideos;
