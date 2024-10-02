import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProfileAlbum from "./ProfileAlbum";
import { addphotosalbums } from "@/api/profile/portfolio/addfeaturedphotos";

const Addphotoalbums = ({
  album_id,
  data,
  onAlbumAdded,
}: {
  album_id: any;
  data: any;
  onAlbumAdded: () => void;
}) => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required("Image is required")
      .test("fileSize", "Image size must be less than 10MB", (value: any) =>
        value ? value.size <= 10485760 : true
      ),
  });

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setImageSrc(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      // Check if adding this photo would exceed the maximum limit
      if (data.data.length >= 20) {
        toast.error(data.message);
        return;
      }

      // Validate selectedImage
      await validationSchema.validate({ image: selectedImage });

      // Call API to add photo album
      await addphotosalbums(album_id, selectedImage as any);

      // Show success toast message
      toast.success(data.message);
      onAlbumAdded();
      // Optional: refresh the page or perform other actions on success
      handleClose();
    } catch (error: any) {
      // Handle validation errors and API errors
      if (error.name === "ValidationError") {
        toast.error(error.errors[0]);
      } else {
        console.error("Error uploading photo:", error);
        toast.error(data.message);
      }
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {"Album's photo"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p style={{ color: "#0036e3" }} className="fw-bold text-center">
                You can upload only 16 photos in this album (Maximum photo limit
                is 20)
              </p>
              <div>
                <label htmlFor="PHOTOS">PHOTOS</label>
                <ProfileAlbum
                  src={imageSrc}
                  width={200}
                  height={200}
                  className=""
                  style={{ borderRadius: "6px" }}
                  onImageSelect={handleImageSelect}
                />
              </div>
            </div>
            <div
              className="modal-footer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{
                  marginRight: "auto",
                }}
              >
                PHOTOS
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
                onClick={handleSave}
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addphotoalbums;
