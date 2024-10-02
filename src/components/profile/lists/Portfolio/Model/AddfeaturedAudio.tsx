import React, { useState } from "react";
import { KTIcon } from "@/_metronic/helpers";
import { addfeaturedaudio } from "@/api/profile/portfolio/addfeturedvideo";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddFeaturedAudio = ({
  onAudioAdded,
  onload,
}: {
  onAudioAdded: () => void;
  onload: () => void;
}) => {
  const [audiolink, setAudioLink] = useState("");

  const validationSchema = Yup.object().shape({
    audiolink: Yup.string().required("Audio link is required"),
  });

  const handleSave = async () => {
    try {
      await validationSchema.validate({ audiolink }, { abortEarly: false });

      const formData = new FormData();
      formData.append("audio", audiolink);

      const res = await addfeaturedaudio(formData);
      closeModal();
      onAudioAdded(); // Notify parent component to refresh data
      if (res.status) {
        toast.success(res.message);
        onload();
        setAudioLink("");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((validationError) => {
          toast.error(validationError.message);
        });
      } else {
        console.error("Error uploading audio:", error);
        toast.error("Error uploading audio");
      }
    }
  };

  const closeModal = () => {
    const modal = document.querySelector("#addfeaturedaudio");
    if (modal) {
      (modal as any).classList.remove("show");
      (modal as any).style.display = "none";
      document.body.classList.remove("modal-open");
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="addfeaturedaudio"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Audio
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <label htmlFor="audioLink" className="float-right">
                  PASTE LINK / EMBED CODE{" "}
                  <KTIcon
                    iconName="youtube"
                    iconType="duotone"
                    className="fs-2"
                  />
                </label>
                <textarea
                  id="audioLink"
                  className="form-control"
                  value={audiolink}
                  onChange={(e) => setAudioLink(e.target.value)}
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
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFeaturedAudio;
