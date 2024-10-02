import React from "react";
import { Field, ErrorMessage } from "formik";

const ACH = ({ currencyData, formik }: { currencyData: any; formik: any }) => {
  return (
    <div className="card mb-5 mb-xl-10 p-0">
      <div className="border-0">
        <div className="card-body p-5 row m-0">
          <h4 className="mb-5">{currencyData.title}</h4>
          <div className="col-6">
            <div className="mb-5">
              <label htmlFor="achroutingno" className="form-label fs-6 text-gray-600">
                {currencyData.fields[1].name}
              </label>
              <Field
                id={currencyData.fields[1]?.group[0].key}
                name="achroutingno"
                placeholder="020123456"
                type="text"
                className="form-control form-control-sm border-1 shadow-none"
              />
              <ErrorMessage name="achroutingno" component="div" className="text-danger" />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-5">
              <label htmlFor="achacoountno" className="form-label fs-6 text-gray-600">
                {currencyData.fields[2].name}
              </label>
              <Field
                id={currencyData.fields[2].group[0].key}
                name="achacoountno"
                placeholder="12345678"
                type="text"
                className="form-control form-control-sm border-1 shadow-none"
              />
              <ErrorMessage name="achacoountno" component="div" className="text-danger" />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-5">
              <label className="form-label fs-6 text-gray-600">
                {currencyData.fields[3].name}
              </label>
              <div className="d-flex align-items-center fs-6 text-gray-600">
                {currencyData.fields[3].group[0].valuesAllowed?.map((formdata: any, index: number) => (
                  <label key={index} className="me-5 form-check form-check-sm my-auto">
                    <Field
                      type="radio"
                      name="achaccountType"
                      value={formdata.key}
                      className="form-check-input"
                    />
                    {formdata.name}
                  </label>
                ))}
              </div>
              <ErrorMessage name="achaccountType" component="div" className="text-danger" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACH;
