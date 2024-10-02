import React, { useContext } from "react";
import { getSettingsProfile } from "@/api/settings/settings";
import Image from "next/image";
import Link from "next/link";
import { getprofileinformation } from "@/api/profile/get_profile_information";

const ProfileDetail = async () => {
  const response = await getSettingsProfile();
  const profileData = response.data.data;
  const img = await getprofileinformation();

  const profileImage = img?.data?.information?.profile_image;

  return (
    <div className="flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10">
      <div className="card mb-5 mb-xl-8">
        <div className="card-body">
          <div className="d-flex flex-center flex-column">
            <div className="symbol symbol-100px symbol-circle mb-7">
              {profileImage && (
                <Image
                  width={100}
                  height={100}
                  src={profileImage}
                  alt="Profile Image"
                />
              )}
            </div>
          </div>
          <div className="d-flex flex-stack fs-6 py-3">
            <div className="fw-bold">Details</div>
          </div>
          <div className="separator"></div>
          <div id="kt_user_view_details" className="collapse show">
            <div className="pb-5 fs-6">
              <div className="fw-bold mt-5">Name</div>
              <div className="text-gray-500">
                {profileData.info.first_name} {profileData?.info.last_name}
              </div>
              <div className="fw-bold mt-5">Email</div>
              <div className="">
                <Link href="#" className="text-gray-500">
                  {profileData.info.email}
                </Link>
              </div>
              <div className="fw-bold mt-5">Phone</div>
              <div className="text-gray-500">{profileData.info.phone}</div>
              <div className="fw-bold mt-5">Address</div>
              <div className="text-gray-500">
                {profileData.info.address}
                <br />
                {profileData.info.city}
                <br />
                {profileData.info.user_country?.countryName}{" "}
                {/* Assuming you want to display the country name */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
