"use client"
import React, { useState } from "react";
import { KTIcon } from "@/_metronic/helpers";
import Link from "next/link";

interface AvailabilityTableProps {
  availabilityData: Availability[];
}
interface Slot {
  from: string;
  to: string;
}

interface Availability {
  day: string;
  from: string;
  to: string;
  slots: Slot[];
}
const BookingServices: React.FC<AvailabilityTableProps> = ({ availabilityData }) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const toggleMenu = (day: string) => {
    setSelectedDay(selectedDay === day ? null : day);
  };

  return (
    <div className="card mb-5 mb-xl-10">
      <div className="card-header">

        <div className="card-title m-0">
          <h4 className="fw-bold m-0 d-flex gap-3">
            <KTIcon iconName="calendar" iconType="duotone" className="fs-2" />
            Booking Availability
          </h4>
        </div>
        <div className="card-toolbar">
          <div className="me-0">
            <button className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary menu-dropdown">
              <Link href='/edit-availability'>
                <KTIcon iconName="pencil" iconType="duotone" className="fs-4 cursor-pointer" /></Link>
            </button>
          </div>
        </div>
      </div>
      <div className="card-body p-9 pt-5 pb-5 table-responsive">
        <table className="table align-middle table-row-dashed fs-6 mb-0" id="withdrawals_section">
          <thead>
            <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
              <th className="max-w-100px">Day</th>
              <th className="max-w-80px">From</th>
              <th className="max-w-30px">To</th>
              <th className="max-w-20px">Details</th>
            </tr>
          </thead>
          <tbody className="fw-bold text-gray-600">
              {availabilityData.map((availability, index) => (
                <tr key={index}>
                  <td>
                    <div className="text-gray-600 text-hover-primary">
                      {availability.day}
                    </div>
                  </td>
                  <td>{availability.from}</td>
                  <td>{availability.to}</td>
                  <td>
                    {availability.slots.length > 1 && (
                      <div className="dropdown">
                        <button
                          className="border-0 bg-transparent btn-active-color-primary text-blue"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                          data-kt-menu-overflow="true"
                          onClick={() => toggleMenu(availability.day)}
                        >
                          <KTIcon iconName='eye' iconType='duotone' className='fs-1 text-gray-500' />
                        </button>
                        {selectedDay === availability.day && (
                          <div
                            className="menu menu-sub menu-sub-dropdown   menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold  p-2"
                            data-kt-menu="true"
                            style={{ display: 'block', position: 'absolute' }}
                          >
                            <table className="table  align-middle table-row-dashed fs-6">  
                              <thead>
                                <tr className="text-start text-gray-300 px-1 fw-bold fs-7 text-uppercase gs-0">
                                  <th className="min-w-50px">From</th>
                                  <th className="min-w-50px">To</th>
                                </tr>
                              </thead>
                              <tbody className="fw-bold text-gray-500">
                                {availability.slots.map((slot, Index) => (
                                  <tr key={Index}>
                                    <td>{slot.from}</td>
                                    <td>{slot.to}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>

    </div>

  );
};

export default BookingServices;
