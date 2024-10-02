"use client";

import Eyes from "@/_metronic/assets/Svgicons/Svgicons/Svg12";
import { IconCross } from "@/_metronic/assets/Svgicons/Svgicons/Svg13";
import { Iconplus } from "@/_metronic/assets/Svgicons/Svgicons/Svg14";
import {
  getfeaturedphotos,
  getphotoalbums,
  getphotoalbumsphotos,
} from "@/api/profile/get_portfolio_information";
import { Iprofile } from "@/api/profile/types";
import React, { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import Addphotoalbums from "./Model/Addphotoalbums";
import EditPhotoAlbums from "./Model/EditPhotoalbums";
import {
  deletealbumphoto,
  deletephotoalbum,
} from "@/api/profile/portfolio/deletephotoalbums";
import Model from "./Model/Model";
import { toast } from "react-toastify";

interface FeaturedPhoto {
  id: string;
  imageUrl: string;
}

interface PhotoAlbumsProps {
  photos: FeaturedPhoto[];
}

const PhotoAlbums = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [photoAlbums, setPhotoAlbum] = useState<Iprofile | null>(null);
  const [albumPhotos, setAlbumPhotos] = useState<Iprofile | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteModal1, setShowDeleteModal1] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);
  const [photoToDelete1, setPhotoToDelete1] = useState<string | null>(null);
  const [tab, setTab] = useState("");

  const fetchAlbumPhotos = async (album_id: string) => {
    const response = await getphotoalbumsphotos(album_id);
    setAlbumPhotos(response);
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setImageSrc(URL.createObjectURL(file));
  };

  const handleImageClick = (album_id: string) => {
    setSelectedAlbumId(album_id);
    fetchAlbumPhotos(album_id);
  };

  const handleDelete = async (id: string) => {
    setPhotoToDelete1(id);
    setShowDeleteModal1(true);
  };
  const handleDeletephoto = async (id: string) => {
    setPhotoToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete1 = async () => {
    try {
      await deletephotoalbum(photoToDelete1!);
      const response = await getphotoalbums();
      setPhotoAlbum(response);

      toast.success("Photo album deleted successfully");
    } catch (error) {
      console.error("Error deleting photo album:", error);
      toast.error("Failed to delete photo album");
    }
    setShowDeleteModal1(false);
    setPhotoToDelete1(null);
  };

  const confirmDelete = async () => {
    try {
      await deletealbumphoto(photoToDelete!);
      const response = await getfeaturedphotos(); // Refresh photos after deleting
      setAlbumPhotos(response);
      toast.success("Photo deleted successfully");
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast.error("Failed to delete photo");
    }
    setShowDeleteModal(false);
    setPhotoToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setShowDeleteModal1(false);
    setPhotoToDelete(null);
  };

  const fetchProfileInformation = async () => {
    const response = await getphotoalbums();
    setPhotoAlbum(response);
  };
  useEffect(() => {
    fetchProfileInformation();
  }, []);

  return (
    <>
      <div></div>
      <div>
        {tab == "Addphotoalbums" && (
          <Addphotoalbums
            album_id={selectedAlbumId}
            data={albumPhotos}
            onAlbumAdded={fetchProfileInformation}
          />
        )}
        {tab == "EditPhotoAlbums" && (
          <EditPhotoAlbums
            album_id={selectedAlbumId}
            onAlbumAdded={fetchProfileInformation}
          />
        )}
        {tab == "Model" && (
          <Model data={photoAlbums} onAlbumAdded={fetchProfileInformation} />
        )}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Album Photos
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row p-0 mb-5 px-9 mt-10 ">
                {albumPhotos?.data &&
                  albumPhotos.data.length > 0 &&
                  albumPhotos.data.map((img: any, index: any) => (
                    <>
                      <PhotoProvider key={index}>
                        <div
                          className="col-lg-3 position-relative mb-5"
                          key={index}
                          onMouseEnter={() => setHovered(index)}
                          onMouseLeave={() => setHovered(null)}
                        >
                          <PhotoView src={img.photo_url.large}>
                            <div
                              className="d-block overlay position-relative cursor-pointer mb-5"
                              data-fslightbox="lightbox-basic"
                            >
                              <div
                                className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px img-fluid img-thumbnail img-rounded"
                                style={{
                                  backgroundImage: `url(${img.photo_url.medium})`,
                                }}
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
                            onClick={() => handleDeletephoto(img.id)}
                          >
                            <IconCross />
                          </div>
                        </div>
                      </PhotoProvider>
                    </>
                  ))}
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
                className="btn btn-danger btn-sm"
                style={{
                  marginRight: "auto",
                }}
                data-bs-dismiss="modal"
                onClick={() => handleDelete(selectedAlbumId)}
              >
                DELETE ALBUM
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
                id="Addphotoalbums"
                onMouseEnter={() => {
                  setTab("Addphotoalbums");
                }}
              >
                ADD PHOTO TO ALBUM
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-toggle="modal"
                id="editphotoalbums"
                data-bs-target="#editphotoalbums"
                onMouseEnter={() => {
                  setTab("EditPhotoAlbums");
                }}
              >
                EDIT ALBUM DETAILS
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row pt-7 pb-0 px-0 mb-2">
        <div className="col-lg-3 ">
          <label
            className="d-flex bg-secondary card-rounded cursor-pointer text-center justify-content-center"
            data-fslightbox="lightbox-basic"
            htmlFor="file"
            data-bs-toggle="modal"
            data-bs-target="#photoalbumcover"
            id="model"
            onMouseEnter={() => {
              setTab("Model");
            }}
          >
            <div className="overlay-wrapper  custom bgi-no-repeat bgi-position-center my-auto bgi-size-cover card-rounded min-h-175px d-flex align-items-center  justify-content-center">
              <Iconplus />
            </div>
          </label>
        </div>

        {photoAlbums?.data &&
          photoAlbums?.data.length > 0 &&
          photoAlbums?.data.map((album: any, index: any) => (
            <div
              className="col-lg-3 position-relative mb-5"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => handleImageClick(album.id)}
              key={index}
            >
              <div
                className="d-block overlay position-relative cursor-pointer mb-5"
                data-fslightbox="lightbox-basic"
              >
                <div
                  className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px img-fluid img-thumbnail img-rounded"
                  style={{
                    backgroundImage: `url(${album.thumbnails_urls.medium})`,
                  }}
                ></div>
                <div className="overlay-layer card-rounded bg-dark bg-opacity-25 shadow d-flex align-items-center justify-content-center">
                  <Eyes />
                </div>
              </div>
              <div className="text-center fw-bold h6 cursor-pointer">
                {album.name}
                <div> {album.photos.length} Photos</div>
              </div>
            </div>
          ))}
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
        {showDeleteModal1 && (
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
                    onClick={confirmDelete1}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PhotoAlbums;
