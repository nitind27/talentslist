import React, { useState } from "react";
import { KTIcon } from "@/_metronic/helpers"; // Replace with your icon component
import {
  addfeaturedaudioid,
  addfeaturedvideoid,
} from "@/api/profile/portfolio/addfeturedvideo";
import { toast } from "react-toastify";

const AddAudiosToAlbum = ({ album_id }: { album_id: any }) => {
  const [show, setShow] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    try {
      // Construct FormData object
      const formData = new FormData();
      formData.append("album_id", album_id);
      formData.append("audio_url", videoLink);

      // Call API function
      await addfeaturedaudioid(formData);
      toast.success("Audio Add Successfully ");
      handleClose(); // Close modal on success
      setVideoLink(""); // Clear input after saving
    } catch (error) {
      toast.error("Error adding video:");
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="addAudiosToAlbumModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Audio to Album
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <p style={{ color: "#0036e3" }} className="fw-bold text-center">
                You can upload only 19 audios in this album (Maximum audio limit
                is 20)
              </p>
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
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSave}
                data-bs-dismiss="modal"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAudiosToAlbum;
