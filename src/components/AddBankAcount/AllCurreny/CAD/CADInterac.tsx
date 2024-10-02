'use client'
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";


const CADInterac = ({ currencyData, formik }:any) => {
  return (
    <div>
      <div className="card mb-5 mb-xl-10 p-0">
        <div className="border-0">
          <div className="card-body p-5 row m-0">
            <h4 className="mb-5">Interac</h4>
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="CADEmail" className="form-label fs-6 text-gray-600">
                  Interac registered email:
                </label>
                <Field
                  id="CADEmail"
                  name="CADEmail"
                  placeholder="example@example.ex"
                  type="email"
                  className="form-control form-control-sm border-1 shadow-none"
                />
                <ErrorMessage name="CADEmail" component="div" className="text-danger" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CADInterac;