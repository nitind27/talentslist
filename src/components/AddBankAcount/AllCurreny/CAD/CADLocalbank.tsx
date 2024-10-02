'use client'
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const CADLocalbank = ({ currencyData, formik }:any) => {
  return (
    <div>
      <div className="card mb-5 mb-xl-10 p-0">
        <div className="border-0">
          <div className="card-body p-5 row m-0">
            <h4 className="mb-5">{currencyData.title}</h4>
            <div className="col-6">
              <div className="mb-5">
                <label htmlFor="cadinstitition" className="form-label fs-6 text-gray-600">
                  {currencyData.fields[1].name}
                </label>
                <Field
                  id={currencyData.fields[1].group[0].key}
                  name="cadinstitition"
                  placeholder="006"
                  type="text"
                  className="form-control form-control-sm border-1 shadow-none"
                />
                <ErrorMessage name="cadinstitition" component="div" className="text-danger"/>
              </div>
            </div>
            <div className="col-6">
              <div className="mb-5">
                <label htmlFor="cadtransit" className="form-label fs-6 text-gray-600">
                  {currencyData.fields[2].name}
                </label>
                <Field
                  id={currencyData.fields[2].group[0].key}
                  name="cadtransit"
                  placeholder="04841"
                  type="text"
                  className="form-control form-control-sm border-1 shadow-none"
                />
                <ErrorMessage name="cadtransit" component="div" className="text-danger" />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-5">
                <label htmlFor="cadaccountno" className="form-label fs-6 text-gray-600">
                  {currencyData.fields[3].name}
                </label>
                <Field
                  id={currencyData.fields[3].group[0].key}
                  name="cadaccountno"
                  placeholder="1234567"
                  type="text"
                  className="form-control form-control-sm border-1 shadow-none"
                />
                <ErrorMessage name="cadaccountno" component="div" className="text-danger" />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-5">
                <label className="form-label fs-6 text-gray-600">
                  {currencyData.fields[4].name}
                </label>
                <div className="d-flex align-items-center fs-6 text-gray-600 form-check-sm">
                  {currencyData.fields[4].group[0].valuesAllowed?.map((formdata: { key: any; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                    <label key={index} className="me-5 form-check form-check-sm my-auto">
                      <Field
                        type="radio"
                        name="accountType"
                        value={formdata.key}
                        className="form-check-input"
                      />
                      {formdata.name}
                    </label>
                  ))}
                </div>
                <ErrorMessage name="accountType" component="div" className="text-danger"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CADLocalbank;