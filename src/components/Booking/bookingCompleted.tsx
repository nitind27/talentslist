// 'use client';
// import React, { useState, useEffect, useMemo } from "react";
// import Image from "next/image";
// // import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import {
//   useReactTable,
//   createColumnHelper,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
// } from "@tanstack/react-table";
 
// import Link from "next/link";
// import DatePicker from "../Transactions/DatePicker"; 
// import Pagination from "../Transactions/Pagination"; 
// import { KTIcon } from "@/_metronic/helpers";
// import CustomeRowRender from "./CustomeRowRender"; 
// import { Booking } from "@/api/profile/types";

// const BookingCompleted: React.FC = () => {
//   // const [sorting, setSorting] = useState<SortingState>([]);
//   const [pagination, setPagination] = useState({
//     pageSize: 5,
//     pageIndex: 0,
//   });

//   // const searchParams = useSearchParams();
//   // const pathname = usePathname();
//   // const router = useRouter();

//   // useEffect(() => {
//   //   if (sorting.length > 0) {
//   //     const params = new URLSearchParams(searchParams.toString());
//   //     params.set("sort_field", sorting[0].id);
//   //     params.set("sort_order", sorting[0].desc ? "desc" : "asc");
//   //     router.push(pathname + "?" + params.toString());
//   //   }
//   // }, [sorting]);

//   const columnHelper = createColumnHelper<Booking>();

//   const columns = useMemo(
//     () => [
//       columnHelper.accessor('clientName', {
//         header: 'CLIENT',
//         cell: info => (
//           <div className="d-flex align-items-center">
//             <div className="symbol symbol-50px me-3">
//               <Image src={info.row.original.avatar} height={50} width={50} alt="" />
//             </div>
//             <div className="d-flex justify-content-start flex-column">
//               <span style={{ height: "17px" }}>
//                 <Link href="#" className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6">
//                   {info.row.original.clientName}
//                 </Link>
//               </span>
//               <span className="text-gray-700 fw-semibold d-block fs-7">
//                 {info.row.original.userName}
//               </span>
//               <span className="fw-semibold d-block fs-7 text-gray-300">
//                 <i className="ki-solid ki-geolocation" style={{ color: "rgb(31, 163, 49)" }}></i>
//                 {info.row.original.location}
//               </span>
//             </div>
//           </div>
//         ),
//       }),
//       columnHelper.accessor('amount', {
//         header: 'AMOUNT',
//         cell: info => <span className="text-muted text-hover-primary fw-semibold d-block fs-7">{info.getValue()}</span>,
//       }),
//       columnHelper.accessor('status', {
//         header: 'STATUS',
//         cell: info => (
//           <span className={`badge py-3 px-4 text-bg-${info.row.original.state}`}>
//             {info.row.original.status}
//           </span>
//         ),
//       }),
//       columnHelper.accessor('bookingDate', {
//         header: 'BOOKING DATE',
//         cell: info => <span className="text-muted text-hover-primary fw-semibold text-muted">{info.getValue()}</span>,
//       }),
//       columnHelper.accessor('bookingTime', {
//         header: 'BOOKING TIME',
//         cell: info => <span className="text-muted text-hover-primary fw-semibold text-muted">{info.getValue()}</span>,
//       }),
//       columnHelper.accessor('duration', {
//         header: 'DURATION',
//         cell: info => <span className="text-muted fw-semibold text-hover-primary text-muted">{info.getValue()}</span>,
//       }),
//       columnHelper.accessor("review", {
//         header: "REVIEW",
//         cell: (info) => (
//           <span className="text-muted fw-semibold">
//             {info.row.original.review.length === 0 || info.row.original.review[0].remark === "-" ? (
//               <span>-</span>
//             ) : (
//               info.row.original.review.map((reviewItem, idx) => (
//                 <div key={idx}>
//                   <span>{reviewItem.remark}</span>
//                   <span className="d-flex justify-content-center">
//                     {reviewItem.reviews}
//                   </span>
//                 </div>
//               ))
//             )}
//           </span>
//         ),
//       }),
//       columnHelper.accessor('action', {
//         header: 'ACTION',
//         cell: info => (
//           <>
//             <button className="btn btn-sm show menu-dropdown">
//               <KTIcon iconName="dots-horizontal" iconType="solid" className="fs-2x" />
//             </button>
//           </>
//         ),
//       })
//     ],
//     [columnHelper]
//   );

//   // Slice the data based on the current pagination state
//   const currentData = useMemo(() => {
//     const start = pagination.pageIndex * pagination.pageSize;
//     const end = start + pagination.pageSize;
//     return BookingData.slice(start, end);
//   }, [pagination.pageIndex, pagination.pageSize]);

//   const table = useReactTable({
//     data: currentData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     // onSortingChange: setSorting,
//     onPaginationChange: setPagination,
//     manualPagination: true,
//     manualSorting: true,
//     state: {
//       // sorting,
//       pagination,
//     },
//   });

//   const handlePageChange = (pageNumber: number) => {
//     setPagination(prev => ({ ...prev, pageIndex: pageNumber - 1 }));
//   };

//   const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const pageSize = parseInt(event.target.value, 10);
//     setPagination(prev => ({ ...prev, pageSize, pageIndex: 0 }));
//   };

//   return (
//     <>
//       <div className="card-body py-4">
//         <div id="bookings_list_wrapper" className="">
//           <div className="card mb-5 mb-xl-8">
//             <div className="card-header border-0 pt-5">
//               <h3 className="card-title align-items-start flex-column"></h3>
//               <div className="card-toolbar">
//                 <div className="d-flex justify-content-end gap-5 mb-0">
//                   <DatePicker />
//                 </div>
//               </div>
//             </div>
//             <div className="card-body py-3">
//               <CustomeRowRender
//                 columns={columns}
//                 table={table}
//               />
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
//               <div className="dataTables_length">
//                 <label>
//                   <select
//                     aria-controls="bookings_list_length"
//                     className="form-select form-select-sm form-select-solid"
//                     value={pagination.pageSize}
//                     onChange={handlePageSizeChange}
//                   >
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="15">15</option>
//                     <option value="20">20</option>
//                   </select>
//                 </label>
//               </div>
//               <div role="status" aria-live="polite">
//                 Showing {pagination.pageIndex * pagination.pageSize + 1} to {Math.min((pagination.pageIndex + 1) * pagination.pageSize, BookingData.length)} of {BookingData.length} records
//               </div>
//             </div>
//             <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
//               <Pagination
//                 currentPage={pagination.pageIndex + 1}
//                 totalPages={Math.ceil(BookingData.length / pagination.pageSize)}
//                 onPageChange={handlePageChange}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .action-button:hover {
//           background-color: #3366E5 !important;
//           color: white !important;
//         }
//       `}</style>
//     </>
//   );
// };

// export default BookingCompleted;
