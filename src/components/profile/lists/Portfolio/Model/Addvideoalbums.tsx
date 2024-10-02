import React, { useState } from "react";
import { KTIcon } from "@/_metronic/helpers"; // Replace with your icon component
import { addfeaturedvideoid } from "@/api/profile/portfolio/addfeturedvideo";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AddVideosToAlbum = ({
  album_id,
  data,
  onAlbumAdded,
}: {
  album_id: any;
  data: any;
  onAlbumAdded: () => void;
}) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      videoLink: "",
    },
    validationSchema: Yup.object({
      videoLink: Yup.string().required("Video link is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (data.data.length >= 20) {
          toast.error("Maximum 20 videos are allowed in this album.");
          setSubmitting(false);
          return;
        }

        const formData = new FormData();
        formData.append("album_id", album_id);
        formData.append("video_url", values.videoLink);

        const res = await addfeaturedvideoid(formData);
        if (res.status) {
          toast.success("Video added successfully!");
          onAlbumAdded();
          router.refresh();
        } else {
          toast.error("Failed to add video!");
        }

        handleClose();
        formik.resetForm();
      } catch (error) {
        console.error("Error adding video:", error);
        // toast.error("Failed to add video.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="modal fade"
        id="addVideosToAlbumModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Video to Album
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
                You can upload up to 20 videos in this album.
              </p>
              <form onSubmit={formik.handleSubmit}>
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
                    value={formik.values.videoLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  {formik.touched.videoLink && formik.errors.videoLink ? (
                    <div className="text-danger">{formik.errors.videoLink}</div>
                  ) : null}
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
                    type="submit"
                    className="btn btn-primary btn-sm"
                    data-bs-dismiss="modal"
                    disabled={formik.isSubmitting}
                  >
                    Add Video
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVideosToAlbum;
