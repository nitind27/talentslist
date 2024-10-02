import React from "react";
import DeactivateAccount from "./DeactivateAccount";
import Link from "next/link";
import PersonalProfile from "./personalProfile";
import { ManagePassword } from "./ManagePassword";

const Settings = (context: {
  searchParams: {
    tab: string | undefined;
  };
}) => {
  return (
    <div className="flex-lg-row-fluid ms-lg-15">
      <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8">
        <li className="nav-item">
          <Link
            className={`nav-link text-active-primary pb-4 ${
              context.searchParams.tab === "overview" ? "active" : ""
            }`}
            href="?tab=overview"
          >
            Overview
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link text-active-primary pb-4 ${
              context.searchParams.tab === "security" ? "active" : ""
            }`}
            href="?tab=security"
          >
            Security
          </Link>
        </li>
      </ul>
      {!context.searchParams.tab && <PersonalProfile />}
      {context.searchParams.tab === "overview" && <PersonalProfile />}
      {context.searchParams.tab === "security" && (
        <>
          <ManagePassword />
          <DeactivateAccount />
        </>
      )}
    </div>
  );
};

export default Settings;
