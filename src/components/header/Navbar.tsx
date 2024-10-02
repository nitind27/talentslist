"use client";
import clsx from "clsx";

import { HeaderUserMenu, ThemeModeSwitcher } from "@/_metronic/partials";
import { KTIcon, toAbsoluteUrl } from "@/_metronic/helpers";
import HeaderNotificationsMenu from "@/_metronic/partials/layout/header-menus/HeaderNotificationsMenu";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Iprofile } from "@/api/profile/types";
import { getprofileinformationClient } from "@/api/profile/get_profile_information";
import { ManageProfileImageContext } from "../profile/lists/profile/ProfileImage.tsx/ProfileImageProvider";
import { useLayout } from "@/layout/core";

const itemClass = "ms-1 ms-md-4";
const btnClass = "btn btn-icon btn-active-light-primary btn-custom";
const userAvatarClass = "symbol-35px";
const btnIconClass = "fs-1";

const Navbar = () => {
  const { config } = useLayout();

  const [profileHeader, setProfileHeader] = useState<Iprofile | null>(null);
  const { profileImage } = useContext(ManageProfileImageContext);

  useEffect(() => {
    const fetchProfileInformation = async () => {
      const response = await getprofileinformationClient();
      const profilesinfo = response;
      setProfileHeader(profilesinfo);
    };

    console.log("Fetching profile information...");
    fetchProfileInformation();
  }, []);

  return (
    <div className="app-navbar flex-shrink-0">
      <div className={clsx("app-navbar-item", itemClass)}>
        <div
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
          className={btnClass}
        >
          <KTIcon
            iconType="duotone"
            iconName="notification-status"
            className={btnIconClass}
          />
        </div>
        <HeaderNotificationsMenu />
      </div>

      <div className={clsx("app-navbar-item", itemClass)}>
        <ThemeModeSwitcher
          toggleBtnClass={clsx("btn-active-light-primary btn-custom")}
        />
      </div>

      <div className={clsx("app-navbar-item", itemClass)}>
        <div
          className={clsx("cursor-pointer symbol", userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
        >
          {profileHeader && profileHeader?.data?.information?.profile_image ? (
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
        <HeaderUserMenu />
      </div>
    </div>
  );
};

export { Navbar };
