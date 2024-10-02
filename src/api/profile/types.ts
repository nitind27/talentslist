export interface Iprofile {
  review: any;
  data: any;
  status: boolean;
  consumer_id: number;
  message: string;
  degree: string[];
  personal_information: string;
  stage_name: any;
  full_name: string;
  first_name: string;
  last_name: string;
  sname_visible: 0 | 1;
  birth_date: string;
  gender: string;
  aboutme: string;
  nationality: any;
  language: {
    name: string;
    id: number;
  }[];
  citizenship: string;
  location: string;
  available_to_travel: 0 | 1;
  preferred_countries: {
    countryName: string;
    id: number;
  }[];
  username: string;
  city: string;
  country: string;
}
export interface IProfileImage {
  profile_image: string;
  data: any;
}
export interface Icover {
  data: any;
  name: string;
  image: string;
}

export interface IprofileAppearance {
  status: any;
  message: any;
  data: any;
  height: any;
  weight: any;
  chest: any;
  ethnicity: any;
  skincolor: any;
  eyecolor: any;
  waist: any;
  hairtype: any;
  haircolor: any;
  hairlength: any;
  shoesize: any;
}
export interface Ireviewrequest {
  client_email: string;
  client_name: string;
  event_name: string;
  event_date: string;
  location: string;
  event_type: string;
  client_message: string;
  message: string;
  status: string;
}

export interface Ilanguages {
  language: any;
  data: any;
  id: number;
  name: any;

  message: string;
}

export interface INationality {
  data: any;
  id: number;
  nationality: string;
  created_at?: null;
  updated_at?: null;
}

export interface IReviewRequest {
  id: number;
  auth_key: string;
  talent_id: number;
  skill: string;
  event_type: number;
  client_email: string;
  event_name: string;
  client_name: string;
  client_message: string;
  company_name: string;
  start_date: string;
  end_date: string;
  earned: string;
  location: string;
  comment: string;
  ratting: string;
  approved: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
