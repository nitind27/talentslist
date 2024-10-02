import React from "react";
import { KTIcon } from "@/_metronic/helpers";
import { getTravelDetails } from "@/api/services/services";


const BookingDays = async () => {
  const response = await getTravelDetails();
  const travelData = response.data;
  return (
    <div className="card mb-5 mb-xxl-10">
      <div className="card-header">
        <div className="card-title m-0">
          <h4 className="fw-bold m-0 d-flex gap-3"><KTIcon iconName="map" iconType="duotone" className="fs-2" />
            Travel Preferences
          </h4>
        </div>
      </div>
      <div className="card-body p-9 pt-5 pb-5">
        <div className="row">
          <label className="col-lg-4 fw-semibold text-muted">Location</label>
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">{travelData.data}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDays;