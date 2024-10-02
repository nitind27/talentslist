// "use client"
import { toAbsoluteUrl } from "@/_metronic/helpers";
import {
  getprofileinformation,
  getprofilereview,
} from "@/api/profile/get_profile_information";
import ProfileHeader from "@/components/profile/ProfileHeader";

import Overview from "@/components/profile/components/Overview";
import Portfolio from "@/components/profile/components/Portfolio";
import Review from "@/components/profile/components/Review";
import Link from "next/link";

interface ProfileProps {
  searchParams: {
    tab?: string;
  };
}
const Profile = async ({ searchParams }: ProfileProps) => {
  const data = await getprofileinformation();
  const review = await getprofilereview();
  const tablinks = searchParams.tab;

  return (
    <div>
      <div className="app-toolbar py-3 py-lg-6 ">
        <div className="d-flex flex-stack">
          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
              Profile
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li className="breadcrumb-item text-muted">
                <Link
                  href="/dashboard"
                  className="text-muted text-hover-primary"
                >
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item text-muted">-</li>
              <li className="breadcrumb-item text-muted">Profile</li>
            </ul>
          </div>
        </div>
      </div>

      <ProfileHeader
        tablinks={tablinks || "overview"}
        profileheaderData={data}
      />
      {(tablinks === "overview" || !tablinks) && (
        <Overview profileheaderData={data} />
      )}
      {tablinks === "portfolio" && <Portfolio />}
      {tablinks === "review" && <Review profilereview={review} />}
    </div>
  );
};

export default Profile;
