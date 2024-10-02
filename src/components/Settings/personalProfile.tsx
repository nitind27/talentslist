import {
  getCityserver,
  getCountryServer,
  getSettingsProfile,
} from "@/api/settings/settings";
import { Info } from "@/api/settings/types";
import React from "react";
import { Overview } from "./Overview";

const PersonalProfile = async () => {
  let initialState: Info = {
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    notification_enabled: "",
  };

  const response = await getSettingsProfile();
  const country = await getCountryServer();
  const data = country.data.data;

  if (!response.error) {
    initialState = response.data.data.info;
  }

  const country_id = initialState.country; // Move this after the response check
  const allcityes = await getCityserver(initialState.country);
  const citiesdata = allcityes.data;

  return (
    <div>
      <Overview initialState={initialState} data={data} city={citiesdata} />
    </div>
  );
};

export default PersonalProfile;
