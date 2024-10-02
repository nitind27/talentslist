import React from "react";
import { Field, ErrorMessage } from "formik";

const SWIFT = ({ currencyData, formik }: { currencyData: any; formik: any }) => {
  return (
    <div className="card mb-5 mb-xl-10 p-0">
      <div className="border-0">
        <div className="card-body p-5 row m-0">
          <h4 className="mb-5">{currencyData.title}</h4>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="bankbiccode" className="form-label fs-6 text-gray-600">
                {currencyData.fields[1].name}
              </label>
              <Field
                id={currencyData.fields[1].group[0].key}
                name="bankbiccode"
                placeholder="BUKBGB22"
                type="text"
                className="form-control form-control-sm border-1 shadow-none"
              />
              <ErrorMessage name="bankbiccode" component="div" className="text-danger" />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="ibanac" className="form-label fs-6 text-gray-600">
                {currencyData.fields[2].name}
              </label>
              <Field
                id={currencyData.fields[2].group[0].key}
                name="ibanac"
                placeholder="IBAN / Account number"
                type="text"
                className="form-control form-control-sm border-1 shadow-none"
              />
              <ErrorMessage name="ibanac" component="div" className="text-danger" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWIFT;