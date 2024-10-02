import { getfeaturedaudios } from "@/api/profile/get_portfolio_information";
import { Iprofile } from "@/api/profile/types";
import React, { useEffect, useState } from "react";
import AddFeaturedAudio from "./Model/AddfeaturedAudio";
import { IconCross } from "@/_metronic/assets/Svgicons/Svgicons/Svg13";
import { deleteFeaturedAudio } from "@/api/profile/portfolio/deletephotos";
import { Iconplus } from "@/_metronic/assets/Svgicons/Svgicons/Svg14";
import { toast } from "react-toastify";

interface FeaturedAdudioProps {
  data: any; // Adjust this type based on your actual data structure
  onDataUpdate: () => void;
}

const FeatureAudio: React.FC<FeaturedAdudioProps> = ({
  data,
  onDataUpdate,
}) => {
  const [featuredaudio, setFeaturedAudio] = useState<Iprofile[]>([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [audioToDelete, setAudioDelete] = useState<any>(null);

  const fetchProfileInformation = async () => {
    try {
      const response = await getfeaturedaudios();
      setFeaturedAudio(response.data);
    } catch (error) {
      console.error("Error fetching featured audios:", error);
    }
  };

  useEffect(() => {
    fetchProfileInformation();
  }, []);

  const handleDelete = async (audioId: any) => {
    setAudioDelete(audioId);
    setShowConfirmationModal(true);
    onDataUpdate();
  };

  const confirmDelete = async () => {
    try {
      await deleteFeaturedAudio(audioToDelete);
      toast.success("Featured Audio has been successfully Deleted.");
      onDataUpdate();
      fetchProfileInformation(); // Refresh audios after deleting
      setShowConfirmationModal(false);
    } catch (error) {
      toast.error("Error deleting audio:");
    }
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
      <AddFeaturedAudio
        onAudioAdded={fetchProfileInformation}
        onload={onDataUpdate}
      />
      <div className="row pt-7 pb-0 px-0 mb-2">
        <div className="col-lg-3 ">
          <label
            className="d-flex bg-secondary card-rounded cursor-pointer text-center justify-content-center"
            data-fslightbox="lightbox-basic"
            htmlFor="file"
            style={{ width: "100%", height: "175px" }}
            data-bs-toggle="modal"
            data-bs-target="#addfeaturedaudio"
          >
            <div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px d-flex align-items-center justify-content-center">
              <Iconplus />
            </div>
          </label>
        </div>
        {data?.map((audio: any, index: any) => {
          const audioUrl = audio.audio || "";
          const adjustedAudioUrl = audioUrl.replace(
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
                    right: "10px",
                    zIndex: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(audio.id)}
                >
                  <IconCross />
                </div>
                <div className="card card-custom gutter-b">
                  <div className="">
                    <div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px">
                      <div
                        dangerouslySetInnerHTML={{ __html: adjustedAudioUrl }}
                        className="card-rounded"
                        style={{ height: "100%", width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
              Are you sure you want to delete this featured audio?
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
    </>
  );
};

export default FeatureAudio;
