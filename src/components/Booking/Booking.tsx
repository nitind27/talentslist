"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
} from "@tanstack/react-table";
import Link from "next/link";
import { KTIcon } from "@/_metronic/helpers";
import CustomeRowRender from "./CustomeRowRender";
import {
  IBookingAllData,
  IBookingData,
  Ibookingcount,
} from "@/api/Booking/types";
import DatePicker from "../DatePicker/DatePicker";
import Pagination from "../Pagination/Pagination";
import BookingCount from "./BookingCount";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  updateAcceptbooking,
  updateRejectbooking,
} from "@/api/Booking/getbookingsCounts"; // Adjust import as per your actual API functions
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import TablePagination from "../Pagination/TablePagination";

interface IBookingStatus {
  title: string;
  state: string;
}

const bookingStatusMap: Record<number, IBookingStatus> = {
  1: { title: "Pending", state: "warning" },
  2: { title: "Upcoming", state: "info" },
  3: { title: "Completed", state: "light-success" },
  4: { title: "Cancelled", state: "danger" },
  5: { title: "Rejected", state: "danger" },
  6: { title: "Accepted", state: "light-success" },
  7: { title: "Auto-Rejected", state: "danger" },
};

export type BookingStatusKey = keyof typeof bookingStatusMap;

const Booking = ({
  bookingData,
  status_id,
  countsData,
}: {
  status_id: string;
  bookingData: IBookingData;
  countsData: Ibookingcount;
}) => {
  const [pagination, setPagination] = useState({
    pageSize: 50,
    pageIndex: 0,
  });

  const router = useRouter();
  const columnHelper = createColumnHelper<IBookingAllData>();
  const [bookingEntry, setBookingEntry] = useState<IBookingAllData[]>([]);
  const [activeMenu, setActiveMenu] = useState<null | string>(null);
  const submenuRef = useRef<HTMLDivElement | null>(null);
  const [activeStatus, setActiveStatus] = useState<BookingStatusKey>(0);

  const handleActiveStatusChange = (value: BookingStatusKey) => {
    setActiveStatus(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  // Modal state and functions for accepting booking
  const [isAcceptModalVisible, setAcceptModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<IBookingAllData | null>(null);

  const toggleAcceptModal = () => setAcceptModalVisible(!isAcceptModalVisible);

  const handleAcceptClick = (booking: IBookingAllData) => {
    setSelectedBooking(booking);
    toggleAcceptModal();
  };

  useEffect(() => {
    setBookingEntry(bookingData.data);
  }, [bookingData.data]);

  const handleAccept = async () => {
    if (selectedBooking) {
      try {
        const response = await updateAcceptbooking(
          selectedBooking.booking_code
        );
        console.log("Response data:", response); // Log the response for debugging
        if (response && response.data) {
          console.log("Booking accepted successfully:", selectedBooking);
          const updatedBookings = bookingEntry.map((booking) =>
            booking.booking_code === selectedBooking.booking_code
              ? { ...booking, booking_status_id: 6 } // Update status to 6 (Accepted)
              : booking
          );
          setBookingEntry(updatedBookings);
          toggleAcceptModal();
          toast.success(response.data.message);
          router.refresh();
          // Perform any necessary state updates or additional actions upon successful acceptance
        } else {
          console.error("Failed to accept booking:", response);
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error accepting booking:", error);
      }
    }
  };

  // Modal state and functions for rejecting booking
  const [isRejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");

  const toggleRejectModal = () => setRejectModalVisible(!isRejectModalVisible);

  const handleRejectClick = (booking: IBookingAllData) => {
    setSelectedBooking(booking);
    toggleRejectModal();
  };

  const handleReject = async () => {
    if (selectedBooking) {
      if (rejectReason.length < 5 || rejectReason.length > 800 ) {
        setRejectError("Reject reason must be between 5 and 800 characters.");
        return;
      }
      if (!rejectReason) {
        setRejectError("Please provide a reason for rejection.");
        return;
      }
      try {
        const response = await updateRejectbooking(
          selectedBooking.booking_code,
          rejectReason
        );
        if (response && response.data) {
          const updatedBookings = bookingEntry.map((booking) =>
            booking.booking_code === selectedBooking.booking_code
              ? { ...booking, booking_status_id: 5 } // Update status to 5 (Rejected)
              : booking
          );
          setBookingEntry(updatedBookings);
          toggleRejectModal();
          toast.success(response.data.message);
          router.refresh();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error rejecting booking:", error);
        toast.error("Failed to reject booking");
      }
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("first_name", {
        header: "CLIENT",
        cell: (info) => (
          <div className="d-flex align-items-center">
            <div className="symbol symbol-50px me-3">
              <Image
                src={info.row.original.client.client_profile_image}
                height={50}
                width={50}
                alt=""
              />
            </div>
            <div className="d-flex justify-content-start flex-column">
              <span style={{ height: "17px" }}>
                <Link
                  href="#"
                  className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                >
                  {info.row.original.talent_packages.title}
                </Link>
              </span>
              <span className="text-gray-700 fw-semibold d-block fs-7">
                {info.row.original.client.first_name}{" "}
                {info.row.original.client.last_name}
              </span>
              <span className="fw-semibold d-block fs-7 text-gray-300">
                <i
                  className="ki-solid ki-geolocation"
                  style={{ color: "rgb(31, 163, 49)" }}
                ></i>
                {info.row.original.indoor === 0 ? "Online" : "Onsite"} |{" "}
                {info.row.original.indoor === 0
                  ? info.row.original.online_platform
                  : info.row.original.venue}
              </span>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("amount", {
        header: "AMOUNT",
        cell: (info) => (
          <span className="text-muted text-hover-primary fw-semibold d-block fs-7">
            ${info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("booking_status_id", {
        header: "STATUS",
        cell: (info) => {
          const statusId = info.row.original.booking_status_id;
          const { title: statusTitle, state: statusState } =
            bookingStatusMap[statusId] || {};
          return (
            <span className={`badge py-3 px-4 text-bg-${statusState}`}>
              {statusTitle}
            </span>
          );
        },
      }),
      columnHelper.accessor("booking_date", {
        header: "BOOKING DATE",
        cell: (info) => (
          <span className="text-muted text-hover-primary fw-semibold text-muted">
            {info.getValue()}
          </span>
        ),
      }),

      columnHelper.accessor((row) => `${row.start_time} - ${row.end_time}`, {
        id: "start_time-end_time",
        header: "BOOKING TIME",
        cell: (info) => (
          <span className="text-muted text-hover-primary fw-semibold text-muted">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("duration", {
        header: "DURATION",
        cell: (info) => (
          <span className="text-muted fw-semibold text-hover-primary text-muted">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("action", {
        header: "ACTION",
        cell: (info) => {
          const isPending = info.row.original.booking_status_id === 1;
          return (
            <div>
              <Dropdown >
                <Dropdown.Toggle
                  variant=""
                  className="btn btn-sm p-2"
                  data-boundary="viewport"
                >
                  <KTIcon
                    iconName="dots-horizontal"
                    iconType="solid"
                    className="fs-2x show text-blue text-left"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu align={{ lg: 'start' }}>
                  <Dropdown.Item
                    as={Link}
                    href={`/bookings/${info.cell.row.original.booking_code}/${info.cell.row.original.booking_status_id}`}
                    className="text-hover-primary"
                  >
                    View Booking
                  </Dropdown.Item>
                  {isPending && (
                    <>
                      <Dropdown.Item
                        as={Link}
                        href={`#`}
                        className="text-hover-primary"
                        onClick={() => handleAcceptClick(info.row.original)}
                      >
                        Accept
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        href={`#`}
                        className="text-hover-primary"
                        onClick={() => handleRejectClick(info.row.original)}
                      >
                        Reject
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          );
        },
      }),
    ],
    [columnHelper, activeMenu]
  );

  const currentData: IBookingAllData[] = useMemo(() => {
    if (!bookingData) return [];
    if (activeStatus !== 0) {
      return (
        bookingEntry?.filter(
          (item) => item.booking_status_id === activeStatus
        ) || []
      );
    }
    const start = pagination.pageIndex * pagination.pageSize;
    const end = Math.min(start + pagination.pageSize, bookingData.data.length);
    return bookingData.data.slice(start, end);
  }, [pagination.pageIndex, pagination.pageSize, bookingData, activeStatus]);

  const table = useReactTable({
    data: currentData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    manualSorting: true,
    state: {
      pagination,
    },
  });

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: page - 1 }));
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const pageSize = parseInt(event.target.value, 10);
    setPagination({ pageSize, pageIndex: 0 });
  };

  return (
    <>
      <BookingCount
        selectedStatusId={Number(status_id)}
        countsData={countsData}
        activeStatus={activeStatus}
      />

      <div
        className="card-body position-relative z-3 py-4"
      >
        <div id="bookings_list_wrapper" className="">
          <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column"></h3>
              <div className="card-toolbar">
                <div className="d-flex justify-content-end gap-5 mb-0">
                  <DatePicker />
                </div>
              </div>
            </div>

            <div className="card-body p-0 position-relative">
              <CustomeRowRender columns={columns} table={table} />
            </div>
            {currentData.length === 0 ? (
              <p className="text-center fw-bold fs-5 pb-3 text-muted">
                No data available in Table
              </p>
            ) : null}
          </div>
          <div className="row">
            {/* <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"> */}
            {/* <div className="dataTables_length"> */}
            {/* <label>
                  <select
                    aria-controls="bookings_list_length"
                    className="form-select form-select-sm form-select-solid"
                    value={pagination.pageSize}
                    onChange={handlePageSizeChange}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                  </select>
                </label> */}
          </div>
          {/* <div
          className="dataTables_info"
          id="kt_datatable_example_1_info"
          role="status"
          aria-live="polite"
        >
          {Showing {startRecord} to {endRecord} of {total} records /} 
          {Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
                {Math.min(
                  (pagination.pageIndex + 1) * pagination.pageSize,
                  bookingData.data.length
                )}{" "}
                of {bookingData.total} records }
        </div>  */}
        </div>

        <div className="col-sm-12 col-md-12 d-flex align-items-center justify-content-center justify-content-md-end">
          {/* <Pagination
                className=""
                totalItems={bookingData.total}
                itemsPerPage={pagination.pageSize}
                onPageChange={handlePageChange}
              /> */}
          <TablePagination className="" totalItems={bookingData.total} />
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}

      {/* Accept Modal Component */}
      <Modal show={isAcceptModalVisible} onHide={toggleAcceptModal}>
        <Modal.Header closeButton>
          <Modal.Title>Accept Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to accept this booking? Once accepted, this
          booking cannot be updated.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-sm"
            onClick={toggleAcceptModal}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn btn-sm"
            onClick={() => {
              handleAccept();
              toggleAcceptModal();
            }}
          >
            Accept
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reject Modal Component */}
      <Modal show={isRejectModalVisible} onHide={toggleRejectModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="fw-bold fs-6 mb-3">
              Are you sure you want to reject this booking? Once rejected, this
              booking cannot be updated.
            </div>
            <label htmlFor="rejectReason" className="form-label fs-5">
              Remark <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              id="rejectReason"
              required
              rows={3}
              value={rejectReason}
              onChange={(e) => {
                setRejectReason(e.target.value);
                setRejectError("");
              }}
            ></textarea>
            {rejectError && (
              <div className="text-danger mt-2">{rejectError}</div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-sm"
            onClick={toggleRejectModal}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="btn btn-sm"
            onClick={handleReject}
          >
            Reject
          </Button>
        </Modal.Footer>
      </Modal>      
    </>
  );
};

export default Booking;