"use client";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { KTIcon } from "@/_metronic/helpers";
import { UncontrolledTooltip } from "reactstrap";
import Select from "react-select";
import { ICity, ICountry, Info, UpdateProfile } from "@/api/settings/types";
import {
  getCity,
  getCountry,
  updateSettingsProfile,
} from "@/api/settings/settings";
import { toast } from "react-toastify";
import SelectCustomStyles from "../SelectCustomStyles/SelectCustomStyles";

const OverviewSchema = Yup.object().shape({
  email: Yup.string().required("Email id is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
});

const Overview = ({
  initialState,
  data,
  city,
}: {
  initialState: UpdateProfile;
  data: ICountry[];
  city: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<UpdateProfile>(initialState);
  const [cities, setCities] = useState<ICity[]>([]);

  const fetchCities = async (country_id: string) => {
    try {
      const response = await getCity(country_id);
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    if (initialState.country) {
      fetchCities(initialState.country);
    }
  }, [initialState.country]);

  return (
    <>
      <div className="card card-flush mb-6 mb-xl-9">
        <div className="card-body p-9 pt-10 pb-0">
          <Formik
            initialValues={initialState}
            validationSchema={OverviewSchema}
            enableReinitialize={true}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                const response = await updateSettingsProfile(values);
                if (response.error) {
                  const errorMessage = Object.values<string>(
                    response.data.message
                  );
                  toast.error(errorMessage[0].toString());
                } else {
                  setProfileData(response.data.data);
                  toast.success(response.data.message);
                }
              } catch (error) {
                console.error("Form submission error:", error);
              } finally {
                setLoading(false);
              }
            }}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <Form className="form">
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Email
                  </label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      type="email"
                      className="form-control form-control-lg"
                      name="email"
                      placeholder=""
                      style={{
                        backgroundColor:
                          values.address && touched.address && errors.address
                            ? "#FADBD8" // Light red if there's an error
                            : touched.address
                            ? "#FFFFFF" // White if touched but no error
                            : "bg-body", // Default background color
                      }}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="fv-plugins-message-container"
                    >
                      {(msg) => (
                        <div className="fv-help-block error">{msg}</div>
                      )}
                    </ErrorMessage>
                    <div className="form-text">
                      Once you update your email address here, the new email
                      will be replacing with the old one for the login and all
                      the notifications will send to given Email ID.
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    <span className="required">Phone</span>
                    <span className="ms-1" id="tooltipPhone">
                      <KTIcon
                        iconName="information-5"
                        iconType="duotone"
                        className="fs-6 text-gray-500"
                      />
                      <UncontrolledTooltip
                        delay={0}
                        placement="top"
                        target="tooltipPhone"
                        className="shadow-sm"
                      >
                        Ex: +1408XXXXXXX
                      </UncontrolledTooltip>
                    </span>
                  </label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      type="text"
                      className="form-control form-control-lg "
                      name="phone"
                      style={{
                        backgroundColor:
                          values.phone && touched.phone && errors.phone
                            ? "#FADBD8" // Light red if there's an error
                            : touched.phone
                            ? "#FFFFFF" // White if touched but no error
                            : "bg-body", // Default background color
                      }}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="fv-plugins-message-container"
                    >
                      {(msg) => (
                        <div className="fv-help-block error">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    Notifications
                  </label>
                  <div className="col-lg-8 d-flex align-items-center">
                    <div className="form-check form-switch switch switch-icon">
                      <Field
                        type="checkbox"
                        className="form-check-input"
                        name="notification_enabled"
                        value={values.notification_enabled}
                        checked={values.notification_enabled === 1}
                        onChange={(e: any) =>
                          setFieldValue(
                            "notification_enabled",
                            e.target.checked ? 1 : 0
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    <span className="required">Address</span>
                  </label>
                  <div className="col-lg-8 fv-row">
                    <Field
                      as="textarea"
                      className="form-control mb-3 mb-lg-0"
                      name="address"
                      style={{
                        backgroundColor:
                          values.address && touched.address && errors.address
                            ? "#FADBD8" // Light red if there's an error
                            : touched.address
                            ? "#FFFFFF" // White if touched but no error
                            : "bg-body", // Default background color
                      }}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="fv-plugins-message-container"
                    >
                      {(msg) => (
                        <div className="fv-help-block error">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    <span className="required">Country</span>
                  </label>
                  <div className="col-lg-8 fv-row">
                    <Select
                      name="country"
                      styles={SelectCustomStyles}
                      classNamePrefix="react-select"
                      placeholder="Select a Country"
                      menuPlacement="top"
                      isSearchable={true}
                      options={data.map((country: any) => ({
                        value: country.id,
                        label: country.countryName,
                      }))}
                      onChange={(option: any) => {
                        const selectedCountry = option ? option.value : "";
                        setFieldValue("country", selectedCountry);
                        fetchCities(selectedCountry);
                      }}
                      defaultValue={
                        data
                          .map((c: any) => ({
                            value: c.id,
                            label: c.countryName,
                          }))
                          .find(
                            (option: any) => option.value == values.country
                          ) || null
                      }
                    />

                    <ErrorMessage
                      name="country"
                      component="div"
                      className="fv-plugins-message-container"
                    >
                      {(msg) => (
                        <div className="fv-help-block error">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    <span className="required">City</span>
                  </label>
                  <div className="col-lg-8 fv-row">
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
                      value={
                        initialState.city
                          ? {
                              value: initialState.city,
                              label: initialState.city,
                            }
                          : null
                      }
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="fv-help-block error"
                    />

                    <ErrorMessage
                      name="city"
                      component="div"
                      className="fv-plugins-message-container"
                    >
                      {(msg) => (
                        <div className="fv-help-block error">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="card-footer d-flex justify-content-end border-top px-0 py-2">
                  <button type="reset" className="btn btn-sm btn-light me-2">
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="btn bg-blue text-white btn-sm"
                    disabled={loading}
                  >
                    {!loading && "Save Changes"}
                    {loading && (
                      <span
                        className="indicator-progress"
                        style={{ display: "block" }}
                      >
                        Please wait...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export { Overview };
