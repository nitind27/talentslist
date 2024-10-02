import { getAvailability, getCancellation, getPlatform, getServices } from "@/api/services/services";
import AddServices from "@/components/services/AddServices";
import BookingServices from "@/components/services/BookingServices";
import Bookingdays from "@/components/services/Bookingdays";
import Cancellation from "@/components/services/Cancellation";
import Platform from "@/components/services/Platform";
import Link from "next/link";
import React from "react";

async function fetchAvailability() {
  const response = await getAvailability();
  const availabilitySlots: any = response?.data?.data?.availability_slot;

  if (!availabilitySlots || typeof availabilitySlots !== 'object') {
    console.error('Invalid availabilitySlots:', availabilitySlots);
    return [];
  }
  
  const days = Object.keys(availabilitySlots);
  const parsedData = days.map((day) => {
    if (!availabilitySlots[day]) {
      console.warn(`No availability slots for day: ${day}`);
      return null;
    }

    const slots = availabilitySlots[day].map((slot: { start_time: string; end_time: string; }) => {
      if (!slot.start_time || !slot.end_time) {
        console.warn(`Invalid slot data for day: ${day}`, slot);
        return null;
      }

      return {
        from: slot.start_time,
        to: slot.end_time,
      };
    }).filter(Boolean);  // Filter out any null values from invalid slots

    if (slots.length === 0) {
      console.warn(`No valid slots for day: ${day}`);
      return null;
    }

    return {
      day,
      from: slots[0].from,
      to: slots[0].to,
      slots,
    };
  }).filter(Boolean);  // Filter out any null values from invalid days

  return parsedData;
}

const services = async (context:{
  searchParams?: {
    page?:string;
    per_page?: number;
  }
}) => {
  const servicesData  = await getServices({
    page: Number(context.searchParams?.page || 1),
    per_page: Number(context.searchParams?.per_page || 10),
    // per_page: Number(context.searchParams?.page || 10)
  })


  const response = await getPlatform();
  const platformData = response.data;

  const cancellationresponse = await getCancellation();
  const cancellationData = cancellationresponse.data;

  // const servicesresponse = await getServices();
  // const servicesData = servicesresponse;

  const availabilityData: any = await fetchAvailability();

  return (
    <>
      <div className="app-toolbar py-lg-6 py-3">
        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
          <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
            Services
          </h1>
          <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
            <li className="breadcrumb-item text-muted">
              <Link href="dashboard" className="text-muted text-hover-primary">
                Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item text-muted">-</li>
            <li className="breadcrumb-item text-muted">Services</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-8">
          <div>
            <AddServices servicesData={servicesData}/>
          </div>
        </div>
        <div className="col-xl-4">
          <BookingServices availabilityData={availabilityData}/>
          <Bookingdays />
          <Platform PlatformData={platformData} />
          <Cancellation cancellationData={cancellationData} />
        </div>
      </div>
    </>
  );
};

export default services;