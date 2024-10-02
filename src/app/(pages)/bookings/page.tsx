import {
  getbookingsCounts,
  getbookingsData,
} from "@/api/Booking/getbookingsCounts";
import Await from "@/components/Await";
import Booking from "@/components/Booking/Booking";
import Loader from "@/components/Loader/Loader ";
import Link from "next/link";
import React, { Suspense } from "react";

const page = async (context: {
  searchParams?: {
    page?: string;
    per_page?: number;
    date?: string;
    status_id?: string;
  };
}) => {
  const data = getbookingsData({
    page: Number(context.searchParams?.page || 1),
    per_page: Number(context.searchParams?.per_page || 10),
    date: context.searchParams?.date || "",
    booking_status: context.searchParams?.status_id || 0,
  });

  const countData = await getbookingsCounts();

  return (
    <div className="">
      <div className="app-toolbar py-3 py-lg-6 ">
        <div className="d-flex flex-stack">
          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
              Booking
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li className="breadcrumb-item text-muted">
                <Link
                  href="dashboard"
                  className="text-muted text-hover-primary"
                >
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item text-muted">-</li>
              <li className="breadcrumb-item text-muted">Booking</li>
            </ul>
          </div>
        </div>
      </div>
      <Suspense
        key={Math.random()}
        fallback={
          // <div className="h-500px animate-pulse">
          //   <div className="d-flex justify-content-center">
          //     <div className="spinner-border" role="status">
          //       <span className="sr-only">Loading</span>
          //     </div>
          //   </div>
          // </div>
          <Loader className="spinner-border d-flex justify-content-center align-item-center"
          containerClassName="d-flex justify-content-center align-item-center"
          />
        }
      >
        <Await promise={data}>
          {(data) => {
            console.log("data a", data);
            return (
              <Booking
                bookingData={data}
                countsData={countData}  
                status_id={
                  context?.searchParams?.status_id ||
                  countData.statuses[0].id.toString()
                }
              />
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default page;
