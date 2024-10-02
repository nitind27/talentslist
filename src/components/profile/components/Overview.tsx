"use client";
import React, { useEffect, useState } from "react";
import ListsProfileInfoWidget3 from "../lists/profile/ListsProfileInfoWidget4";
import ListsAppearanceWidget5 from "../lists/profile/ListsAppearanceWidget5";
import ListsProfileEduWidget6 from "../lists/profile/ListsProfileEduWidget6";
import ListsProfileExperienceWidget8 from "../lists/profile/ListsProfileExperienceWidget8";
import ListsProfileSMWidget10 from "../lists/profile/ListsProfileSMWidget10";
import ListsProfileWidget3 from "../lists/profile/ListsProfileWidget3";
import {
  getprofileappearancedata,
  getprofileinformationClient,
} from "@/api/profile/get_profile_information";
import {
  INationality,
  Iprofile,
  IprofileAppearance,
} from "@/api/profile/types";
import { getNationality } from "@/api/profile/languages/get_languages";

interface ProfileHeaderProps {
  profileheaderData: Iprofile;
}

const Overview = ({ profileheaderData }: ProfileHeaderProps) => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<Iprofile | null>(null);
  const [appearancedatas, setAppearancedata] =
    useState<IprofileAppearance | null>(null);
  const [nationality, setNationality] = useState<INationality[]>([]);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getprofileinformationClient();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);
  useEffect(() => {
    const fetchAppearancedata = async () => {
      const response = await getprofileappearancedata();
      setAppearancedata(response.data);
    };
    fetchAppearancedata();
  }, []);

  useEffect(() => {
    const fetchNationality = async () => {
      try {
        const response = await getNationality();
        setNationality(response.data);
      } catch (error) {
        console.error("Error fetching nationalities:", error);
      }
    };
    fetchNationality();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row gy-5 gx-xl-8 ">
      <div className="col-xxl-6">
        <div className="mt-8">
          <ListsProfileInfoWidget3
            full_name={profileData?.data?.information?.full_name || "-"}
            first_name={profileData?.data?.information.first_name || "-"}
            last_name={profileData?.data?.personal_information.last_name || "-"}
            stage_name={
              profileData?.data?.personal_information?.stage_name || "-"
            }
            sname_visible={
              profileData?.data?.personal_information?.sname_visible == 0
                ? 0
                : 1 || "-"
            }
            gender={profileData?.data?.personal_information?.gender || "-"}
            aboutme={profileData?.data?.personal_information?.aboutme || "-"}
            birth_date={
              profileData?.data?.personal_information?.birth_date || "-"
            }
            language={profileData?.data?.personal_information?.language || "-"}
            username={profileData?.data?.personal_information?.username || "-"}
            review={undefined}
            data={undefined}
            status={false}
            consumer_id={0}
            message={""}
            degree={[]}
            personal_information={""}
            citizenship={
              profileData?.data?.location_and_travel?.citizenship || "-"
            }
            location={profileData?.data?.location_and_travel?.location || "-"}
            available_to_travel={
              profileData?.data?.location_and_travel?.available_to_travel || "-"
            }
            preferred_countries={
              profileData?.data?.location_and_travel?.preferred_countries || "-"
            }
            city={profileData?.data?.location_and_travel.city || "-"}
            country={profileData?.data?.location_and_travel.country || "-"}
            nationality={undefined}
          />
        </div>

        <div className="mt-5">
          <ListsProfileEduWidget6 profileheaderData={profileheaderData} />
        </div>
        <div className="mt-5">
          <ListsProfileExperienceWidget8
            profileheaderData={profileheaderData}
          />
        </div>
      </div>
      <div className="col-xxl-6">
        <div className="mt-8">
          <ListsProfileWidget3
            citizenship={
              profileData?.data?.location_and_travel.citizenship || "-"
            }
            available_to_travel={
              profileData?.data?.location_and_travel?.available_to_travel == 0
                ? 0
                : 1 || "-"
            }
            location={profileData?.data?.location_and_travel?.location || "-"}
            preferred_countries={
              profileData?.data?.location_and_travel?.preferred_countries || "-"
            }
            country={profileData?.data?.location_and_travel?.country || "-"}
            city={profileData?.data?.location_and_travel?.city || "-"}
            review={undefined}
            data={undefined}
            status={false}
            consumer_id={0}
            message={""}
            degree={[]}
            personal_information={""}
            stage_name={undefined}
            full_name={""}
            first_name={""}
            last_name={""}
            sname_visible={0}
            birth_date={""}
            gender={""}
            aboutme={""}
            language={[]}
            username={""}
            nationality={nationality}
          />
        </div>
        <div className="mt-5">
          <ListsAppearanceWidget5
            height={profileData?.data?.appearance?.height || "-"}
            weight={profileData?.data?.appearance?.weight || "-"}
            chest={profileData?.data?.appearance?.chest || " -"}
            ethnicity={profileData?.data?.appearance?.ethnicity || "-"}
            skincolor={profileData?.data?.appearance?.skin || "-"}
            eyecolor={profileData?.data?.appearance?.eye || "-"}
            waist={profileData?.data?.appearance?.waist || "-"}
            hairtype={profileData?.data?.appearance?.hair_type || "-"}
            haircolor={profileData?.data?.appearance?.hair_type || "-"}
            hairlength={profileData?.data?.appearance?.hair_length || "-"}
            shoesize={profileData?.data?.appearance?.shoe_size || "-"}
            appearancedatas={appearancedatas}
          />
        </div>

        <div className="mt-5">
          <ListsProfileSMWidget10 />
        </div>
      </div>
    </div>
  );
};

export default Overview;
