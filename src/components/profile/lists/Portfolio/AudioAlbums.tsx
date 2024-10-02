import { IconVideo } from "@/_metronic/assets/Svgicons/Svgicons/Svg11";
import { Iconplus } from "@/_metronic/assets/Svgicons/Svgicons/Svg14";
import {
  getaudioalbums,
  getaudiosalbumsvideos,
} from "@/api/profile/get_portfolio_information";
import { Iprofile } from "@/api/profile/types";
import React, { useEffect, useState } from "react";

import { IconCross } from "@/_metronic/assets/Svgicons/Svgicons/Svg13";
import {
  deletealbumsdAudiosId,
  deleteplaylistaudioalbums,
} from "@/api/profile/portfolio/deletephotos";
import AddAudiosToAlbum from "./Model/Addaudioalbum";
import AudioPlaylistCover from "./Model/Audioplaylistcover";
import EditAudioAlbumsCover from "./Model/EditAudioalbums";
import { toast } from "react-toastify";

const AudioAlbums = ({ data }: { data: any }) => {
  const [profilesaudioAlbums, setProfilesaudioAlbums] = useState<Iprofile[]>(
    []
  );
  const [selectedAlbumId, setSelectedAlbumId] = useState<any | null>(null);
  const [albumAudio, setAlbumAudio] = useState<Iprofile | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteModal1, setShowDeleteModal1] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);
  const [photoToDelete1, setPhotoToDelete1] = useState<string | null>(null);
  const [tab, setTab] = useState("");
  const handleaudioClick = (album_id: string) => {
    setSelectedAlbumId(album_id);
    fetchAlbumsVideos(album_id);
  };

  const fetchAlbumsVideos = async (album_id: string) => {
    const response = await getaudiosalbumsvideos(album_id);
    setAlbumAudio(response);
  };

  const fetchProfileInformation = async () => {
    try {
      const response = await getaudioalbums();
      setProfilesaudioAlbums(response.data);
    } catch (error) {
      console.error("Error fetching audio albums:", error);
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
      await deletealbumsdAudiosId(photoToDelete1!);
      toast.success("Audio Delete Successfully");
      fetchAlbumsVideos(selectedAlbumId); // Refresh photos after deleting
    } catch (error) {
      toast.error("Error deleting photo:");
    }
    setShowDeleteModal1(false);
    setPhotoToDelete1(null);
  };

  const confirmDelete = async () => {
    try {
      await deleteplaylistaudioalbums(photoToDelete!);
      toast.success("Audio Delete Successfully");
      setSelectedAlbumId(null); // Clear selected album ID after deletion
      setAlbumAudio(null); // Clear album audio after deletion
      fetchProfileInformation(); // Refresh audio albums list
    } catch (error) {
      toast.error("Error deleting photo");
    }
    setShowDeleteModal(false);
    setPhotoToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal1(false);
    setShowDeleteModal(false);
    setPhotoToDelete(null);
  };

  return (
    <>
      <AddAudiosToAlbum album_id={selectedAlbumId} />

      {tab == "AudioPlaylistCover" && (
        <AudioPlaylistCover onAlbumAdded={fetchProfileInformation} />
      )}
      {tab == "EditAudioAlbumsCover" && (
        <EditAudioAlbumsCover album_id={selectedAlbumId} onAlbumAdded={fetchProfileInformation}/>
      )}

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
                Movie songs album
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
                {albumAudio?.data.map((audio: any, index: any) => {
                  const audioUrl = audio.audio_url || "";
                  const adjustedVideoUrl = audioUrl.replace(
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
                          onClick={() => handleDelete(audio.id)}
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
                onClick={() => handleDeleteAlbum(selectedAlbumId)}
                 data-bs-dismiss="modal"
              >
                DELETE ALBUM
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#addAudiosToAlbumModal"
              >
                ADD VIDEO TO ALBUM
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#editaudioalbums"
                onMouseEnter={() => {
                  setTab("EditAudioAlbumsCover");
                }}
              >
                EDIT ALBUM DETAILS
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row p-0 mb-5 px-9 mt-10">
        <div
          className="col-lg-3 mb-5"
          onMouseEnter={() => {
            setTab("AudioPlaylistCover");
          }}
        >
          <label
            className="d-flex bg-secondary card-rounded cursor-pointer text-center justify-content-center"
            data-fslightbox="lightbox-basic"
            htmlFor="file"
            style={{ width: "100%", height: "175px" }}
            data-bs-toggle="modal"
            data-bs-target="#AudioPlaylistCover"
          >
            <div className="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px d-flex align-items-center justify-content-center">
              <Iconplus />
            </div>
          </label>
        </div>

        {data?.map((audio: any, index: any) => (
          <div
            key={index}
            className="col-lg-3 mb-5"
            data-bs-toggle="modal"
            data-bs-target="#openvideoplaylist"
            onClick={() => handleaudioClick(audio.id)}
          >
            <a
              className="d-block bgi-no-repeat bgi-size-cover bgi-position-center rounded position-relative min-h-175px"
              style={{ backgroundImage: `url(${audio.image})` }}
              data-fslightbox="lightbox-youtube"
              href={audio.videoUrl}
            >
              <img
                src={audio.thumbnails_urls.medium}
                alt={audio.name}
                style={{ width: "100%", height: "175px", objectFit: "cover" }}
              />

              <span className="position-absolute top-50 start-50 translate-middle">
                <IconVideo />
              </span>
              <div className="text-center fw-bold h6 cursor-pointer">
                {audio.name}
                <div> {audio.audios.length} Photos</div>
              </div>
              {}
            </a>
          </div>
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
                <p>Are you sure you want to delete this audio?</p>
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
    </>
  );
};

export default AudioAlbums;
