import React from "react";
import { Field, ErrorMessage } from "formik";

const WIRE = ({ currencyData, formik }: { currencyData: any; formik: any }) => {
  return (
    <div className="card mb-5 mb-xl-10 p-0">
      <div className="border-0">
        <div className="card-body p-5 row m-0">
          <h4 className="mb-5">{currencyData.title}</h4>
          <div className="col-6">
            <div className="mb-5">
              <label htmlFor="wirenumber" className="form-label fs-6 text-gray-600">
                {currencyData.fields[1].name}
              </label>
              <Field
                id={currencyData.fields[1].group[0].key}
                name="wirenumber"
                placeholder="020123456"
                type="text"
                className="form-control form-control-sm border-1 shadow-none"
              />
              <ErrorMessage name="wirenumber" component="div" className="text-danger" />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-5">
              <label htmlFor="wireaccountno" className="form-label fs-6 text-gray-600">
                {currencyData.fields[2].name}
              </label>
              <Field
                id={currencyData.fields[2].group[0].key}
                name="wireaccountno"
                placeholder="12345678"
                type="text"
                className="form-control form-control-sm border-1 shadow-none"
              />
              <ErrorMessage name="wireaccountno" component="div" className="text-danger" />
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
                      name="wireaccountType"
                      value={formdata.key}
                      className="form-check-input"
                    />
                    {formdata.name}
                  </label>
                ))}
              </div>
              <ErrorMessage name="wireaccountType" component="div" className="text-danger" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WIRE;
