import { Ibookingcount } from "@/api/Booking/types";
import Link from "next/link";
import React, { useState } from "react";
import { BookingStatusKey } from "./Booking";

interface BookingCountProps {
  selectedStatusId: number;
  countsData: Ibookingcount;
  activeStatus: BookingStatusKey;
}

const BookingCount: React.FC<BookingCountProps> = ({
  countsData,
  selectedStatusId,
}) => {
  console.log("selectedStatusId ", selectedStatusId);
  return (
    <div>
      <div className="card-header border-0 pt-6 flex-column table-responsive filter_parent_div">
        <div className="error_message"></div>
        <div className="status_for_filter">
          {countsData?.statuses?.length &&
            countsData?.statuses.map((status) => (
              <Link
                href={`?status_id=${status.id}`}
                key={status.status}
                className={`btn me-2 ${status.status.toLowerCase()} bg-white rounded mb-3 ${
                  selectedStatusId === status.id ? "active" : ""
                }`}
                // onClick={() => handleStatusClick(status)}
              >
                <div
                  className="status_text"
                  style={{
                    color: selectedStatusId === status.id ? "white" : "",
                  }}
                >
                  {status.status}
                </div>
                <div
                  className="status_count"
                  style={{
                    color: selectedStatusId === status.id ? "white" : "",
                  }}
                >
                  {status.count}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookingCount;