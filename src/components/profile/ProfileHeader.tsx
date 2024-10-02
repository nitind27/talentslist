"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CountUp from "react-countup";
import { KTIcon } from "@/_metronic/helpers";
import { Button, UncontrolledTooltip } from "reactstrap";
import { IconFacebook } from "@/_metronic/assets/Svgicons/Svgicons/Svg6";
import { IconTwitter } from "@/_metronic/assets/Svgicons/Svgicons/Svg7";
import { IconLinkdin } from "@/_metronic/assets/Svgicons/Svgicons/Svg8";

import { Iprofile } from "@/api/profile/types";
import ExampleFilePond from "./lists/profile/Images";
import ProfileShare from "./Model/Profileshare";
import { getprofileshare } from "@/api/profile/get_profile_information";
import { ManageProfileImageContext } from "./lists/profile/ProfileImage.tsx/ProfileImageProvider";

interface ProfileHeaderProps {
  tablinks?: string;
  profileheaderData: Iprofile;
}
const ProfileHeader = ({ tablinks, profileheaderData }: ProfileHeaderProps) => {
  const [profileshare, setProfileshare] = useState<Iprofile[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { profileImage } = useContext(ManageProfileImageContext);

  const [profileUrl, setProfileUrl] = useState("");

  const [isSend, setIsSend] = useState(false);
  const handleEdit = () => setIsEditing(true);
  const handleSave = (newProfileUrl: string) => {
    setProfileUrl(newProfileUrl);
    setIsEditing(false);
  };
  const handlesend = () => {
    setIsSend(!isSend);
  };

  useEffect(() => {
    const fetchProfileInformation = async () => {
      try {
        const response = await getprofileshare();
        setProfileshare(response.data);
      } catch (error) {
        console.error("Error fetching audio albums:", error);
      }
    };

    fetchProfileInformation();
  }, []);

  return (
    <>
      {/* <ExampleFilePond /> */}
      <div className="card container p-0">
        <div className="card-body pt-9 pb-0">
          <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <ExampleFilePond
                  src={
                    profileImage
                      ? profileImage
                      : profileheaderData?.data?.information?.profile_image ||
                        ""
                  }
                  width={160}
                  height={160}
                  className={""}
                  style={{ borderRadius: "6px" }}
                />

                {/* ki-duotone ki-check-circle cursor-pointer fs-2 text-success */}
                <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
              </div>
            </div>

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex mb-2 flex-column">
                    <div className="d-flex align-items-center">
                      <span className=" text-gray-900 text-hover-primary fs-2 fw-bold me-1">
                        {profileheaderData?.data?.information?.full_name || ""}
                      </span>
                    </div>
                    <div className="d-flex align-items-center text-gray-500 me-5 fs-6">
                      I`m a {profileheaderData?.data?.information?.skills || ""}
                    </div>
                    <div className="d-flex align-items-center text-gray-500 me-5 fs-6">
                      Living in{" "}
                      {profileheaderData?.data?.information?.living_in || ""}
                    </div>
                    <div className="d-flex align-items-center text-gray-500 fs-6">
                      Ready to travel to{" "}
                      {profileheaderData?.data?.information?.ready_to_travel ||
                        ""}
                    </div>
                    <div className="d-flex align-items-center text-gray-500 fs-6">
                      <div>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileUrl}
                            onChange={(e) => setProfileUrl(e.target.value)}
                            className="input-field"
                          />
                        ) : (
                          <span
                            style={{ color: "#0040de" }}
                            className="text-decoration-underline"
                          >
                            {/* {profileheaderData?.data?.information?.profile_url} */}
                          </span>
                        )}
                        {/* {!isEditing ? (
                          <span className="fs-4 ms-2">
                            <span onClick={handleEdit}>
                              <KTIcon
                                iconName="pencil"
                                iconType="duotone"
                                className="cursor-pointer fs-4"
                              />
                            </span>
                            <span onClick={handlesend}>
                              <KTIcon
                                iconName="send"
                                iconType="duotone"
                                className="cursor-pointer fs-4"
                              />
                            </span>
                          </span>
                        ) : (
                          <span className="fs-4 ms-2">
                            <span
                              onClick={() => setIsEditing(false)}
                              style={{ color: "#F1416C" }}
                            >
                              <KTIcon
                                iconName="cross-circle"
                                iconType="duotone"
                                className="cursor-pointer fs-2 text-danger"
                              />
                            </span>
                            <span
                              onClick={() => handleSave(profileUrl)}
                              style={{ color: "#09CBCB" }}
                              className="mx-1"
                            >
                              <KTIcon
                                iconName="check-circle"
                                iconType="duotone"
                                className="cursor-pointer fs-2 text-success"
                              />
                            </span>
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div className="fw-bold text-gray-500">
                    {isSend && "Share profile on"}
                  </div>
                  {isSend && (
                    <>
                      <div className="d-flex fs-1">
                        <IconFacebook id="tooltipFacebook" />
                        <UncontrolledTooltip
                          delay={0}
                          placement="top"
                          target="tooltipFacebook"
                        >
                          Facebook
                        </UncontrolledTooltip>

                        <IconTwitter id="tooltipTwitter" />
                        <UncontrolledTooltip
                          delay={0}
                          placement="top"
                          target="tooltipTwitter"
                        >
                          Twitter
                        </UncontrolledTooltip>

                        <IconLinkdin id="tooltiplinkdin" />
                        <UncontrolledTooltip
                          delay={0}
                          placement="top"
                          target="tooltiplinkdin"
                        >
                          Linkdin
                        </UncontrolledTooltip>

                        <span
                          style={{ color: "#0040de" }}
                          className="mt-2"
                          id="tooltipCopy"
                        >
                          <KTIcon
                            iconName="copy"
                            iconType="outline"
                            className="fs-1"
                          />
                        </span>
                        <UncontrolledTooltip
                          delay={0}
                          placement="top"
                          target="tooltipCopy"
                        >
                          Copy Link
                        </UncontrolledTooltip>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <div className="d-flex flex-column align-items-end">
                    <div className="mb-3">
                      <ProfileShare data={profileshare} />
                    </div>

                    <div className="d-flex flex-wrap justify-content-around text-gray-500">
                      <div className="text-center text-danger me-2">
                        <h6 className="me-5 d-flex align-items-center">
                          <CountUp
                            end={Number(
                              profileheaderData?.data?.counts?.bookings
                            )}
                            duration={3}
                          />
                          <p className="text-gray-500 ms-1 mb-0">Booking</p>
                        </h6>
                      </div>
                      <div className="text-center me-2">
                        <h6 className="me-5 d-flex align-items-center">
                          <CountUp
                            end={Number(
                              profileheaderData?.data?.counts?.countries || "-"
                            )}
                            duration={3}
                          />
                          <p className="text-gray-500 ms-1 mb-0">Countries</p>
                        </h6>
                      </div>
                      <div className="text-center me-2">
                        <h6 className="me-5 d-flex align-items-center">
                          <CountUp
                            end={Number(
                              profileheaderData?.data?.counts?.clients
                            )}
                            duration={3}
                          />
                          <p className="text-gray-500 ms-1 mb-0">Clients</p>
                        </h6>
                      </div>
                      <div className="text-center me-2">
                        <h6 className="me-5 d-flex align-items-center">
                          <CountUp
                            end={Number(
                              profileheaderData?.data?.counts
                                ?.profile_completion
                            )}
                            suffix="%"
                            duration={3}
                          />
                          <p className="text-gray-500 ms-1 mb-0">Completed</p>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex overflow-auto position-relative">
              <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
                <li className="nav-item">
                  <Link
                    className={`nav-link text-active-primary border-bottom-2  me-10 ms-0 pt-4 pb-3 ${
                      tablinks === "overview" ? "border-primarytab" : ""
                    }`}
                    href="?tab=overview"
                  >
                    Overview
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link text-active-primary border-bottom-2  me-10 ms-0 pt-4 pb-3 ${
                      tablinks === "portfolio" ? "border-primarytab" : ""
                    }`}
                    href="?tab=portfolio"
                  >
                    Portfolio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link text-active-primary border-bottom-2  me-10 ms-0 pt-4 pb-3 ${
                      tablinks === "review" ? "border-primarytab" : ""
                    }`}
                    href="?tab=review"
                  >
                    Review
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
