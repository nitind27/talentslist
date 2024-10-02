import { useState, useEffect } from "react";
import * as Yup from "yup";
import ProfileAlbum from "./ProfileAlbum";
import { updatePhotocover } from "@/api/profile/portfolio/addfeaturedphotos";
import { getphotoalbumbyalbumid } from "@/api/profile/get_portfolio_information";
import { toast } from "react-toastify";

interface EditPhotoAlbumsProps {
  onAlbumAdded: () => void;

  album_id: string;
}

const EditPhotoAlbums: React.FC<EditPhotoAlbumsProps> = ({
  album_id,
  onAlbumAdded,
}) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumDetails = await getphotoalbumbyalbumid(album_id);
        setTitle(albumDetails.data.name); // Assuming name is the title field in your API response
        setImageSrc(albumDetails.data.image); // Replace with the actual field name for the cover image URL
      } catch (error) {
        console.error("Error fetching photo album details:", error);
        toast.error(
          "Error fetching photo album details. Please try again later."
        );
      }
    };

    fetchData();
  }, [album_id]);

  const handleClose = () => setShow(false);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    image: Yup.mixed()
      .test(
        "fileSize",
        "Image size must be less than 1MB",
        (value: any) => !value || value.size <= 1024 * 1024
      )
      .nullable(),
  });

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setImageSrc(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      // Validate the form using Yup
      await validationSchema.validate(
        { title, image: selectedImage },
        { abortEarly: false }
      );

      // Check if selectedImage is null, use imageSrc instead
      const imageToSend = selectedImage ? selectedImage : imageSrc;

      const response = await updatePhotocover(
        album_id,
        title,
        imageToSend as any
      );

      if ((response.statusCode = 200)) {
        // Show success message
        toast.success("Photo album updated successfully");
        onAlbumAdded();
        handleClose();
      } else {
        toast.success("Photo album has been not updated ");
      }
      handleClose();
      // Show error message
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Show validation errors
        error.inner.forEach((validationError) => {
          toast.error(validationError.message);
        });
      } else {
        // Show a generic error message and log the error for debugging
        console.error("Failed to update photo album details:", error);
        toast.error(
          "Failed to update photo album details. Please try again later."
        );
      }
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="editphotoalbums"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose} // Close modal on close button click
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div>
                  <label htmlFor="title">TITLE</label>
                  <input
                    type="text"
                    className="form-control mt-5"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mt-5">
                  <label htmlFor="cover">COVER</label>
                </div>
                <span className="mt-5">
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
                className="btn btn-secondary"
                style={{
                  marginRight: "auto",
                }}
                onClick={handleClose} // Close modal on "PHOTOS" button click
              >
                PHOTOS
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPhotoAlbums;
