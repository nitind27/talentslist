

import ProfileDetail from "@/components/Settings/ProfileDetail";
import Settings from "@/components/Settings/Settings";
import Link from "next/link";
import React from "react";

interface SettingProps {
  searchParams: {
    tab?: any;
  };
}
const settings =  ({ searchParams }: SettingProps) => {
  return (
    <>
      <div className="app-toolbar py-3 py-lg-6 ">
        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3 my-7">
          <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
            Settings
          </h1>
          <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
            <li className="breadcrumb-item text-muted">
              <Link href="/dashboard" className="text-muted text-hover-primary">
                Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item text-muted">-</li>
            <li className="breadcrumb-item text-muted">Settings</li>
          </ul>
        </div>
      </div>
      <div className="d-flex flex-column flex-lg-row">
        <ProfileDetail />
        <Settings searchParams={{
          tab: searchParams.tab
        }} />
      
      </div>
    </>
  );
};

export default settings;
