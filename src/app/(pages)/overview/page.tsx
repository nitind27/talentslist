"use client";

import { getprofileinformation } from "@/api/profile/get_profile_information";
import { Iprofile } from "@/api/profile/types";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Overview from "@/components/profile/components/Overview";

import React from "react";

interface ProfileProps {
  searchParams: {
    tab?: any;
  };
}

const page = async ({ searchParams }: ProfileProps) => {
  const data = await getprofileinformation();

  return (
    <div className="container mx-auto">
      <ProfileHeader
        // context={{
        //   searchParams: {
        //     tab: searchParams.tab,
        //   },
        // }}
        profileheaderData={data}
      />
      <Overview profileheaderData={data} />
    </div>
  );
};

export default page;
