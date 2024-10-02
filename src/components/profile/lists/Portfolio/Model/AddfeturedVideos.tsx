import React, { useState } from "react";
import { KTIcon } from "@/_metronic/helpers";
import { addfeaturedvideo } from "@/api/profile/portfolio/addfeturedvideo";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface AddFeaturedVideosProps {
  show: boolean;
  onClose: () => void;
  onload: () => void;
}

const AddFeaturedVideos: React.FC<AddFeaturedVideosProps> = ({
  show,
  onClose,
  onload,
}) => {
  const [videoLink, setVideoLink] = useState("");

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    video: Yup.string()
      .test("is-url-or-iframe", "Invalid video link format", (value: any) => {
        if (!value) return false;
        // Check if it's a URL or contains <iframe> tag
        return (
          Yup.string().url().isValidSync(value) || value.includes("<iframe")
        );
      })
      .required("Video link is required"),
    // .max(8, "You can only add up to 8 videos"),
  });

  const handleSave = async () => {
    try {
      // Check if videoLink is empty
      if (!videoLink.trim()) {
        throw new Error("Video link cannot be empty");
      }

      // Validate input using Yup schema
      await validationSchema.validate({ video: videoLink });

      // Form data preparation
      const formData = new FormData();
      formData.append("video", videoLink);

      // Call API to add featured video
      const res = await addfeaturedvideo(formData);
      onClose();
      onload();
      if (res.status) {
        // Reset input and close modal
        setVideoLink("");
        toast.success("Video link added successfully");
      } else {
        toast.error(res.message);
      }

      // Show success toast notification
    } catch (error: any) {
      // Handle validation errors or API errors
      console.error("Error uploading video:", error);

      // Show error toast notification
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      id="addfeaturedvideo"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!show}
      style={{
        display: show ? "block" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add New Video
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <label htmlFor="videoLink" className="float-right">
                PASTE LINK / EMBED CODE{" "}
                <KTIcon
                  iconName="youtube"
                  iconType="duotone"
                  className="fs-2"
                />
              </label>
              <textarea
                id="videoLink"
                className="form-control"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleSave}
            >
              ADD
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFeaturedVideos;
