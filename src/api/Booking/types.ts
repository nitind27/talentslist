export interface Ibookingcount {
  statuses: Status[];
}
export interface Status {
  id: number;
  status: string;
  count: number;
}
export interface IBookingData {
  current_page: number;
  data: IBookingAllData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
  count: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface IBookingCode {
  status: boolean;
  message: string;
  data: IBookingAllData;
}

export interface IBookingAllData {
  // statusId(statusId: any): import("react").ReactNode;
  id: number;
  user_id: number;
  talent_id: number;
  service_price: number;
  service_charge_percentage: number;
  service_charge_amount: number;
  cancellation_talent: string;
  amount: string;
  client_refund_amount: string;
  ip_address: string;
  target_name: string;
  target_id: number;
  booking_status_id: number;
  event_type_id: number;
  booking_code: number;
  qty: number;
  number_attendees: null;
  booked_date: Date;
  booking_date: string;
  booking_time: null;
  start_time: string;
  end_time: string;
  first_name: string;
  time_zone: string;
  offered_price: null;
  indoor: number;
  city: null;
  country: null;
  street: null;
  postal_code: null;
  venue: null;
  adult: null;
  child: null;
  online_platform_email: string;
  online_platform: string;
  cancel_before_type: string;
  cancel_before_value: number;
  cancel_fees_type: string;
  cancel_fees_value: number;
  reject_reason: null;
  rejected_at: null;
  customer_id: null;
  created_at: Date;
  updated_at: Date;
  cancellation_reason_id: null;
  client_rate: null;
  talent_rate: null;
  hascode: string;
  duration: string;
  auto_expired_on: Date;
  auto_expired_at: null;
  auto_expired_reason: null;
  cancelled_by: number;
  cancelled_at: Date | any;
  cancelled_reason: string;
  auto_payment_at: null;
  is_payment_done: null;
  is_pre_cancelled: number;
  online_platform_icon: string;
  client: Booking;
  talent: Booking;
  message: string;
  client_info: ClientInfo;
  talent_packages: TalentPackages;
  events_type: EventsType;
  payments: Payment[];
  action: any;
}

export interface Booking {
  id: number;
  ip_address: string;
  username: null;
  email: string;
  available_balance: string;
  activation_code: string;
  created_on: number;
  last_login: Date;
  active: number;
  reason_to_close: null;
  first_name: string;
  last_name: string;
  progress: string;
  company: null;
  phone: string;
  phone_country_code: string;
  verified_phone_at: Date;
  code: null;
  birth_date: null;
  birth_place: null;
  country: string;
  nationality: null;
  address: string;
  address_datails: null;
  state: null;
  city: string;
  postcode: string;
  gender: null;
  paypal: null;
  preapprovalKey: null;
  preapprovalkey_status: null;
  billing_agreement_id: null;
  online: number;
  referral_earning: string;
  time_zone: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  otp_code: null;
  google_token_time: null;
  google_response_data: null;
  outlook_token_time: null;
  outlook_response_data: null;
  allow_google_sync: string;
  allow_outlook_sync: string;
  otp_expire: null;
  google_calendar_id: null;
  outlook_calendar_id: null;
  notification_enabled: number;
  country_code: string;
  active_talents_pay: string;
  marital_status_id: null;
  first_time: number;
  last_delete_date: null;
  client_profile_image: string;
  user_groups: UserGroup[];
}

export interface UserGroup {
  id: number;
  user_id: number;
  group_id: number;
}

export interface ClientInfo {
  id: number;
  user_id: number;
  gateway_id: string;
  profile_image: string;
  company_name: string;
  company_website: string;
  position: string;
  aboutme: string;
  account_balance: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface EventsType {
  id: number;
  name: string;
  parent_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface Payment {
  id: number;
  booking_id: number;
  amount: number;
  fees: number;
  pm_code: string;
  pm_id: null;
  brand: string;
  country: string;
  exp_month: number;
  exp_year: number;
  last4: string;
  payment_info: string;
  created_at: Date;
  updated_at: Date;
}

export interface TalentPackages {
  id: number;
  user_id: number;
  title: string;
  includes: string;
  excludes: string;
  price: number;
  price_type: string;
  price_to: null;
  order: number;
  duration: string;
  product: string;
  sku: string;
  discount: null;
  discount_from: null;
  discount_to: null;
  enabled: string;
  cancel_fees_value: number;
  cancel_fees_type: string;
  cancel_before_value: number;
  cancel_before_type: string;
  type: string;
  advanced_payment: number;
  advanced_payment_type: string;
  booking_duration: number;
  online_platforms: string;
  fees_by: string;
  created_at: Date;
  updated_at: Date;
}

export const bookingStatusMap: any = {
  1: { title: "Pending", state: "warning" },
  2: { title: "Upcoming", state: "info" },
  3: { title: "Completed", state: "light-success" },
  4: { title: "Cancelled", state: "danger" },
  5: { title: "Rejected", state: "danger" },
  6: { title: "Accepted", state: "light-success" },
  7: { title: "Auto-Rejected", state: "danger" },
};

export interface IAcceptbooking {
  status: boolean;
  message: string;
  data: IBookingAllData;
}
