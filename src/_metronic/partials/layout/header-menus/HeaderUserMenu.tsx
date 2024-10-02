"use client";
import { FC, useContext, useEffect, useState } from "react";
import { toAbsoluteUrl } from "../../../helpers";
import Link from "next/link";
import Image from "next/image";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { logout } from "@/api/auth/auth";
import { getprofileinformationClient } from "@/api/profile/get_profile_information";
import { Iprofile } from "@/api/profile/types";
import { ManageProfileImageContext } from "@/components/profile/lists/profile/ProfileImage.tsx/ProfileImageProvider";

const HeaderUserMenu: FC = () => {
  const router = useRouter();

  const [profileHeader, setProfileHeader] = useState<Iprofile | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileInformation = async () => {
      const response = await getprofileinformationClient();
      setProfileHeader(response);
      console.log("Profile data", response);
    };

    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setEmail(session.user?.email || null);
      }
    };

    fetchProfileInformation();
    fetchSession();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    sessionStorage.removeItem("userEmail");
    router.push("/login");
  };
  const { profileImage } = useContext(ManageProfileImageContext);

  return (
    <div
      className="menu  menu-sub  menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-350px"
      data-kt-menu="true"
    >
      <div className="menu-item bg-transparent px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            {profileHeader &&
            profileHeader?.data?.information?.profile_image ? (
              <Image
                src={
                  profileImage
                    ? profileImage
                    : profileHeader?.data?.information?.profile_image
                }
                alt="Profile Image"
                width={100}
                height={100}
              />
            ) : (
              <Image
                src={toAbsoluteUrl("/media/avatars/blank.png")}
                alt="Profile"
                width={100}
                height={100}
              />
            )}
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">
              <span className=" fs-5 py-1">
                {profileHeader && profileHeader?.data?.information?.full_name}
              </span>
            </div>
            <div className="fw-bold text-muted text-hover-primary fs-7">
              <p>{email || "email"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="separator my-2"></div>

      <div className="menu-item bg-transparent px-5">
        <Link href="/settings?tab=overview" className="menu-link px-5">
          Settings
        </Link>
      </div>
      <div className="menu-item  bg-transparent px-5">
        <button
          onClick={handleSignOut}
          className="w-100 bg-transparent p-0 border-0"
        >
          <span className="menu-link fw-bold  w-100 px-5">Logout</span>
        </button>
      </div>
    </div>
  );
};

export { HeaderUserMenu };