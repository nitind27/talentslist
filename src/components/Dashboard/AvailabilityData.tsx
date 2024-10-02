"use client";
import { KTIcon } from '@/_metronic/helpers';
import Link from 'next/link';
import React, { useState } from 'react';

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

interface AvailabilityTableProps {
  availabilityData: Availability[];
  expiredAt: string;
}

const AvailabilityTable: React.FC<AvailabilityTableProps> = ({ availabilityData, expiredAt }) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const toggleMenu = (day: string) => {
    setSelectedDay(selectedDay === day ? null : day);
  };

  return (
    <div className="col-xl-6">
      <div className="card card-flush mb-8">
        <div className="card-header pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold">
              Availability
            </span>
            <span className="text-gray-300 pt-1 fw-semibold fs-6">
              People can book you till {expiredAt}
            </span>
          </h3>
          <div className="card-toolbar">
            <button
              className="btn btn-icon btn-color-gray-400 btn-active-color-primary justify-content-end align-items-start"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-overflow="true"
            >
              <KTIcon iconName='dots-square' iconType='duotone' className='fs-1 text-gray-300 me-n1' />
            </button>
            <div
              className="menu  menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px"
              data-kt-menu="true"
            >
              <div className="menu-item px-3 bg-transparent ">
                <Link href="/edit-availability" className="menu-link px-3">
                  Update availability
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body pb-5 pt-5">
          <table className="table align-middle table-row-dashed fs-6" id="withdrawals_section">
            <thead>
              <tr className="text-start text-gray-300 fw-bold fs-7 text-uppercase gs-0">
                <th className="min-w-125px">Day</th>
                <th className="min-w-100px">From</th>
                <th className="min-w-50px">To</th>
                <th className="min-w-50px">Details</th>
              </tr>
            </thead>
            <tbody className="fw-bold text-gray-500">
              {availabilityData.map((availability, index) => (
                <tr key={index}>
                  <td>
                    <div className="text-gray-300 text-hover-primary">
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
                            className="menu menu-sub menu-sub-dropdown   menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold  p-4"
                            data-kt-menu="true"
                            style={{ display: 'block', position: 'absolute' }}
                          >
                            <table className="table  align-middle table-row-dashed fs-6">  
                              <thead>
                                <tr className="text-start text-gray-300 px-3 fw-bold fs-7 text-uppercase gs-0">
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
    </div >
  );
};

export default AvailabilityTable;
