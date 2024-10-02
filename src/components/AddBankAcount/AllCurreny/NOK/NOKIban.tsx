import { ErrorMessage, Field } from "formik";
import React from "react";

const NOKIban = ({ currencyData, initialValues }:any) => {
  
  return (
    <div>
      <div className="card mb-5 mb-xl-10 p-0">
        <div className="border-0">
          <div className="card-body p-5 row m-0">
            <h4 className="mb-5">{currencyData.title}</h4>
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="accountHolderName" className="form-label fs-6 text-gray-600">
                  {currencyData.fields[1].name} {/* Assuming fields[0] for bank code */}
                </label>
                <Field
                  id={currencyData.fields[1].group[0].key}
                  name="nokbankcode"
                  placeholder="Please choose recipient's bank"
                  type="text"
                  className="form-control form-control-sm border-1 shadow-none"
                
                  
                />
                <ErrorMessage
                  name="nokbankcode"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="address" className="form-label fs-6 text-gray-600">
                  {currencyData.fields[2].name} {/* Assuming fields[1] for IBAN */}
                </label>
                <Field
                  id={currencyData.fields[2].group[0].key}
                  name="nokiban"
                  placeholder="DE12345678901234567890"
                  type="text"
                  className="form-control form-control-sm border-1 shadow-none"
                />
                <ErrorMessage
                  name="nokiban"
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

export default NOKIban;
