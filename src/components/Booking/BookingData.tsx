

// // export default BookingData;

// export interface CommonBookingDetails {
//   code: string;
//   amount: string;
//   currency: string;
//   date: string;
//   client: string;
//   paymentMethod: string;
//   status: string;
//   clientDetails: { label: string; value: string }[];
//   paymentDetails: { label: string; value: string }[];
//   bookingDetails: { label: string; value: string; timezone?: string }[];
// }

// export interface CancelledBookingDetails extends CommonBookingDetails {
//   status: "Cancelled";
//   cancellationDetails: { label: string; value: string }[];
// }

// export interface RejectedBookingDetails extends CommonBookingDetails {
//   status: "Rejected";
//   rejectionDetails: { label: string; value: string }[];
// }

// export const commonBookingDetails = {
//   code: "24040000",
//   amount: "$115.00",
//   currency: "USD",
//   date: "Apr 20, 2024",
//   client: "Max smith",
//   paymentMethod: "-",
//   clientDetails: [
//     { label: "Company", value: "Test" },
//     { label: "Position", value: "Senior Manager" },
//     { label: "Email", value: "max.smith@gmail.com" },
//     { label: "Phone", value: "+911234567890" },
//     { label: "Address", value: "Dubai, United Arab Emirates" },
//     { label: "About", value: "I am very excited to work with you" },
//   ],
//   paymentDetails: [
//     { label: "$ 100 x 1 Quantity", value: "$ 100.00" },
//     { label: "Total", value: "$ 100.00" },
//   ],
//   bookingDetails: [
//     { label: "Service Name", value: "Wedding performance" },
//     { label: "Event type", value: "Festival" },
//     {
//       label: "Booking time",
//       value: "10:00 - 11:00",
//       timezone: "(Asia/Kolkata)",
//     },
//     { label: "Going to be", value: "Online" },
//     { label: "Online platform", value: "- -" },
//     { label: "Online platform id", value: "-" },
//   ],
// };

// export const cancelledBookingDetails: CancelledBookingDetails = {
//   ...commonBookingDetails,
//   status: "Cancelled",
//   cancellationDetails: [
//     { label: "Cancelled on", value: "Apr 21, 2024" },
//     { label: "Cancelled by", value: "Client" },
//     { label: "Reason", value: "Budget constraints" },
//   ],
// };

// export const acceptedBookingDetails: CommonBookingDetails = {
//   ...commonBookingDetails,
//   status: "Accepted",
// };

// export const pendingBookingDetails: CommonBookingDetails = {
//   ...commonBookingDetails,
//   status: "Pending",
// };

// export const activeBookingDetails: CommonBookingDetails = {
//   ...commonBookingDetails,
//   status: "Active",
// };

// export const rejectedBookingDetails: RejectedBookingDetails = {
//   ...commonBookingDetails,
//   status: "Rejected",
//   rejectionDetails: [
//     { label: "Rejected on", value: "Apr 21, 2024" },
//     { label: "Reason", value: "Budget constraints" },
//   ],
// };

// export const upcomingBookingDetails: CommonBookingDetails = {
//   ...commonBookingDetails,
//   status: "Upcoming",
// };

// export const completedBookingDetails: CommonBookingDetails = {
//   ...commonBookingDetails,
//   status: "Completed",
// };
