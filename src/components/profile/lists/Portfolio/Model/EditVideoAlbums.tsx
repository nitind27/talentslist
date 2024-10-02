import { useState, useEffect } from "react";
import ProfileAlbum from "./ProfileAlbum";
import { updateVideocover } from "@/api/profile/portfolio/addfeaturedphotos";
import { getvideoalbumbyalbumid } from "@/api/profile/get_portfolio_information";
import { toast } from "react-toastify";
import * as Yup from "yup";
interface EditPhotoAlbumsProps {
  onAlbumAdded: () => void;

  album_id: string;
}

const EditVideoAlbums: React.FC<EditPhotoAlbumsProps> = ({
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
        const albumDetails = await getvideoalbumbyalbumid(album_id);

        setTitle(albumDetails.data.name); // Assuming name is the title field in your API response
        setImageSrc(albumDetails.image); // Replace with the actual field name for the cover image URL
      } catch (error) {
        console.error("Error fetching photo album details:", error);
      }
    };

    fetchData();
  }, [album_id]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      // Validate title and selectedImage
      await validationSchema.validate(
        { title, image: selectedImage },
        { abortEarly: false }
      );
      // Check if selectedImage is null, use imageSrc instead
      const imageToSend = selectedImage ? selectedImage : imageSrc;
      // Call API to update photo album cover
      const response = await updateVideocover(
        album_id,
        title,
        imageToSend as any
      );

      // Show success toast message

      if ((response.statusCode = 200)) {
        // Show success message
        toast.success("Video album details updated successfully");

        onAlbumAdded();
        handleClose();
      } else {
        toast.success("Video album has been not updated ");
      }
      // Optional: refresh the page or perform other actions on success
      handleClose();
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        // Show validation errors
        error.inner.forEach((validationError) => {
          toast.error(validationError.message);
        });
      } else {
        // Show a generic error message and log the error for debugging
        console.error("Failed to update Video album details:", error);
        toast.error(
          "Failed to update Video album details. Please try again later."
        );
      }
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="editvideoalbums"
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
                className="btn btn-secondary btn-sm"
                style={{
                  marginRight: "auto",
                }}
                data-bs-dismiss="modal"
                onClick={handleClose} // Close modal on "PHOTOS" button click
              >
                PHOTOS
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSave}
                data-bs-dismiss="modal"
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

export default EditVideoAlbums;
