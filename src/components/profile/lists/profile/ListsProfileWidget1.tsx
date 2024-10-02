"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

import FeaturedPhotos from "../Portfolio/FeaturedPhotos";
import PhotoAlbums from "../Portfolio/PhotoAlbums";
import FeaturedVideos from "../Portfolio/FeaturedVideos";
import VideoPlaylist from "../Portfolio/VideoPlaylist";
import FeatureAudio from "../Portfolio/FeatureAudio";
import AudioAlbums from "../Portfolio/AudioAlbums";
import {
  getaudioalbums,
  getfeaturedaudios,
  getfeaturedphotos,
  getfeaturedvideos,
  getphotoalbums,
  getvideosplaylist,
} from "@/api/profile/get_portfolio_information";
import { Iprofile } from "@/api/profile/types";

const ListsWidget10 = () => {
  const [activeTab, setActiveTab] = useState<string>("Featured Photos");
  const [featurePhotos, setFeaturedPhoto] = useState<Iprofile | null>(null);

  const [profilesvideos, setProfilesvideos] = useState<Iprofile[]>([]);

  const [profilesaudioAlbums, setProfilesaudioAlbums] = useState<Iprofile[]>(
    []
  );
  const [featuredaudio, setFeaturedAudio] = useState<Iprofile[]>([]);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const fetchfeaturedphoto = async () => {
    const response = await getfeaturedphotos();
    const profilesinfo = response;
    setFeaturedPhoto(profilesinfo);
  };
  useEffect(() => {
    fetchfeaturedphoto();
  }, []);

  // featured video
  const fetchFeaturedVideo = async () => {
    try {
      const response = await getfeaturedvideos();
      setProfilesvideos(response.data);
    } catch (error) {
      console.error("Error fetching featured videos:", error);
    }
  };

  useEffect(() => {
    fetchFeaturedVideo();
  }, []);

  //

  // audio
  const fetchfeaturedaudio = async () => {
    try {
      const response = await getfeaturedaudios();
      setFeaturedAudio(response.data);
    } catch (error) {
      console.error("Error fetching featured audios:", error);
    }
  };
  useEffect(() => {
    fetchfeaturedaudio();
  }, []);

  useEffect(() => {
    const fetchProfileInformation = async () => {
      try {
        const response = await getaudioalbums();
        setProfilesaudioAlbums(response.data);
      } catch (error) {
        console.error("Error fetching audio albums:", error);
      }
    };
    fetchProfileInformation();
  }, []);

  return (
    <div>
      <div className="card card-xxl-stretch mb-5 mb-xl-10 border-0">
        <div className="card-header card-header-stretch">
          <ul
            className="nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap"
            role="tablist"
          >
            {[
              "Featured Photos",
              "Photo Albums",
              "Featured Videos",
              "Videos Playlist",
              "Featured Audios",
              "Audio Albums",
            ].map((tab) => (
              <li className="nav-item" key={tab}>
                <span
                  className={clsx("nav-link cursor-pointer", {
                    active: activeTab === tab,
                  })}
                  onClick={() => handleTabClick(tab)}
                  role="tab"
                >
                  {tab}
                </span>
              </li>
            ))}
          </ul>
          <div className="">
            <span className="btn align-items-center btn-sm btn-primary align-self-center">
              {/* <Model btnName={activeTab} /> */}
              Add {activeTab === "Featured Photos" && "Featured Photo"}
              {activeTab === "Photo Albums" && "Photo Albums"}
              {activeTab === "Featured Videos" && "Featured Video"}
              {activeTab === "Videos Playlist" && "Video Albums"}
              {activeTab === "Featured Audios" && "Featured Audio"}
              {activeTab === "Audio Albums" && "Audio Albums"}
            </span>
          </div>
        </div>
        {activeTab === "Featured Photos" && (
          <FeaturedPhotos
            data={featurePhotos}
            onDataUpdate={fetchfeaturedphoto}
          />
        )}
        {activeTab === "Photo Albums" && <PhotoAlbums />}
        {activeTab === "Featured Videos" && (
          <FeaturedVideos
            data={profilesvideos}
            onDataUpdate={fetchFeaturedVideo}
          />
        )}
        {activeTab === "Videos Playlist" && <VideoPlaylist />}
        {activeTab === "Featured Audios" && (
          <FeatureAudio
            data={featuredaudio}
            onDataUpdate={fetchFeaturedVideo}
          />
        )}
        {activeTab === "Audio Albums" && (
          <AudioAlbums data={profilesaudioAlbums} />
        )}
      </div>
    </div>
  );
};

export default ListsWidget10;
