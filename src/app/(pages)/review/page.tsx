"use client";

import Review from "@/components/profile/components/Review";
import React from "react";

interface ProfileHeaderProps {
  searchParams: {
    tab?: string;
  };
}

const page = ({ searchParams }: ProfileHeaderProps) => {
  return (
    <div id="kt_app_content" className="app-content flex-column-fluid">
      <div
        id="kt_app_content_container"
        className="app-container container-xxl container-fluid"
      >
        {/* <ProfileHeader
          context={{
            searchParams: {
              tab: searchParams.tab,
            },
          }}
          profileheaderData={profileheaderData}
        /> */}

        <Review profilereview={undefined} />
      </div>
    </div>
  );
};

export default page;
