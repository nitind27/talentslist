import { getbookingsCode } from '@/api/Booking/getbookingsCounts';
import BookingAccepted from '@/components/Booking/bookingAccepted';
import BookingAutoRejected from '@/components/Booking/bookingAutoRejected';
import BookingCancelled from '@/components/Booking/bookingCancelled';
import BookingPending from '@/components/Booking/bookingPending';
import BookingReject from '@/components/Booking/bookingReject';
import BookingUpcoming from '@/components/Booking/bookingUpcoming';
import BookingViewCompleted from '@/components/Booking/bookingViewCompleted';
import { ErrorsLayout } from '@/components/Error/ErrorsLayout';
import Link from 'next/link';
import React from 'react';


const Page  = async ({ params }: { params: { booking_code: string, status: string } }) => {

    const getBookingresponse =await getbookingsCode(params.booking_code);
    if (getBookingresponse.error) {
        return <><ErrorsLayout/></>;
      }
    const getbookingcode = getBookingresponse.data;
    let statusComponent;

    switch (params.status) {
        case "1":
            statusComponent = <BookingPending booking_code={params.booking_code} getbookingcode={getbookingcode}/>;
            break;
        case "2":
            statusComponent = <BookingUpcoming booking_code={params.booking_code} getbookingcode={getbookingcode} />;
            break;
        case "3":
            statusComponent = <BookingViewCompleted booking_code={params.booking_code} getbookingcode={getbookingcode} />;
            break;
        case "4":
            statusComponent = <BookingCancelled booking_code={params.booking_code} getbookingcode={getbookingcode} />;
            break;
        case "5":
            statusComponent = <BookingReject booking_code={params.booking_code} getbookingcode={getbookingcode} />;
            break;
        case "6":
            statusComponent = <BookingAccepted booking_code={params.booking_code} getbookingcode={getbookingcode} />;
            break;
        case "7":
            statusComponent = <BookingAutoRejected booking_code={params.booking_code} getbookingcode={getbookingcode} />;
            break;
        default:
            statusComponent = null;
            break;
    }

    return (
        <>
            <div className="app-toolbar py-3 py-lg-6">
                <div className="d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
                            Booking
                        </h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-muted">
                                <Link href="/dashboard" className="text-muted text-hover-primary">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="breadcrumb-item text-muted">-</li>
                            <li className="breadcrumb-item text-muted">
                                <Link href="/bookings" className="text-muted text-hover-primary">
                                    Booking
                                </Link>
                            </li>
                            <li className="breadcrumb-item text-muted">-</li>
                            <li className="breadcrumb-item text-muted">Booking details</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                {statusComponent !== undefined && (
                    <div>
                        {typeof statusComponent === 'string' ? (
                            <div>{statusComponent}</div>
                        ) : (
                            statusComponent
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Page;
