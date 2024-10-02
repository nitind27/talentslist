import { IconCross } from "@/_metronic/assets/Svgicons/Svgicons/Svg13";
import React, { useEffect, useState } from "react";
import Addvideoslbums from "./Model/Addvideoalbums";
import VideoPlaylistCover from "./Model/VideoplaylistCover";
import {
  deletealbumsdVideoId,
  deleteplaylistalbums,
} from "@/api/profile/portfolio/deletephotos";
import { Iprofile } from "@/api/profile/types";
import { IconVideo } from "@/_metronic/assets/Svgicons/Svg11";
import {
  getvideosalbumsvideos,
  getvideosplaylist,
} from "@/api/profile/get_portfolio_information";
import { Iconplus } from "@/_metronic/assets/Svgicons/Svgicons/Svg14";
import EditVideoAlbums from "./Model/EditVideoAlbums";
import { toast } from "react-toastify";

const VideoPlaylist = () => {
  const [profilesvideosAlbums, setProfilesvideosAlbums] = useState<Iprofile[]>(
    []
  );
  const [selectedAlbumId, setSelectedAlbumId] = useState<any | null>(null);
  const [albumVideos, setAlbumVideos] = useState<Iprofile | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteModal1, setShowDeleteModal1] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);
  const [photoToDelete1, setPhotoToDelete1] = useState<string | null>(null);
  const [tab, setTab] = useState("");
  const handlevideoClick = (album_id: string) => {
    setSelectedAlbumId(album_id);
    fetchAlbumsVideos(album_id);
  };

  const fetchAlbumsVideos = async (album_id: string) => {
    const response = await getvideosalbumsvideos(album_id);
    setAlbumVideos(response);
  };
  const fetchProfileInformation = async () => {
    try {
      const response = await getvideosplaylist();
      setProfilesvideosAlbums(response.data);
    } catch (error) {
      console.error("Error fetching featured videos:", error);
    }
  };

  useEffect(() => {
    fetchProfileInformation();
  }, []);

  const handleDelete = async (id: string) => {
    setPhotoToDelete1(id);
    setShowDeleteModal1(true);
  };
  const handleDeleteAlbum = async (id: string) => {
    setPhotoToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete1 = async () => {
    try {
      await deletealbumsdVideoId(photoToDelete1!);
      toast.success("Playlist video deleted successfully");
      fetchAlbumsVideos(selectedAlbumId);
    } catch (error: any) {
      toast.error("Error deleting photo:", error);
    }
    setShowDeleteModal1(false);
    setPhotoToDelete1(null);
    // router.refresh();
  };
  const confirmDelete = async () => {
    try {
      await deleteplaylistalbums(photoToDelete!);
      toast.success("Playlist deleted successfully");
      const response = await getvideosplaylist(); // Refresh video albums list
      setProfilesvideosAlbums(response.data);
    } catch (error: any) {
      toast.error("Error deleting photo:", error);
    }
    setShowDeleteModal(false);
    setPhotoToDelete(null);
    // router.refresh();
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setShowDeleteModal1(false);
    setPhotoToDelete(null);
  };

  useEffect(() => {
    const fetchProfileInformation = async () => {
      try {
        const response = await getvideosplaylist();
        setProfilesvideosAlbums(response.data);
      } catch (error) {
        console.error("Error fetching featured videos:", error);
      }
    };

    fetchProfileInformation();
  }, []);

  return (
    <>
      <Addvideoslbums
        album_id={selectedAlbumId}
        data={albumVideos}
        onAlbumAdded={fetchProfileInformation}
      />
      {tab == "VideoPlaylistCover" && (
        <VideoPlaylistCover
          onAlbumAdded={fetchProfileInformation}
          data={profilesvideosAlbums}
        />
      )}
      {tab == "EditVideoAlbums" && (
        <EditVideoAlbums
          album_id={selectedAlbumId}
          onAlbumAdded={fetchProfileInformation}
        />
      )}
      {/* Modal for displaying album videos */}
      <div
        className="modal fade"
        id="openvideoplaylist"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Album Videos
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row p-0 mb-5 px-9 mt-10">
                {albumVideos?.data.map((video: any, index: any) => {
                  const videoUrl = video.video_url || "";
                  const adjustedVideoUrl = videoUrl.replace(
                    /<iframe([^>]*)>/,
                    '<iframe$1 style="height: 100%; width: 100%;">'
                  );

                  return (
                    <div key={index} className="col-lg-3 mb-5">
                      <div style={{ position: "relative" }}>
                        <div
                          className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px img-fluid img-thumbnail img-rounded"
                          style={{ height: "175px", width: "100%" }}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: adjustedVideoUrl,
                            }}
                            className="card-rounded"
                            style={{ height: "100%", width: "100%" }}
                          />
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "5px",
                            zIndex: 1,
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(video.id)}
                        >
                          <IconCross />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="modal-footer"
              style={{
                display: "flex",
                justifyContent: "space-between btn-sm",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                className="btn btn-danger btn-sm"
                style={{
                  marginRight: "auto",
                }}
                onClick={() => handleDeleteAlbum(selectedAlbumId)}
                data-bs-dismiss="modal"
              >
                DELETE ALBUM
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#addVideosToAlbumModal"
              >
                ADD VIDEO TO ALBUM
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#editvideoalbums"
                onMouseEnter={() => {
                  setTab("EditVideoAlbums");
                }}
              >
                EDIT ALBUM DETAILS
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of modal for displaying album videos */}

      <div className="row pt-7 pb-0 px-0 mb-2">
        <div
          className="col-lg-3 "
          data-bs-toggle="modal"
          data-bs-target="#VideoPlaylistCover"
          onMouseEnter={() => {
            setTab("VideoPlaylistCover");
          }}
        >
          <label
            className="d-flex bg-secondary card-rounded cursor-pointer text-center justify-content-center"
            data-fslightbox="lightbox-basic"
            htmlFor="file"
            style={{ width: "100%", height: "175px" }}
          >
            <div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px d-flex align-items-center justify-content-center">
              <Iconplus />
            </div>
          </label>
        </div>

        {/* Display existing albums */}
        {profilesvideosAlbums ? (
          profilesvideosAlbums?.map((video: any, index: any) => (
            <div
              key={index}
              className="col-lg-3 mb-5"
              data-bs-toggle="modal"
              data-bs-target="#openvideoplaylist"
              onClick={() => handlevideoClick(video.id)}
            >
              <a
                className="d-block bgi-no-repeat bgi-size-cover bgi-position-center rounded position-relative min-h-175px"
                style={{ backgroundImage: `url(${video.image})` }}
                data-fslightbox="lightbox-youtube"
                href={video.videoUrl}
              >
                <img
                  src={video.thumbnails_urls.medium}
                  alt={video.name}
                  style={{ width: "100%", height: "175px", objectFit: "cover" }}
                />

                <span className="position-absolute top-50 start-50 translate-middle">
                  <IconVideo />
                </span>
                <div className="text-center fw-bold h6 cursor-pointer">
                  {video.name}
                  <div> {video.videos.length} Photos</div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <>
            <p>Image not found</p>
          </>
        )}
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
                  <p>Are you sure you want to delete this video?</p>
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
                  <p>Are you sure you want to delete this video?</p>
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

export default VideoPlaylist;
