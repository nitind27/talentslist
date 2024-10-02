
export interface IDashboardEarningResponse {
  status:  boolean;
  message: string;
  data:    EarningData;
}

export interface EarningData {
  this_month: string;
  last_month: string;
  all_time:   string;
}

export interface IDashboardEarningCountResponse {
  status:  boolean;
  message: string;
  data:    EarningCountData;
}

export interface EarningCountData {
  request: number;
  pending:  number;
  upcoming: number;
  active:   number;
  all:      number;
}


export interface IDashboardReviewsResponse {
  status:  boolean;
  message: string;
  data:    Data;
}

export interface Data {
  ratings: { [key: string]: Rating };
  total:   Total;
}

export interface Rating {
  percentage: number;
  count:      number;
}

export interface Total {
  count:   number;
  average: number;
}

export interface IDashboardEarningServiceResponse {
  status:  boolean;
  message: string;
  data:    EarningServiceData;
}

export interface EarningServiceData {
  all:      number;
  active:   number;
  inactive: number;
}

export interface IDashboardProfileResponse {
  status:  boolean;
    message: string;
    data:    Data;
}
export interface Data {
  progress:        number;
  profileComplete: ProfileComplete;
}

export interface ProfileComplete {
  "Profile information":      Information;
  "About you information":    Information;
  "Educations & Experiences": Information;
  "portfolio Photos":         Information;
  "Social media":             Information;
}

export interface Information {
  points:    number;
  is_filled: boolean;
}

export interface  IDashboardBookingRevenueResponse {
  status:  boolean;
  message: string;
  data:    { [key: string]: number };
}


export interface  IDashboardBookingAvailabilityResponse {
  status:  boolean;
  message: string;
  data:    Data;
}

export interface Data {
  weekDays:          WeekDays;
  is_available:      string;
  id:                number;
  availability_slot: AvailabilitySlot;
  period:            string;
  expired_at:        string;
}

export interface AvailabilitySlot {
  _token:           string;
  booking:          string;
  available:        string;
  period:           string;
  booking_duration: string;
  days:             string[];
  Sunday:           Day;
  Monday:           Day;
  Tuesday:          Day;
  Wednesday:        Day;
  Thursday:         Day;
  Friday:           Day;
  Saturday:         Day;
}

export interface Day {
  "1": The1;
}

export interface The1 {
  start_time: string;
  end_time:   string;
}

export interface WeekDays {
  sun: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
}


