import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import ProfileAlbum from "./ProfileAlbum";
import {
  addfeaturedphotoalbums,
  addfeaturedvideosalbums,
} from "@/api/profile/portfolio/addfeaturedphotos";
import { toast } from "react-toastify";

interface PhotoCoverProps {
  onAlbumAdded: () => void;

  data: any;
}

const Model: React.FC<PhotoCoverProps> = ({
  onAlbumAdded,

  data,
}) => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Yup schema for form validation
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  // Formik hooks for handling form state and validation
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (selectedImage) {
        try {
          // Check maximum image count
          if (data.length > 10) {
            toast.error(data.message);
            return;
          }

          // Call the API and wait for the response
          const response = await addfeaturedphotoalbums(
            values.title,
            selectedImage
          );

          // Check if the response indicates success or failure
          if (response.error) {
            // If there is an error reported by the API, show error message
            toast.error(
              "You have reached maximum video album limit. Maximum video album limit is 10",
              {
                onClose: handleClose,
              }
            );
          } else {
            // If upload is successful, show success message
            toast.success(`Photo album created successfully`, {
              onClose: handleClose,
            });
            onAlbumAdded(); // Notify parent component of successful album addition
            handleClose(); // Close modal after success
          }
        } catch (error) {
          // If an error occurs during API call, show generic error message
          toast.error("Photo album upload failed. Please try again later.", {
            onClose: handleClose,
          });
          console.error("Error uploading Photo album:", error);
        }
      }
    },
  });

  // Handle image selection and size check
  const handleImageSelect = (file: File) => {
    const maxSize = 1024 * 1024; // 1 MB
    if (file.size > maxSize) {
      toast.error("Image size exceeds 1MB. Please select a smaller image.");
    } else {
      setSelectedImage(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        style={{ backgroundColor: show ? "rgba(0, 0, 0, 0.4)" : "" }}
        aria-labelledby="exampleModalLabel"
        id="photoalbumcover"
        aria-hidden={!show}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={formik.handleSubmit}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add album
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <label htmlFor="title">TITLE</label>
                  <input
                    type="text"
                    className="form-control mt-3"
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-danger">{formik.errors.title}</div>
                  )}
                </div>
                <div className="mt-3">
                  <label htmlFor="cover">COVER</label>
                </div>
                <span className="mt-3">
                  <ProfileAlbum
                    src={imageSrc}
                    width={200}
                    height={200}
                    className=""
                    style={{ borderRadius: "6px" }}
                    onImageSelect={handleImageSelect}
                  />
                </span>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleClose}
                  aria-label="Close"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
