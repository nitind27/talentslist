
import Link from 'next/link';
import React from 'react';
import { getbookingsCode } from '@/api/Booking/getbookingsCounts';
import { bookingStatusMap, IBookingCode } from '@/api/Booking/types';
import Image from 'next/image';
import { ErrorsLayout } from '../Error/ErrorsLayout';


const BookingAccepted = async ({ booking_code, getbookingcode }: { booking_code: string, getbookingcode: IBookingCode}) => {
   
    const Data = getbookingcode?.data;
    const status = bookingStatusMap[Data.booking_status_id] || { title: 'Unknown', state: 'secondary' };
    const payment = Data.payments[0] || {};
    const brandLogoPath = payment.brand ? `/media/card-logos/${payment.brand.toLowerCase()}.svg` : '';
    return (
        <div className='card mb-xxl-8 mb-5'>
            <div className='card-body pt-9 pb-9'>
                <label className='custom-text'>BOOKING CODE - {Data?.booking_code}</label>
                <div className=" d-flex align-items-center gap-10 border-bottom pb-4 justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                        <span className="withdrawal_amount">${Data?.amount || "-"}</span>
                        <span className="usd">USD</span>
                        <span className="py-2 px-3 badge text-bg-light-success rounded-1">{status.title}</span>
                    </div>
                    <div className=" text-end">
                        <button type="submit" className="btn btn-sm bg-blue">
                            <span className="text-white">Complete</span>
                        </button>
                    </div>
                </div>

                <div className='d-flex pt-4 pb-4'>
                    <div className='pe-5 d-flex flex-column'>
                        <label className='custom-text'>Booking date</label>
                        <span className='mt-1'>{Data?.booking_date || "-"}</span>
                    </div>
                    <div className='px-5 border-start border-end d-flex flex-column'>
                        <label className='custom-text'>Client</label>
                        <span className=''>
                            <Link href='#' className='mt-1 text-gray-900 fs-6 fw-bold'>{Data?.client?.first_name || "-"}{" "}{Data?.client?.last_name}</Link>
                        </span>
                    </div>
                    <div className='ps-5 d-flex flex-column'>
                        <label className='custom-text'>Payment method</label>
                        <span className='mt-1'>
                            {brandLogoPath && (
                                <Image src={brandLogoPath} width={35} height={35} alt={`${payment.brand} logo`} />
                            )}{" "}
                            {payment.last4 ? `****${payment.last4}` : "-"}
                        </span>
                    </div>
                </div>

                <div className='pb-4 pt-5'>
                    <label className="fs-2 w-100 fw-bold border-bottom pb-4">Client details</label>
                    <div className='pt-5'>

                        <div className="d-flex pb-3" >
                            <label className="talent_fees_label">Company:</label>
                            <span className="talent_fees_span">{Data?.client_info.company_name || "-"}</span>
                        </div>
                        <div className="d-flex pb-3" >
                            <label className="talent_fees_label">Position:</label>
                            <span className="talent_fees_span">{Data?.client_info.position || "-"}</span>
                        </div>
                        <div className="d-flex pb-3" >
                            <label className="talent_fees_label">Email:</label>
                            <span className="talent_fees_span">{Data?.client.email || "-"}</span>
                        </div>
                        <div className="d-flex pb-3" >
                            <label className="talent_fees_label">Phone:</label>
                            <span className="talent_fees_span">{Data?.client.phone || "-"}</span>
                        </div>
                        <div className="d-flex pb-3" >
                            <label className="talent_fees_label">Address:</label>
                            <span className="talent_fees_span">{Data?.client.address || "-"}</span>
                        </div>
                        <div className="d-flex" >
                            <label className="talent_fees_label">About:</label>
                            <span className="talent_fees_span">{Data?.client_info.aboutme || "-"}</span>
                        </div> 

                    </div>
                </div>
                <div className='pb-4 pt-5'>
                    <label className="fs-2 w-100 fw-bold border-bottom pb-4">Payment details</label>
                    <div className='pt-5'>

                        <div className="d-flex pb-3" >
                            <label className="talent_fees_label">$ 100 x 1 Quantity:</label>
                            <span className="talent_fees_span">{Data?.service_price || "-"}</span>
                        </div>
                        <div className="d-flex" >
                            <label className="talent_fees_label">Total:</label>
                            <span className="talent_fees_span">{Data?.amount || "-"}</span>
                        </div>

                    </div>
                </div>
                <div className='pt-5'>
                    <label className="fs-2 w-100 fw-bold border-bottom pb-4">Booking details</label>
                    <div className='pt-5'>

                        <div className="d-flex pb-3" >
                            <label className="talent_fees_label">Service Name:</label>
                            <span className="talent_fees_span">{Data?.talent_packages.title || "-"}</span>
                        </div>
                        <div className="d-flex pb-3" >
                            <label className="talent_fees_label">Event type:</label>
                            <span className="talent_fees_span">{Data?.events_type?.name || "-"}</span>
                        </div>

                        <div className="d-flex pb-3" >
                            <label className="talent_fees_label">Booking time:
                            </label>
                            <div>
                                <span className="talent_fees_span">{Data?.start_time} - {Data?.end_time}</span>
                                <div className="talent_fees_span">({Data?.time_zone})</div>
                            </div>

                        </div>
                        <div className="d-flex pb-3">
                            <label className="talent_fees_label">Going to be:</label>
                            <span className="talent_fees_span">{Data?.talent_packages.type || "-"}</span>
                        </div>
                        {Data?.talent_packages.type === 'online' ? (
                            <>
                                <div className="d-flex pb-3">
                                    <label className="talent_fees_label">Online platform:</label>
                                    <span className="talent_fees_span">{Data?.online_platform || "-"}{""}
                                        <span className='cursor-pointer' dangerouslySetInnerHTML={{ __html: Data?.online_platform_icon }} />
                                    </span>
                                </div>
                                <div className="d-flex">
                                    <label className="talent_fees_label">Online platform id:</label>
                                    <span className="talent_fees_span">{Data?.service_price || "-"}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="d-flex pb-3">
                                    <label className="talent_fees_label">Address:</label>
                                    <span className="talent_fees_span">{Data?.venue || "-"}</span>
                                </div>
                                <div className="d-flex pb-3">
                                    <label className="talent_fees_label">City:</label>
                                    <span className="talent_fees_span">{Data?.city || "-"}</span>
                                </div>
                                <div className="d-flex pb-3">
                                    <label className="talent_fees_label">Country:</label>
                                    <span className="talent_fees_span">{Data?.country || "-"}</span>
                                </div>
                                <div className="d-flex">
                                    <label className="talent_fees_label">Pincode:</label>
                                    <span className="talent_fees_span">{Data?.postal_code || "-"}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div >

    );
}

export default BookingAccepted;
