import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { KTIcon } from "@/_metronic/helpers";
import { Iprofile } from "@/api/profile/types";
import { toast } from "react-toastify";
import { updateProfileEducation } from "@/api/profile/get_profile_information";
import Select from "react-select";
import { getCountry } from "@/api/settings/settings";
import { ICountry } from "@/api/settings/types";
import CustomDateInput from "./CustomDateInput";
import { format } from "date-fns";

interface ProfileHeaderProps {
  profileheaderData: Iprofile;
}

const ListsProfileEduWidget6 = ({ profileheaderData }: ProfileHeaderProps) => {
  const [isStudyingArray, setIsStudyingArray] = useState<boolean[]>(
    Array(profileheaderData?.data?.education?.length).fill(false)
  );
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [educationData, setEducationData] = useState<any[]>(
    profileheaderData?.data?.education || []
  );

  useEffect(() => {
    const initialStudyingArray = profileheaderData?.data.education.map(
      (edu: any) => edu.to === "Present"
    );
    setIsStudyingArray(initialStudyingArray);
  }, [profileheaderData]);

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

  const handleSubmit = async (
    values: any,
    { setSubmitting, setFieldValue }: any
  ) => {
    try {
      if (values.education.length === 0) {
        toast.error("Please add education information before saving.");
        return;
      }

      const formData = {
        education: values.education.map((edu: any) => ({
          degree: edu.degree,
          country: edu.country,
          from: format(new Date(edu.from), "yyyy-MM-dd"),
          to:
            edu.to === "Present" ? "" : format(new Date(edu.to), "yyyy-MM-dd"),
        })),
      };

      // Call the API to update profile education
      const updatedProfile = await updateProfileEducation(formData);

      if (updatedProfile.status) {
        toast.success(updatedProfile.message);
        setEducationData(values.education);
      } else {
        toast.error("Failed to update education. Please try again later.");
      }
    } catch (error) {
      console.error("Update profile education error:", error);
      toast.error("Failed to update education. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckboxChange = (index: number, setFieldValue: any) => {
    setIsStudyingArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];

      // Set the 'to' field based on checkbox state
      setFieldValue(`education.${index}.to`, newArray[index] ? "Present" : "");

      return newArray;
    });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header py-4">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit educations
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
                  education: profileheaderData?.data?.education || [],
                }}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <FieldArray name="education">
                      {({ push, remove }) => (
                        <>
                          {values.education.map((edu: any, index: number) => (
                            <div
                              key={index}
                              className="border rounded p-5 position-relative mt-4"
                            >
                              <div className="row mb-3">
                                <div className="col-lg-6 fw-semibold text-muted">
                                  <span className="">Degree</span>
                                </div>
                                <div className="col-lg-6 fw-semibold text-muted">
                                  <span className="">Country</span>
                                </div>
                              </div>
                              <div className="">
                                <div className="row mb-3">
                                  <div className="col-lg-6">
                                    <Field
                                      type="text"
                                      name={`education.${index}.degree`}
                                      className="form-control form-control-sm"
                                    />
                                  </div>
                                  <div className="col-lg-6">
                                    <>
                                      <Select
                                        classNamePrefix="react-select"
                                        name={`education.${index}.country`}
                                        options={countries.map((country) => ({
                                          value: country.id,
                                          label: country.countryName,
                                        }))}
                                        onChange={(option: any) => {
                                          const selectedCountry = option
                                            ? option.value
                                            : "";
                                          setFieldValue(
                                            `education.${index}.country`,
                                            selectedCountry
                                          );
                                        }}
                                        placeholder="Select a Country"
                                        value={countries
                                          .map((c) => ({
                                            value: c.id,
                                            label: c.countryName,
                                          }))
                                          .find(
                                            (option: any) =>
                                              option.value == edu.country
                                          )}
                                      />
                                    </>
                                  </div>
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
                                </div>
                              </div>
                              <div className="row mb-3">
                                <div className="col-lg-6 fw-semibold text-muted">
                                  <span className="">From</span>
                                </div>
                                <div className="col-lg-6 fw-semibold text-muted">
                                  {!isStudyingArray[index] &&
                                    edu.to !== "Present" && (
                                      <span className="">To</span>
                                    )}
                                </div>
                              </div>
                              <div className="">
                                <div className="row mb-3">
                                  <div className="col-lg-6">
                                    <Field
                                      type="text"
                                      name={`education.${index}.from`}
                                      component={CustomDateInput}
                                    />
                                  </div>
                                  <div className="col-lg-6">
                                    {!isStudyingArray[index] &&
                                      edu.to !== "Present" && (
                                        <Field
                                          type="text"
                                          name={`education.${index}.to`}
                                          component={CustomDateInput}
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
                                      handleCheckboxChange(index, setFieldValue)
                                    }
                                    checked={
                                      isStudyingArray[index] ||
                                      edu.to === "Present"
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                  >
                                    Currently studying
                                  </label>
                                </div>
                              </div>{" "}
                            </div>
                          ))}

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
                              type="submit"
                              className="btn btn-light-primary btn-sm btn-sm"
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
              <KTIcon iconName="book" iconType="duotone" className="fs-1" />{" "}
              Educations
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
              data-bs-target="#exampleModal"
            >
              <KTIcon iconName="pencil" iconType="duotone" className="fs-2" />
            </button>
          </div>
        </div>
        <div className="card-body p-9">
          {educationData && educationData?.length > 0 ? (
            educationData?.map((edu: any, index: any) => (
              <div
                key={index}
                style={{
                  transition: "all 0.3s ease",
                  opacity: educationData.length > index ? 1 : 0,
                  transform: `scale(${educationData.length > index ? 1 : 0.5})`,
                }}
              >
                <div className="row mb-3">
                  <div className="col-lg-12 fw-semibold d-flex">
                    <b className=" m-0 fs-6  text-gray-500 d-flex gap-2   ">
                      {edu.degree || "-"}{" "}
                    </b>
                    <p className="m-0 text-muted fw-semibold">&nbsp;in&nbsp;</p>
                    <b className="fs-6 m-0  m-0 text-gray-500">
                      {countries
                        .map((c) => ({
                          value: c.id,
                          label: c.countryName,
                        }))
                        .find((option: any) => option.value == edu.country)
                        ?.label || null}
                    </b>
                    <p className="m-0 text-muted fw-semibold">
                      &nbsp;from&nbsp;
                    </p>
                    <b className="fs-6 fw-600  p-0 text-gray-500">
                      {edu.from
                        ? format(new Date(edu.from), "MMM dd, yyyy")
                        : "Not specified"}{" "}
                      to{" "}
                      {edu.to && edu.to !== "Present"
                        ? format(new Date(edu.to), "MMM dd, yyyy")
                        : edu.to || "Not specified"}
                    </b>
                  </div>
                </div>
                {index < profileheaderData.data.education.length - 1 && (
                  <div className="separator mb-3 w-550px mx-auto"></div>
                )}
              </div>
            ))
          ) : (
            <div>
              <div className="row mb-3 col-lg-12">
                <div className="col-lg-4 fw-semibold text-muted">
                  <span className="">Degree</span>
                </div>
                <div className="col-lg-8">
                  <p className="fw-bold m-0 fs-6 text-gray-800 ">
                    - <span className="fs-7 text-gray-500">(-)</span>
                  </p>
                </div>
              </div>
              <div className="">
                <div className="row mb-3 col-lg-12">
                  <div className="col-lg-4 fw-semibold text-muted">
                    <span className="">Country</span>
                  </div>
                  <div className="col-lg-8">
                    <p className="fs-7 m-0 text-gray-500">-</p>
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

export default ListsProfileEduWidget6;
