export interface ISettingProfileResponse {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  info: Info;
}

export interface Info {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  country: string;
  address?: string;
  address_datails?: string;
  state?: null;
  city?: string;
  notification_enabled?: number | string;
  user_country?: UserCountry;
  profile?: Profile;
}

export interface Profile {
  user_id: number;
  profile_image: string;
  thumbnails_urls: ThumbnailsUrls;
}

export interface ThumbnailsUrls {
  medium: string;
  large: string;
  original: string;
}

export interface UserCountry {
  id: number;
  countryCode: string;
  countryName: string;
  currencyCode: string;
  created_at: null;
  updated_at: null;
  deleted_at: null;
}

// Update Profile types

export interface ISettingProfilUpadeteResponse {
  status: boolean;
  message: string;
  data: UpdateProfile;
}

export interface UpdateProfile {
  id?: number;
  username?: string | null;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  address?: string;
  address_datails?: string;
  state?: string | null;
  city?: string;
  notification_enabled?: number | string;
  country_code?: string;
  profile?: Profile;
}

export interface Profile {
  id: number;
  user_id: number;
  profile_image: string;
}

//Get Country types

export interface ICountryData {
  status: boolean;
  message: string;
  data: ICountry[];
}

export interface Iemployee {
  id: number;
  name: string;
  data: any;
}
export interface ICountry {
  id?: number;
  countryCode: string;
  countryName: string;
  currencyCode?: string;
  created_at?: null;
  updated_at?: null;
  deleted_at?: null;
}

export interface ICityData {
  status: boolean;
  message: string;
  data: ICity[];
}

export interface ICity {
  id: number;
  city_name: string;
}

export interface INational {
  id: number;
  nationality: string;
  created_at: Date;
  updated_at: Date;
}

// Update Password types

export interface IUpdatePasswordResponse {
  status: boolean;
  message: string;
}

export interface CloseAccountData {
  action: string;
  reason: string;
}
