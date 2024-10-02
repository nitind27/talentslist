"use client";
import React, { useState, createContext } from "react";

interface IManageprofileImageUiInitial {
  profileImage: string;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
}

export const ManageProfileImageContext =
  createContext<IManageprofileImageUiInitial>({
    profileImage: "",
    setProfileImage: () => {},
  });

const ProfileImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileImage, setProfileImage] = useState<string>("");

  return (
    <ManageProfileImageContext.Provider
      value={{ profileImage, setProfileImage }}
    >
      {children}
    </ManageProfileImageContext.Provider>
  );
};

export default ProfileImageProvider;
