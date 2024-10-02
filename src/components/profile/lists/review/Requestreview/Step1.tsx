import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import CustomDateInput from "../../profile/CustomDateInput";
import Map from "../../profile/Map";
import Select from "react-select";
import { ICountry } from "@/api/settings/types";
import { getevenettype } from "@/api/settings/settings";

interface Step1Props {
  onContinue: (data: any) => void;
  formData: {
    client_email: string;
    client_name: string;
    event_name: string;
    event_date: string;
    location: string;
    event_type: string;
  };
}

const Step1: React.FC<Step1Props> = ({ onContinue, formData }) => {
  const validationSchema = Yup.object({
    client_email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    client_name: Yup.string().required("Required"),
    event_name: Yup.string().required("Required"),
    event_date: Yup.date().required("Required"),
    location: Yup.string().required("Required"),
    event_type: Yup.string().required("Required"),
  });

  const [emp, setEmp] = useState<ICountry[]>([]);

  useEffect(() => {
    const fetchemployee = async () => {
      try {
        const response = await getevenettype();
        setEmp(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchemployee();
  }, []);
  const onSubmit = (values: any) => {
    onContinue(values);
  };
  return (
    <div>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="client_email" className="fw-bold mt-5">
                Client Email
              </label>
              <Field
                type="email"
                id="client_email"
                name="client_email"
                className="form-control form-control-sm mt-2"
              />
              <ErrorMessage
                name="client_email"
                component="div"
                className="text-danger"
              />
            </div>

            <div>
              <label htmlFor="client_name" className="fw-bold mt-5">
                Client Name
              </label>
              <Field
                type="text"
                id="client_name"
                name="client_name"
                className="form-control form-control-sm mt-2"
              />
              <ErrorMessage
                name="client_name"
                component="div"
                className="text-danger"
              />
            </div>

            <div>
              <label htmlFor="event_name" className="fw-bold mt-5">
                Event Name
              </label>
              <Field
                type="text"
                id="event_name"
                name="event_name"
                className="form-control form-control-sm mt-2"
              />
              <ErrorMessage
                name="event_name"
                component="div"
                className="text-danger"
              />
            </div>

            <div>
              <label htmlFor="event_date" className="fw-bold mt-5">
                Event Date
              </label>
              <Field
                type="text"
                component={CustomDateInput}
                name="event_date"
              />
              <ErrorMessage
                name="event_date"
                component="div"
                className="text-danger"
              />
            </div>

            <div>
              <label htmlFor="location" className="fw-bold ">
                Location
              </label>
              <Map
                input={
                  <Field
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Search location"
                    className="form-control col-12 form-control-sm border-1 shadow-none"
                  />
                }
                onChange={(location: any) => {
                  setFieldValue("location", location);
                }}
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="event_type" className="fw-bold mt-5">
                Event Type
              </label>
              <Select
                classNamePrefix="react-select"
                name="event_type"
                options={emp.map((evt: any) => ({
                  value: evt.name,
                  label: evt.name,
                }))}
                placeholder="Select an Event Type"
                onChange={(option: any) => {
                  setFieldValue("event_type", option ? option.value : "");
                }}
              />
              <ErrorMessage
                name="event_type"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary btn-sm" type="submit">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step1;
