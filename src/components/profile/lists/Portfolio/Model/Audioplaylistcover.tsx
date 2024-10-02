import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ProfileAlbum from "./ProfileAlbum";
import { addfeaturedaudioalbums } from "@/api/profile/portfolio/addfeaturedphotos";

interface AudioPlaylistCoverProps {
  onAlbumAdded: () => void;
}

const AudioPlaylistCover: React.FC<AudioPlaylistCoverProps> = ({
  onAlbumAdded,
}) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Allow null for initial state
  const [imageSrc, setImageSrc] = useState<string>(""); // Default empty string for image source

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setImageSrc(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      // Validate input using Yup schema
      const schema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        image: Yup.mixed()
          .required("Image is required")
          .test(
            "fileSize",
            "Image size must be less than 1MB",
            (value: any) => value && value.size <= 1000000 // 1MB in bytes
          ),
      });

      await schema.validate({ title, image: selectedImage });

      // If validation passes, proceed to save
      if (selectedImage) {
        await addfeaturedaudioalbums(title, selectedImage);
        handleClose();
        onAlbumAdded();
        toast.success("Album added successfully");
      } else {
        toast.error("No image selected");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="AudioPlaylistCover"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add album
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  className="form-control mt-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="cover">COVER</label>
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
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlaylistCover;
