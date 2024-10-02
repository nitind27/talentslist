import React, { useEffect, useState } from "react";
import { KTIcon } from "@/_metronic/helpers";
import { Iprofile } from "@/api/profile/types";
import { Field, FieldArray, Form, Formik } from "formik";
import Select from "react-select";
import { ICountry } from "@/api/settings/types";
import { updateProfileExperience } from "@/api/profile/get_profile_information";
import { toast } from "react-toastify";
import Yearmonth from "./YearMonth";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Flatpickr from "react-flatpickr";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/plugins/monthSelect/style.css";
import { format } from "date-fns";
import Model from "../Portfolio/Model/Model";
import { getemploymenttype } from "@/api/settings/settings";

interface ProfileHeaderProps {
  profileheaderData: Iprofile;
}

const ListsProfileExperienceWidget8 = ({
  profileheaderData,
}: ProfileHeaderProps) => {
  const [isStudyingArray, setIsStudyingArray] = useState<boolean[]>(
    Array(profileheaderData?.data?.user_experiences?.length).fill(false)
  );
  const [emp, setEmp] = useState<ICountry[]>([]);

  const [ExperienceData, setExperienceData] = useState<any[]>(
    profileheaderData?.data?.user_experiences || []
  );

  useEffect(() => {
    const initialStudyingArray = profileheaderData?.data.user_experiences.map(
      (edu: any) => edu.to === "Current"
    );
    setIsStudyingArray(initialStudyingArray);
  }, [profileheaderData]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getemploymenttype();
        setEmp(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleCheckboxChange = (index: number, setFieldValue: any) => {
    setIsStudyingArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];

      // Set the 'to' field based on checkbox state
      setFieldValue(
        `user_experiences.${index}.to`,
        newArray[index] ? "Current" : ""
      );

      return newArray;
    });
  };
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      if (values.user_experiences.length === 0) {
        toast.error("Please add experiences information before saving.");
        setSubmitting(false);
        return;
      }

      const formData = {
        user_experiences: values.user_experiences.map((exp: any) => ({
          title: exp.title,
          company: exp.company,
          desc: exp.desc,
          location: exp.location,
          employment_type_id: exp.employment_type_id,
          from: formatDate(exp.from), // Format 'from' date
          to: exp.to === "Current" ? "" : exp.to,
        })),
      };

      // Example: Replace with your actual API call
      const updatedProfile = await updateProfileExperience(formData);
      if (updatedProfile.status) {
        toast.success(updatedProfile.message);
        setExperienceData(values.user_experiences);
      } else {
        toast.error("Failed to update education. Please try again later.");
      }
    } catch (error) {
      console.error("Update profile experiences error:", error);
      toast.error("Failed to update experiences. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return null;

    // Convert date to IST (UTC+5:30)
    const istDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    // Format the IST date
    const formattedDate = format(istDate, "yyyy-MM-dd");

    return formattedDate;
  };

  return (
    <div>
      {/* <Model btnName={"fdsa"} /> */}
      <div
        className="modal fade"
        id="exampleModal1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header py-4">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit experiences
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  user_experiences:
                    profileheaderData?.data?.user_experiences || [],
                }}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <FieldArray name="user_experiences">
                      {({ push, remove }) => (
                        <>
                          {values.user_experiences.map(
                            (edu: any, index: number) => (
                              <div
                                key={index}
                                className="border rounded p-5 position-relative mt-4"
                              >
                                <span
                                  onClick={() => remove(index)}
                                  style={{
                                    display: "inline-block",
                                    position: "absolute",
                                    top: "-10px",
                                    right: "-10px",
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px",

                                    textAlign: "center",
                                    lineHeight: "30px",
                                    cursor: "pointer",
                                    boxShadow:
                                      "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                  }}
                                  className="btn btn-light-danger btn-sm p-0 btn-rounded"
                                >
                                  <KTIcon
                                    iconName="trash"
                                    iconType="duotone"
                                    className="fs-3 p-0"
                                  />
                                </span>
                                <div className="row mb-3">
                                  <div className="col-lg-6 fw-semibold text-muted">
                                    <span className="">Job title</span>
                                  </div>
                                  <div className="col-lg-6 fw-semibold text-muted">
                                    <span className="">Company/Venue</span>
                                  </div>
                                </div>
                                <div className="">
                                  <div className="row mb-3">
                                    <div className="col-lg-6">
                                      <Field
                                        type="text"
                                        name={`user_experiences.${index}.title`}
                                        className="form-control form-control-sm"
                                      />
                                    </div>
                                    <div className="col-lg-6">
                                      <>
                                        <Field
                                          type="text"
                                          name={`user_experiences.${index}.company`}
                                          className="form-control form-control-sm"
                                        />
                                      </>
                                    </div>
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <div className="col-lg-6 fw-semibold text-muted">
                                    <span className="">Location</span>
                                  </div>
                                  <div className="col-lg-6 fw-semibold text-muted">
                                    <span className="">Employment type</span>
                                  </div>
                                </div>

                                <div className="">
                                  <div className="row mb-3">
                                    <div className="col-lg-6">
                                      <Field
                                        type="text"
                                        name={`user_experiences.${index}.location`}
                                        className="form-control form-control-sm"
                                      />
                                    </div>
                                    <div className="col-lg-6">
                                      <>
                                        {/* <Field
                                          type="text"
                                          name={`user_experiences.${index}.employment_type_id`}
                                          className="form-control form-control-sm"
                                        /> */}

                                        <Select
                                          classNamePrefix="react-select"
                                          name={`user_experiences.${index}.employment_type_id`}
                                          options={emp.map((emp: any) => ({
                                            value: emp.id,
                                            label: emp.name,
                                          }))}
                                          onChange={(option: any) => {
                                            const selectedCountry = option
                                              ? option.value
                                              : "";
                                            setFieldValue(
                                              `user_experiences.${index}.employment_type_id`,
                                              selectedCountry
                                            );
                                          }}
                                          placeholder="Select a Country"
                                          value={emp
                                            .map((c: any) => ({
                                              value: c.id,
                                              label: c.name,
                                            }))
                                            .find(
                                              (option: any) =>
                                                option.value ==
                                                edu.employment_type_id
                                            )}
                                        />
                                      </>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-lg-6 fw-semibold text-muted">
                                    <span className="">From</span>
                                  </div>
                                  <div className="col-lg-6 fw-semibold text-muted">
                                    {!isStudyingArray[index] &&
                                      edu.to !== "Current" && (
                                        <span className="">To</span>
                                      )}
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="row mb-3">
                                    <div className="col-lg-6">
                                      <Flatpickr
                                        className="form-control form-control-sm"
                                        style={{ width: "100%" }}
                                        name={`user_experiences.${index}.from`}
                                        value={
                                          values.user_experiences[index].from
                                            ? new Date(
                                                values.user_experiences[
                                                  index
                                                ].from
                                              )
                                            : undefined // Ensure value is undefined if there's no valid date
                                        }
                                        options={{
                                          plugins: [
                                            monthSelectPlugin({
                                              shorthand: true,
                                              dateFormat: "M Y", // Format for display (short month and year)
                                              altFormat: "F Y", // Format for alternate display (full month and year)
                                              theme: "light",
                                            }),
                                          ],
                                          onChange: function (
                                            selectedDates,
                                            dateStr,
                                            instance
                                          ) {
                                            const formattedDate =
                                              selectedDates.length > 0
                                                ? format(
                                                    selectedDates[0],
                                                    "yyyy-MM-dd"
                                                  )
                                                : null;

                                            // Update Formik field value immediately
                                            setFieldValue(
                                              `user_experiences.${index}.from`,
                                              formattedDate
                                            );
                                          },
                                        }}
                                      />
                                    </div>

                                    <div className="col-lg-6">
                                      {!isStudyingArray[index] &&
                                        edu.to !== "Current" && (
                                          <Flatpickr
                                            className="form-control form-control-sm"
                                            style={{ width: "100%" }}
                                            name={`user_experiences.${index}.to`}
                                            value={
                                              values.user_experiences[index].to
                                                ? new Date(
                                                    values.user_experiences[
                                                      index
                                                    ].to
                                                  )
                                                : undefined // Ensure value is undefined if there's no valid date
                                            }
                                            options={{
                                              plugins: [
                                                monthSelectPlugin({
                                                  shorthand: true,
                                                  dateFormat: "M Y", // Format for display (short month and year)
                                                  altFormat: "F Y", // Format for alternate display (full month and year)
                                                  theme: "light",
                                                }),
                                              ],
                                              onChange: function (
                                                selectedDates,
                                                dateStr,
                                                instance
                                              ) {
                                                const formattedDate =
                                                  selectedDates.length > 0
                                                    ? format(
                                                        selectedDates[0],
                                                        "yyyy-MM-dd"
                                                      )
                                                    : null;

                                                // Update Formik field value immediately
                                                setFieldValue(
                                                  `user_experiences.${index}.to`,
                                                  formattedDate
                                                );
                                              },
                                            }}
                                          />
                                        )}
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-5 mb-7">
                                  <div className="form-check form-check-sm">
                                    <input
                                      className="form-check-input still_studying"
                                      type="checkbox"
                                      value="1"
                                      onChange={() =>
                                        handleCheckboxChange(
                                          index,
                                          setFieldValue
                                        )
                                      }
                                      checked={
                                        isStudyingArray[index] ||
                                        edu.to === "Current"
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexCheckDefault"
                                    >
                                      Currently studying
                                    </label>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-lg-5 fw-semibold text-muted">
                                    <span className="">Description</span>
                                  </div>
                                </div>
                                <div className="">
                                  <div className="">
                                    <Field
                                      as="textarea"
                                      className="form-control h-100"
                                      name={`user_experiences.${index}.desc`}
                                    ></Field>
                                  </div>
                                  <div></div>
                                </div>

                              </div>
                            )
                          )}
                          <div
                            className="modal-footer px-0 pb-0"
                            style={{
                              display: "flex",
                              justifyContent: "space-between btn-sm",
                              alignItems: "center",
                            }}
                          >
                            <button
                              type="button"
                              className="btn btn-light-primary btn-sm btn-sm"
                              style={{
                                marginRight: "auto",
                              }}
                              onClick={() =>
                                push({
                                  degree: "",
                                  country: "",
                                  from: "",
                                  to: "",
                                })
                              }
                            >
                              Add More
                            </button>

                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary btn-sm"
                              data-bs-dismiss="modal"
                            >
                              Save changes
                            </button>
                          </div>
                        </>
                      )}
                    </FieldArray>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-5 mb-xl-10">
        <div className="card-header">
          <div className="card-title m-0">
            <h4 className="fw-bold m-0 d-flex gap-3">
              <KTIcon
                iconName="briefcase"
                iconType="duotone"
                className="fs-1"
              />{" "}
              Experiences
            </h4>
          </div>

          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary menu-dropdown"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-flip="top-end"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            >
              <KTIcon iconName="pencil" iconType="duotone" className="fs-2" />
            </button>
          </div>
        </div>

        <div className="card-body p-9">
          {ExperienceData && ExperienceData?.length > 0 ? (
            ExperienceData.map((data: any, index: number) => (
              <div key={index}>
                <div className="row mb-3 text-start">
                  <div className="col-lg-12 d-flex fw-semibold">
                    <b className="fw-bolder  fs-6 text-gray-500 m-0 fw-bold">
                      {data.company || "-"}{" "}
                    </b>
                    <p className="text-muted fw-semibold fs-6 m-0">
                      {" "}
                      &nbsp;in&nbsp;
                    </p>
                    <b className=" text-gray-500 fs-6">
                      {data.location || "-"}{" "}
                    </b>{" "}
                    <b className="fs-6 fw-600 p-0 text-gray-500 mx-1">
                      {data.from
                        ? format(new Date(data.from), "MMM, dd")
                        : "Not specified"}{" "}
                      to{" "}
                      {data.to && data.to !== "Current"
                        ? format(new Date(data.to), "MMM, dd")
                        : data.to || "Not specified"}
                    </b>
                  </div>
                </div>
                {index !==
                  profileheaderData.data.user_experiences.length - 1 && (
                  <div className="separator mb-3 w-550px mx-auto"></div>
                )}
              </div>
            ))
          ) : (
            <div>
              <div className="">
                <div className="row mb-3 col-lg-12 text-start">
                  <div className="col-lg-8">
                    <p className="text-gray m-0 fw-bold">-</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListsProfileExperienceWidget8;
