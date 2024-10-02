"use client";
import { KTIcon } from "@/_metronic/helpers";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Ilanguages, Iprofile } from "@/api/profile/types";
import { updateProfileInformation } from "@/api/profile/get_profile_information";
import { toast } from "react-toastify";
import { getlanguages } from "@/api/profile/languages/get_languages";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

interface PersonalInfoCardProps extends Iprofile {}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  full_name,
  first_name,
  last_name,
  sname_visible,
  stage_name,
  birth_date,
  gender,
  aboutme,
  language,
  username,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [languages, setLanguages] = useState<Ilanguages[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const initialValues: Iprofile = {
    full_name,
    first_name,
    last_name,
    sname_visible,
    stage_name,
    birth_date,
    gender,
    aboutme,
    language,
    review: undefined,
    data: undefined,
    status: false,
    consumer_id: 0,
    message: "",
    degree: [],
    personal_information: "",
    citizenship: "",
    location: "",
    available_to_travel: 1,
    preferred_countries: [],
    username,
    city: "",
    country: "",
    nationality: undefined,
  };

  const validationSchema = Yup.object({
    full_name: Yup.string().required("Full Name is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    sname_visible: Yup.string().required("Stage Name Visibility is required"),
    stage_name: Yup.string().required("Stage Name is required"),
    birth_date: Yup.date().required("Birth Date is required"),
    gender: Yup.string().required("Gender is required"),
    aboutme: Yup.string().required("aboutme is required"),
    languages: Yup.array().required("At least one language is required"),
    username: Yup.array().required("User Name is required"),
  });

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancel = (resetForm: any) => {
    setIsEditMode(false);
    resetForm();
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await getlanguages();
        setLanguages(response.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);
  const handleSubmit = async (values: Iprofile, { setSubmitting }: any) => {
    try {
      const response = await updateProfileInformation({
        ...values,
        language: values.language.map((item) => item.id),
      } as any);

      if (response.status) {
        setIsEditMode(false);
        toast.success(response.message);
      } else {
        toast.error("Some error occurred. Please try again later.");
      }
    } catch (error) {
      toast.error("Some error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
    router.refresh();
  };

  return (
    <div className="card mb-5 mb-xl-10">
      <div className="card-header border-1">
        <div className="card-title m-0">
          <h4 className="fw-bold m-0 d-flex gap-3">
            <KTIcon iconName="badge" iconType="duotone" className="fs-1 " />
            Personal Information
          </h4>
        </div>
        <div className="card-toolbar">
          {!isEditMode && (
            <button
              type="button"
              className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary menu-dropdown edit_personal_info"
              onClick={handleEditClick}
            >
              <KTIcon iconName="pencil" iconType="duotone" className="fs-2" />
            </button>
          )}
        </div>
      </div>

      <div className="card-body p-9">
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({
            resetForm,
            values,
            handleChange,
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row mb-3">
                {isEditMode ? (
                  <>
                    <div className="d-flex">
                      <div className="col-6 pe-3">
                        <label className="mb-3 fw-semibold text-muted">
                          First name
                        </label>
                        <Field
                          type="text"
                          name="first_name"
                          value={values.first_name}
                          onChange={handleChange}
                          className="form-control form-control-sm border-1"
                        />
                      </div>
                      <div className="col-6 ps-3">
                        <label className="mb-3 fw-semibold text-muted">
                          Last name
                        </label>
                        <Field
                          type="text"
                          name="last_name"
                          value={values.last_name}
                          onChange={handleChange}
                          className="form-control form-control-sm border-1 shadow-none"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-4 fw-semibold text-muted">
                      <span>Full Name</span>
                    </div>
                    <p className="fw-bold p-0 ps-1 col-8 m-0">
                      {values.first_name + " " + values.last_name}
                    </p>
                  </>
                )}
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="text-danger"
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="row mb-3">
                <div className="">
                  {isEditMode ? (
                    <>
                      <div className="d-flex">
                        <div className="col-6 pe-3">
                          <label className="mb-3 fw-semibold text-muted ">
                            Stage Name Visibility
                          </label>
                          <div className="d-flex">
                            <label className="form-check form-check-sm form-check-solid me-5">
                              <Field
                                type="radio"
                                name="sname_visible"
                                value="1"
                                checked={values.sname_visible == 1}
                                onChange={handleChange}
                                className="form-check-input me-2"
                              />
                              Yes
                            </label>
                            <label className="form-check form-check-sm form-check-solid">
                              <Field
                                type="radio"
                                name="sname_visible"
                                value="0"
                                checked={values.sname_visible == 0}
                                onChange={handleChange}
                                className="form-check-input me-2"
                              />
                              No
                            </label>
                          </div>
                        </div>
                        <div className="col-6 ps-3">
                          <label className="mb-3 fw-semibold text-muted">
                            Stage Name
                          </label>
                          <Field
                            type="text"
                            name="stage_name"
                            value={values.stage_name}
                            onChange={handleChange}
                            className="form-control form-control-sm border-1 shadow-none"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex row">
                        <div className="col-4 mb-2 fw-semibold text-muted">
                          <span>Stage Name Visibility</span>
                        </div>
                        <p className="fw-bold m-0 p-0 ps-1 col-8">
                          {values.sname_visible == 1 ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="d-flex row">
                        <div className="col-4 fw-semibold text-muted">
                          <span>Stage Name</span>
                        </div>
                        <p className="fw-bold col-8 p-0 ps-1 m-0">
                          {values.stage_name || ""}
                        </p>
                      </div>
                    </>
                  )}
                  <ErrorMessage
                    name="sname_visible"
                    component="div"
                    className="text-danger"
                  />
                  <ErrorMessage
                    name="stage_name"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="row mb-3">
                {isEditMode ? (
                  <>
                    <div className="col-6">
                      <label className="mb-3 fw-semibold text-muted">
                        Birth Date
                      </label>
                      <Field
                        type="date"
                        name="birth_date"
                        value={values.birth_date.split(" ")[0]} // Extracting only the date part
                        onChange={handleChange}
                        className="form-control form-control-sm border-1 shadow-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-4 mb-2 fw-semibold text-muted">
                        <span>Birth Date</span>
                      </div>
                      <p className="fw-bold col-8 m-0">
                        {new Date(values.birth_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </>
                )}
                <ErrorMessage
                  name="birth_date"
                  component="div"
                  className="text-danger"
                />

                {isEditMode ? (
                  <>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label className="mb-3 fw-semibold text-muted">
                            Gender
                          </label>
                          <div className="d-flex">
                            <label className="form-check form-check-sm form-check-solid me-5">
                              <Field
                                type="radio"
                                name="gender"
                                value="1"
                                checked={values.gender == "1"}
                                onChange={handleChange}
                                className="form-check-input"
                              />
                              Male
                            </label>
                            <label className="form-check form-check-sm form-check-solid">
                              <Field
                                type="radio"
                                name="gender"
                                value="2"
                                checked={values.gender == "2"}
                                onChange={handleChange}
                                className="form-check-input"
                              />
                              Female
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-flex row">
                      <div className="col-4 fw-semibold text-muted">
                        <span>Gender</span>
                      </div>
                      <p className="fw-bold col-8 m-0">
                        {values.gender == "1" ? "Male" : "Female"}
                      </p>
                    </div>
                  </>
                )}
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="row">
                {isEditMode ? (
                  <>
                    <div className="col-6">
                      <label className="mb-3 fw-semibold text-muted">
                        About
                      </label>
                      <Field
                        as="textarea"
                        name="aboutme"
                        onChange={handleChange}
                        value={values.aboutme}
                        className="form-control col-12 form-control-sm border-1 shadow-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-4 mb-2 fw-semibold text-muted">
                        <span>About Me</span>
                      </div>
                      <p className="fw-bold col-8 m-0">{values.aboutme}</p>
                    </div>
                  </>
                )}
                <ErrorMessage
                  name="aboutme"
                  component="div"
                  className="text-danger"
                />

                {isEditMode ? (
                  <>
                    <div className="col-6">
                      <label className="mb-3 fw-semibold text-muted">
                        Language
                      </label>
                      <>
                        <Select
                          components={animatedComponents}
                          options={languages.map((language) => ({
                            value: language.id,
                            label: language.name,
                          }))}
                          isMulti
                          className="form-control.border-black"
                          closeMenuOnSelect={false}
                          placeholder="Select languages"
                          onChange={(selectedOptions) =>
                            setFieldValue(
                              "language",
                              selectedOptions.map((option) => ({
                                id: option.value,
                                name: option.label,
                              }))
                            )
                          }
                          defaultValue={values.language.map((lang) => ({
                            value: lang.id,
                            label: lang.name,
                          }))}
                        />
                      </>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-4 mb-3 fw-semibold text-muted">
                        <span>language</span>
                      </div>
                      <p className="fw-bold col-8 m-0">
                        {values?.language
                          ? values?.language
                              .map((lang: any) => lang.name)
                              .join(", ")
                          : "-"}
                      </p>
                    </div>
                  </>
                )}
                <ErrorMessage
                  name="languages"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="row">
                {isEditMode ? (
                  <>
                    <div className="col-6">
                      <label className="mb-3 fw-semibold text-muted">
                        Username
                      </label>
                      <Field
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={values.username}
                        placeholder={values.username}
                        className="form-control col-12 form-control-sm border-1 shadow-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-4 mb-2 fw-semibold text-muted">
                        <span>Username</span>
                      </div>
                      <p className="fw-bold col-8 m-0">{values.username}</p>
                    </div>
                  </>
                )}
                <ErrorMessage
                  name="usename"
                  component="div"
                  className="text-danger"
                />
              </div>

              {isEditMode && (
                <div className="d-flex mt-5 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-sm me-5"
                    style={{ backgroundColor: "#D9214E", color: "white" }}
                    onClick={() => handleCancel(resetForm)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm"
                    style={{ backgroundColor: "#0036e3", color: "white" }}
                    disabled={isSubmitting}
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

export default PersonalInfoCard;
