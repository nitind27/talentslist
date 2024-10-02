
import In_activeService from '@/components/EditAvailability/In_activeService'
import EditAvailabilityTable from '@/components/EditAvailability/EditAvailabilityTable'

import BookingDays from '@/components/services/Bookingdays'
import Cancellation from '@/components/services/Cancellation'
import Platform from '@/components/services/Platform'
import Link from 'next/link'
import React from 'react'
import { getAvailability, getCancellation, getPlatform } from '@/api/services/services'

const page = async () => {
  const response = await getPlatform();
  const platformData = response.data;

  const cancellationresponse = await getCancellation();
  const cancellationData = cancellationresponse.data;

  const availabilityresponse = await getAvailability();
  const availabilitData = availabilityresponse.data;
  return (
    <div>
       <div className="">
        
        <div className="app-toolbar py-lg-6 py-3">
          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
            Availability 
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li className="breadcrumb-item text-muted">
                <Link href="dashboard" className="text-muted text-hover-primary">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item text-muted">-</li>
              <Link href='/services' className="breadcrumb-item text-muted text-hover-primary">Services</Link>
              <li className="breadcrumb-item text-muted">-</li>
              <li className="breadcrumb-item text-muted">EditAvailability </li>
            </ul>
          </div>
        </div>
        <div className="row">
        <div className="col-xl-8">
          <div>
            <EditAvailabilityTable availabilityData={availabilitData}/>
          </div>
        </div>
        <div className="col-xl-4">
          <In_activeService/>
          <BookingDays />
          <Platform PlatformData={platformData} />
          <Cancellation cancellationData={cancellationData}/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default page