import React, { useEffect, useRef } from "react";
import { Field, ErrorMessage } from "formik";
import Select, { SingleValue } from "react-select";
import SingleDatePicker from "@/components/SingleDatePicker/SingleDatePicker";
import { BankForm } from "@/api/payment/types";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const AEDLocalbank = ({ currencyData, formik }: { currencyData: BankForm; formik: any }) => {
  const datepickerRef = useRef(null);

  useEffect(() => {
    if (datepickerRef.current) {
      flatpickr(datepickerRef.current, {
        dateFormat: "Y-m-d",
        onChange: function(selectedDates) {
          const formattedDate = selectedDates[0].toISOString().split('T')[0]; // Get YYYY-MM-DD from ISO string
          formik.setFieldValue("aaddate", formattedDate); // Set the value of aaddate in Formik
        },
      });
    }
  }, [formik]); // Ensure useEffect runs when formik changes

  return (
    <div className="card p-0 mb-5 mb-xl-10">
      <div className="border-0">
        <div className="card-body p-5 m-0">
          <h3 className="mb-7 text-capitalize">{currencyData.title}</h3>
          <div className="row">
            <div className="pe-2 col-6">
              <div className="mb-5">
                <label className="form-label">{currencyData.fields[1].name}</label>
                <SingleDatePicker
                  input={
                    <input
                      ref={datepickerRef}
                      name="aaddate"
                      className="form-control form-control-sm"
                      placeholder="Pick a date"
                      id="date_range_picker"
                    />
                  }
                />
                <ErrorMessage name="aaddate" component="div" className="text-danger" />
              </div>
            </div>

            <div className="col-6">
              <div className="mb-5">
                <label htmlFor="aediban" className="form-label">
                  {currencyData.fields[2].name}
                </label>
                <Field
                  id={currencyData.fields[2].group[0].key}
                  name="aediban"
                  placeholder="AE070331234567890123456"
                  type="text"
                  className="form-control form-control-sm border-1 shadow-none"
                />
                <ErrorMessage name="aediban" component="div" className="text-danger" />
              </div>
            </div>

            {currencyData.fields.map((field) => {
              if (field.name === "Recipient's nationality (optional)") {
                return (
                  <div className="col-6 mb-5" key={field.name}>
                    <label htmlFor="aedoption" className="form-label">
                      {field.name}
                    </label>
                    <Select
                      id={field.group[0].key}
                      name="aedoption"
                      className="bg-body"
                      classNamePrefix="react-select"
                      options={field.group[0].valuesAllowed?.map((country) => ({
                        value: country.key,
                        label: country.name,
                      }))}
                      placeholder="Select Legal Type"
                      menuPlacement="auto"
                      value={
                        formik.values.aedoption
                          ? {
                              value: formik.values.aedoption,
                              label: field.group[0].valuesAllowed?.find(
                                (option) => option.key === formik.values.aedoption
                              )?.name,
                            }
                          : null
                      }
                      onChange={(selectedOption: SingleValue<{ value: any; label: string | undefined }>) => {
                        if (selectedOption) {
                          formik.setFieldValue("aedoption", selectedOption.value);
                        }
                      }}
                    />
                    <ErrorMessage name="aedoption" component="div" className="text-danger" />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AEDLocalbank;
