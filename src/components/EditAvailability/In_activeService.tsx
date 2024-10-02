import { Booking_Service } from "@/api/Dashboard/Dashboard";
import Link from "next/link";
import React from "react";

const In_activeService = async () => {
  // Total number of services
  // const totalServices = 10;
  // // Number of active services
  // const activeServices = 7;
  // // Number of inactive services
  // const inactiveServices = 3;


  const response = await Booking_Service();
  const totalServices = response.data.all;
  const activeServices = response.data.active;
  const inactiveServices = response.data.inactive;


  // Calculate percentages for active and inactive services
  const activePercentage = (activeServices / totalServices) * 100;
  const inactivePercentage = (inactiveServices / totalServices) * 100;

  return (
    <>
      <div className="card mb-5 mb-xxl-10">
        <div className="card-header" style={{ padding: "10px", paddingLeft: "14px" }}>
          <div className="row">
            <div className="mb-0 fs-4">Services {totalServices}</div>
          </div>
        </div>
        <div className="card-body px-5 py-2">
          <div className="text-50 mb-5">
            <div className="mb-4pt">
              <p className="d-flex align-items-center justify-content-between text-gray-500 mb-0">
                <small className="flex fs-6">Active Service</small>
                <small className="fs-5">{activeServices}</small>
              </p>
              <div className="progress" style={{ height: "4px", backgroundColor: "#ccc" }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${activePercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4pt">
              <p className="d-flex align-items-center justify-content-between text-gray-500 mb-0">
                <small className="flex fs-6">Inactive Service</small>
                <small className="fs-5">{inactiveServices}</small>
              </p>
              <div className="progress" style={{ height: "4px", backgroundColor: "#ccc" }}>
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: `${inactivePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/services" className="btn btn-sm fs-6 btn-primary mb-3">
              View Services
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default In_activeService;
