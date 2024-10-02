"use client";
import React, { useEffect, useState } from "react";
import ListsReviewWidget1 from "../lists/review/ListsReviewWidget1";
import ListsReviewWidget2 from "../lists/review/ListsReviewWidget2";
import ListsReviewWidget3 from "../lists/review/ListsReviewWidget3";
import { getprofilereviewpendingrequest } from "@/api/profile/get_profile_information";
import { IReviewRequest } from "@/api/profile/types";

const Review = ({ profilereview }: { profilereview: any }) => {
  const [profileReviewrequest, setProfileReviewrequest] =
    useState<IReviewRequest | null>(null);

  const fetchProfileInformation = async () => {
    const response = await getprofilereviewpendingrequest();
    const profilesinfo = response;
    setProfileReviewrequest(profilesinfo);
  };
  useEffect(() => {
    fetchProfileInformation();
  }, []);

  return (
    <div>
      <div className="row mt-8">
        <div className="col-lg-8">
          <ListsReviewWidget1 data={profilereview} />
        </div>
        <div className="col-lg-4">
          <ListsReviewWidget2 reviews={profilereview} />
          <ListsReviewWidget3
            reviews={profileReviewrequest}
            onDataUpdate={fetchProfileInformation}
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
