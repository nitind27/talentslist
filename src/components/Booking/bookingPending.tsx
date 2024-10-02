"use client";
import React, { useState } from "react";
import { getbookingsCode } from "@/api/Booking/getbookingsCounts";
import { bookingStatusMap, IBookingCode } from "@/api/Booking/types";
import Image from "next/image";
import { ErrorsLayout } from "../Error/ErrorsLayout";
import { Button, Modal } from "react-bootstrap";
import Link from "next/link";
import { toast } from "react-toastify";
import { updateAcceptbooking, updateRejectbooking } from "@/api/Booking/getbookingsCounts";
import { useRouter } from "next/navigation";

const BookingPending = ({ booking_code, getbookingcode }: { booking_code: string, getbookingcode: IBookingCode }) => {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");
  const [actionTaken, setActionTaken] = useState(false); // New state to track action
  const router = useRouter();
  
  const bookingData = getbookingcode?.data;
 

  const handleAccept = async () => {
    if (bookingData) {
      
     
      try {
        const response = await updateAcceptbooking(bookingData.booking_code);
        if (response && response.data) {
          toast.success(response.data.message);
          setActionTaken(true); // Hide buttons after successful action
          router.refresh();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error accepting booking:", error);
        toast.error("Failed to accept booking");
      } finally {
        setShowAcceptModal(false);
      }
    }
  };

  const handleReject = async () => {
    if (bookingData) {
      if (rejectReason.length < 5 || rejectReason.length > 800 ) {
        setRejectError("Reject reason must be between 5 and 800 characters.");
        return;
      }
      if (!rejectReason) {
        setRejectError("Please enter reject reason ");
        return;
      }
      try {
        const response = await updateRejectbooking(bookingData.booking_code, rejectReason);
        if (response && response.data) {
          toast.success(response.data.message);
          setActionTaken(true); // Hide buttons after successful action
          router.refresh();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error rejecting booking:", error);
        toast.error("Failed to reject booking");
      } finally {
        setShowRejectModal(false);
      }
    }
  };

  const handleCloseAcceptModal = () => setShowAcceptModal(false);
  const handleCloseRejectModal = () => setShowRejectModal(false);

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  const status = bookingStatusMap[bookingData.booking_status_id] || {
    title: "Unknown",
    state: "secondary",
  };
  const payment = bookingData.payments[0] || {};
  const brandLogoPath = payment.brand ? `/media/card-logos/${payment.brand.toLowerCase()}.svg` : "";

  return (
    <div className="card mb-xxl-8 mb-5">
      <div className="card-body pt-9 pb-9">
        <label className="custom-text">BOOKING CODE - {bookingData.booking_code}</label>
        <div className="d-flex align-items-center gap-10 border-bottom pb-4 justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <span className="withdrawal_amount">${bookingData.amount || "-"}</span>
            <span className="usd">USD</span>
            <span className={`py-2 px-3 badge text-bg-${status.state} rounded-1`}>
              {status.title}
            </span>
          </div>
          {!actionTaken && ( // Conditionally render buttons
            <div className="text-end">
              <button type="button" className="btn btn-sm bg-blue" onClick={() => setShowAcceptModal(true)}>
                <span className="text-white">Accept</span>
              </button>
              <button type="button" className="btn btn-sm bg-danger ms-1" onClick={() => setShowRejectModal(true)}>
                <span className="text-white">Reject</span>
              </button>
            </div>
          )}
        </div>

        <div className="d-flex pt-4 pb-4">
          <div className="pe-5 d-flex flex-column">
            <label className="custom-text">Booking date</label>
            <span className="mt-1">{bookingData.booking_date || "-"}</span>
          </div>
          <div className="px-5 border-start border-end d-flex flex-column">
            <label className="custom-text">Client</label>
            <span className="">
              <Link href="#" className="mt-1 text-gray-900 fs-6 fw-bold">
                {bookingData.client.first_name} {bookingData.client.last_name}
              </Link>
            </span>
          </div>
          <div className="ps-5 d-flex flex-column">
            <label className="custom-text">Payment method</label>
            <span className="mt-1">
              {brandLogoPath && (
                <Image
                  src={brandLogoPath}
                  width={35}
                  height={35}
                  alt={`${payment.brand} logo`}
                />
              )}{" "}
              {payment.last4 ? `****${payment.last4}` : "-"}
            </span>
          </div>
        </div>

        <div className="pb-4 pt-5">
          <label className="fs-2 w-100 fw-bold border-bottom pb-4">
            Client details
          </label>
          <div className="pt-5">
            <div className="d-flex pb-3">
              <label className="talent_fees_label">Company:</label>
              <span className="talent_fees_span">
                {bookingData.client_info.company_name || "-"}
              </span>
            </div>
            <div className="d-flex pb-3">
              <label className="talent_fees_label">Position:</label>
              <span className="talent_fees_span">
                {bookingData.client_info.position || "-"}
              </span>
            </div>
            <div className="d-flex pb-3">
              <label className="talent_fees_label">Email:</label>
              <span className="talent_fees_span">{bookingData.client.email || "-"}</span>
            </div>
            <div className="d-flex pb-3">
              <label className="talent_fees_label">Phone:</label>
              <span className="talent_fees_span">{bookingData.client.phone || "-"}</span>
            </div>
            <div className="d-flex pb-3">
              <label className="talent_fees_label">Address:</label>
              <span className="talent_fees_span">{bookingData.client.address || "-"}</span>
            </div>
            <div className="d-flex">
              <label className="talent_fees_label">About:</label>
              <span className="talent_fees_span">{bookingData.client_info.aboutme || "-"}</span>
            </div>
          </div>
        </div>
        <div className="pb-4 pt-5">
          <label className="fs-2 w-100 fw-bold border-bottom pb-4">
            Payment details
          </label>
          <div className="pt-5">
            <div className="d-flex pb-3">
              <label className="talent_fees_label">$ 100 x 1 Quantity:</label>
              <span className="talent_fees_span">{bookingData.service_price || "-"}</span>
            </div>
            <div className="d-flex">
              <label className="talent_fees_label">Total:</label>
              <span className="talent_fees_span">{bookingData.amount || "-"}</span>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <label className="fs-2 w-100 fw-bold border-bottom pb-4">
            Booking details
          </label>
          <div className="pt-5">
            <div className="d-flex pb-3">
              <label className="talent_fees_label">Service Name:</label>
              <span className="talent_fees_span">
                {bookingData.talent_packages.title || "-"}
              </span>
            </div>
            <div className="d-flex pb-3">
              <label className="talent_fees_label">Event type:</label>
              <span className="talent_fees_span">
                {bookingData?.events_type?.name || "-"}
              </span>
            </div>
            <div className="d-flex pb-3">
              <label className="talent_fees_label">Booking time:</label>
              <div>
                <span className="talent_fees_span">
                  {bookingData.start_time} - {bookingData.end_time}
                </span>
                <div className="talent_fees_span">({bookingData.time_zone})</div>
              </div>
            </div>
            <div className="d-flex pb-3">
              <label className="talent_fees_label">Going to be:</label>
              <span className="talent_fees_span">{bookingData.talent_packages.type || "-"}</span>
            </div>
            {bookingData.talent_packages.type !== "free" && (
              <div className="d-flex pb-3">
                <label className="talent_fees_label">Total Talent Fees:</label>
                <span className="talent_fees_span">
                  {bookingData.amount || "-"}
                </span>
                <span className="talent_fees_span">USD</span>
              </div>
            )}
            <div className="d-flex pb-3">
              <label className="talent_fees_label">Cancellation Policy:</label>
              <span className="talent_fees_span">0</span>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showAcceptModal} onHide={handleCloseAcceptModal} >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Accept Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to accept this booking?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary btn btn-sm" onClick={handleCloseAcceptModal}>
            Cancel
          </Button>
          <Button variant="bg-primary text-white btn btn-sm" onClick={handleAccept}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRejectModal} onHide={handleCloseRejectModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Reject Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to reject this booking?</p>
          <textarea
            className="form-control mt-3"
            minLength={5}
            maxLength={800}
            placeholder="Reason for rejection"
            value={rejectReason}
            onChange={(e) => {
              setRejectReason(e.target.value);
              setRejectError("");
            }}
          />
          <div className="text-danger">{rejectError}</div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary btn btn-sm" onClick={handleCloseRejectModal}>
            Cancel
          </Button>
          <Button variant="danger btn btn-sm" onClick={handleReject}>  
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingPending;
