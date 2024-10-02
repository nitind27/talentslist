import React, { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { addfeaturedphoto } from "@/api/profile/portfolio/addfeaturedphotos";
import { deleteFeaturedPhoto } from "@/api/profile/portfolio/deletephotos";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Iconplus } from "@/_metronic/assets/Svgicons/Svgicons/Svg14";
import Eyes from "@/_metronic/assets/Svgicons/Svgicons/Svg12";
import { IconCross } from "@/_metronic/assets/Svgicons/Svgicons/Svg13";

// Validation schema
const fileSchema = yup.object().shape({
  file: yup
    .mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File size is too large, must be less than 1MB",
      (value: any) => value && value.size <= 1048576 // 1MB
    ),
});

interface FeaturedPhoto {
  id: string;
  imageUrl: string;
}

interface FeaturedPhotosProps {
  data: any; // Adjust this type based on your actual data structure
  onDataUpdate: () => void;
}

const FeaturedPhotos: React.FC<FeaturedPhotosProps> = ({
  data,
  onDataUpdate,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setSelectedFile(selectedFile);

      try {
        // Validate file size
        await fileSchema.validate({ file: selectedFile });

        // Check if the number of images exceeds the limit
        if (data?.featured_images_url && data.featured_images_url.length >= 8) {
          toast.error(
            "You have reached the maximum photo limit. Maximum photo limit is 8."
          );
          return;
        }

        await addfeaturedphoto(selectedFile);
        toast.success("Featured Image has been successfully uploaded.");
        onDataUpdate(); // Update parent data
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          toast.error(error.message);
        } else {
          console.error("Error uploading photo:", error);
          toast.error("Featured Image has not been uploaded.");
        }
      }
    } else {
      toast.error("A file is required");
    }
  };

  const handleDelete = async (id: string) => {
    setPhotoToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteFeaturedPhoto(photoToDelete!);
      onDataUpdate(); // Update parent data
      toast.success("Featured Image has been successfully deleted.");
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast.error("Failed to delete featured image.");
    }
    setShowDeleteModal(false);
    setPhotoToDelete(null);
    router.refresh();
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPhotoToDelete(null);
  };

  return (
    <>
      <div className="row pt-7 pb-0 px-0 mb-2">
        <div className="col-lg-3 ">
          <label
            className="d-flex bg-secondary card-rounded cursor-pointer text-center justify-content-center"
            htmlFor="file"
          >
            <input type="file" id="file" hidden onChange={handleFileChange} />
            <div className="overlay-wrapper  custom bgi-no-repeat bgi-position-center my-auto bgi-size-cover card-rounded min-h-175px d-flex align-items-center  justify-content-center">
              <Iconplus />
            </div>
          </label>
        </div>

        {data?.data?.featured_images_url &&
          data?.data?.featured_images_url.length > 0 &&
          data?.data?.featured_images_url.map((img: any, index: any) => (
            <PhotoProvider key={index}>
              <div
                className="col-lg-3 position-relative"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <PhotoView src={img.large}>
                  <div className="d-block overlay position-relative cursor-pointer mb-5">
                    <div
                      className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px img-fluid img-thumbnail img-rounded"
                      style={{ backgroundImage: `url(${img.medium})` }}
                    ></div>
                    <div className="overlay-layer card-rounded bg-dark bg-opacity-25 shadow d-flex align-items-center justify-content-center">
                      <Eyes />
                    </div>
                  </div>
                </PhotoView>
                <div
                  className="position-absolute top-0 end-0 text-white p-5 rounded cursor-pointer"
                  style={{
                    display: hovered === index ? "block" : "none",
                  }}
                  onClick={() => handleDelete(img.id)}
                >
                  <IconCross />
                </div>
              </div>
            </PhotoProvider>
          ))}
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
                <p>Are you sure you want to delete this photo?</p>
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

export default FeaturedPhotos;
