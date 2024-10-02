import React from 'react';
import { Field, ErrorMessage } from "formik";

const GBPLocalBank = ({ currencyData, initialValues }: { currencyData: any, initialValues: any }) => {
  return (
    <div>
      <div className="card mb-5 mb-xl-10 p-0">
        <div className="border-0">
          <div className="card-body p-5 row m-0">
            <h4 className="mb-5">{currencyData.title}</h4>
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="accountHolderName" className="form-label fs-6 text-gray-600">
                  {currencyData.fields[1].name}
                </label>
                <Field
                  id={currencyData.fields[1].group[0].key}
                  name="uksortcode"
                  placeholder="40-30-20"
                  type="text"
                  className="form-control form-control-sm  border-1 shadow-none"
                  
                />
                <ErrorMessage
                  name="uksortcode"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="address" className="form-label fs-6 text-gray-600">
                  {currencyData.fields[2].name}
                </label>
                <Field
                  id={currencyData.fields[2].group[0].key}
                  name="gbpaccountno"
                  placeholder="12345678"
                  type="text"
                  className="form-control form-control-sm  border-1 shadow-none"
                  
                />
                <ErrorMessage
                  name="gbpaccountno"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GBPLocalBank;
