"use client";
import React, { useEffect, useState } from "react";
// import { ListsWidgetProps } from "./Profilepageprops";
import { KTIcon } from "@/_metronic/helpers";
import { Field, Form, Formik } from "formik";
import { INationality, Iprofile } from "@/api/profile/types";
import { updateProfileLocationtravel } from "@/api/profile/get_profile_information";
import { toast } from "react-toastify";
import { getCity, getCountry } from "@/api/settings/settings";
import { ICity, ICountry } from "@/api/settings/types";
import Select from "react-select";
import { getNationality } from "@/api/profile/languages/get_languages";
import Map from "./Map";
import SelectCustomStyles from "@/components/SelectCustomStyles/SelectCustomStyles";

interface ListsWidgetProps extends Iprofile {}
const ListsProfileWidget3: React.FC<ListsWidgetProps> = ({
  country,
  city,
  citizenship,
  available_to_travel,
  location,
  preferred_countries,
  nationality,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [countries, setCountries] = useState<ICountry[]>([]);

  const [cities, setCities] = useState<ICity[]>([]);

  const initialValues: Iprofile = {
    review: undefined,
    data: undefined,
    status: false,
    consumer_id: 0,
    message: "",
    degree: [],
    personal_information: "",
    stage_name: undefined,
    full_name: "",
    first_name: "",
    last_name: "",
    sname_visible: 1,
    birth_date: "",
    gender: "",
    aboutme: "",
    language: [],
    citizenship: citizenship || "",
    available_to_travel,
    location: location || "",
    preferred_countries,
    username: "",
    city,
    country,
    nationality: nationality,
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancel = (resetForm: any) => {
    setIsEditMode(false);
    resetForm();
  };

  const handleSubmit = async (values: Iprofile, { setSubmitting }: any) => {
    setIsEditMode(false);
    try {
      const response = await updateProfileLocationtravel({
        ...values,
        preferred_countries: values.preferred_countries.map((item) => item.id),
      } as any);

      if (response.status) {
        toast.success(response.message);
      } else {
        toast.error("Failed to update personal information. Please try again.");
      }
    } catch (error) {
      toast.error("Some error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountry();
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const fetchCities = async (country_id: string) => {
    try {
      const response = await getCity(country_id);
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // useEffect(() => {
  //   const fetchNationality = async () => {
  //     try {
  //       const response = await getNationality();
  //       setNationality(response.data);
  //     } catch (error) {
  //       console.error("Error fetching nationalities:", error);
  //     }
  //   };
  //   fetchNationality();
  // }, []);

  return (
    <div className={`card mb-5 mb-xl-10 `}>
      <div className={`card-header`}>
        <div className="card-title m-0">
          <h4 className={`fw-bold m-0 d-flex gap-3 `}>
            <KTIcon
              iconName="geolocation"
              iconType="duotone"
              className="fs-1"
            />
            Location and travel
          </h4>
        </div>
        <div className="card-toolbar">
          {!isEditMode && (
            <button
              type="button"
              className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary menu-dropdown edit_location"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-flip="top-end"
              onClick={handleEditClick}
            >
              <KTIcon iconName="pencil" iconType="duotone" className="fs-2" />
            </button>
          )}
        </div>
      </div>

      <div className={`card-body p-9 `}>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({
            resetForm,
            values,
            handleChange,
            setFieldValue,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row mb-3">
                {isEditMode ? (
                  <>
                    <div className="d-flex">
                      <div className="col-6 pe-3">
                        <label className="mb-3 fw-semibold text-muted ">
                          Citizenship
                        </label>
                        <Select
                          className=""
                          classNamePrefix="react-select"
                          name="citizenship"
                          placeholder="Select a Nationality"
                          options={nationality.map((national: any) => ({
                            value: national.id,
                            label: national.nationality,
                          }))}
                          onChange={(option: any) => {
                            const selectedCity = option ? option.value : "";
                            setFieldValue("citizenship", selectedCity);
                          }}
                          defaultValue={
                            nationality
                              .map((c: any) => ({
                                value: c.id,
                                label: c.nationality,
                              }))
                              .find(
                                (option: any) =>
                                  option.value == values.citizenship
                              ) || null
                          }
                        />
                      </div>
                      <div className="col-6  ps-3">
                        <label className="mb-3 fw-semibold text-muted">
                          Available to Travel
                        </label>
                        <div className="d-flex">
                          <label className="form-check form-check-sm form-check-solid me-5">
                            <Field
                              type="radio"
                              name="available_to_travel"
                              value="1"
                              checked={values.available_to_travel == 1}
                              onChange={handleChange}
                              className="form-check-input"
                            />
                            Yes
                          </label>
                          <label className="form-check form-check-sm form-check-solid">
                            <Field
                              type="radio"
                              name="available_to_travel"
                              value="0"
                              checked={values.available_to_travel == 0}
                              onChange={handleChange}
                              className="form-check-input"
                            />
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-4  mb-3 fw-semibold text-muted">
                      <span className="">Citizenship</span>
                    </div>
                    <p className="text-gray col-8 m-0 fw-bold">
                      {nationality
                        .map((c: any) => ({
                          value: c.id,
                          label: c.nationality,
                        }))
                        .find(
                          (option: any) => option.value == values.citizenship
                        )?.label || null}
                    </p>

                    <div className="col-4 fw-semibold text-muted">
                      <span className="">Available to travel</span>
                    </div>
                    <p className="text-gray col-8 m-0 fw-bold">
                      {values.available_to_travel == 1 ? "Yes" : "No"}
                    </p>
                  </>
                )}
              </div>

              <div className="">
                {isEditMode ? (
                  <>
                    <div className="row p-0">
                      <div className="col-6 pe-3">
                        <label className="mb-3 fw-semibold text-muted">
                          Location
                        </label>
                        <Map
                          input={
                            <input
                              type="text"
                              name="location"
                              value={values.location}
                              onChange={handleChange} // Ensure handleChange updates Formik's state
                              placeholder="Search location"
                              className="form-control col-12 form-control-sm border-1 shadow-none"
                            />
                          }
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-6">
                        <label className="mb-3 fw-semibold text-muted">
                          Country
                        </label>

                        <Select
                          className=""
                          classNamePrefix="react-select"
                          name="country"
                          options={countries.map((country) => ({
                            value: country.id,
                            label: country.countryName,
                          }))}
                          onChange={(option: any) => {
                            const selectedCountry = option ? option.value : "";
                            setFieldValue("country", selectedCountry);
                            fetchCities(selectedCountry);
                          }}
                          placeholder="Select a Country"
                          defaultValue={
                            countries
                              .map((c) => ({
                                value: c.id,
                                label: c.countryName,
                              }))
                              .find(
                                (option: any) => option.value == values.country
                              ) || null
                          }
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-4 mb-3 fw-semibold text-muted">
                        <span className="">Location</span>
                      </div>
                      <p className="text-gray mb-3 col-8 m-0 fw-bold">
                        {values.location}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {isEditMode ? (
                <>
                  <div className="row mb-6">
                    <div className="col-6">
                      <label className="mb-3 fw-semibold text-muted">
                        City
                      </label>
                      <Select
                        className=""
                        classNamePrefix="react-select"
                        name="city"
                        placeholder="Select a City"
                        options={cities.map((city: any) => ({
                          value: city.city_name,
                          label: city.city_name,
                        }))}
                        onChange={(option: any) => {
                          const selectedCity = option ? option.value : "";
                          setFieldValue("city", selectedCity);
                        }}
                        defaultValue={
                          cities
                            .map((c) => ({
                              value: c.city_name,
                              label: c.city_name,
                            }))
                            .find(
                              (option: any) => option.label == values.city
                            ) || values.city
                        }
                      />
                    </div>

                    <div className="col-6">
                      <label className="mb-3 fw-semibold text-muted">
                        Preferred Countries
                      </label>
                      <Select
                        className=""
                        classNamePrefix="react-select"
                        isMulti
                        closeMenuOnSelect={false}
                        name="preferred_countries"
                        options={countries.map((country) => ({
                          value: country.id,
                          label: country.countryName,
                        }))}
                        placeholder="Select a Country"
                        onChange={(selectedOptions) =>
                          setFieldValue(
                            "preferred_countries",
                            selectedOptions.map((option) => ({
                              id: option.value,
                              name: option.label,
                            }))
                          )
                        }
                        defaultValue={values.preferred_countries.map(
                          (c: any) => ({
                            value: c.id,
                            label: c.name,
                          })
                        )}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <div className="row mb-3">
                    <div className="col-lg-4 fw-semibold text-muted">
                      <span className="">Preferred Countries</span>
                    </div>
                    <div className="col-8">
                      <p className="text-gray m-0 fw-bold">
                        {values.preferred_countries
                          .map((country: any) => country.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isEditMode && (
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-sm me-5"
                    style={{ backgroundColor: "#D9214E", color: "white" }}
                    onClick={() => handleCancel(resetForm)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm"
                    style={{ backgroundColor: "#0036e3", color: "white" }}
                  >
                    Save
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ListsProfileWidget3;
