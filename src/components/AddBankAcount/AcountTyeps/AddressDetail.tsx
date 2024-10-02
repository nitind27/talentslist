"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import SelectCustomStyles from "../../SelectCustomStyles/SelectCustomStyles";
import Map from "../../profile/lists/profile/Map";

const AddressDetail = ({ formik }: any) => {
  const options = [
    { value: "Private", label: "Person" },
    { value: "Business", label: "Business" },
  ];

  return (
    <div className="card p-0 mb-5 mb-xl-10">
      <div className="border-0">
        <div className="card-body p-5 m-0">
          <h4 className="mb-7 text-capitalize">address details :</h4>
          <div className="row">
            <div className="pe-2 col-6">
              <div className="mb-5">
                <label
                  htmlFor="account_holder_name"
                  className="form-label fs-6 text-gray-600"
                >
                  Account Holder Name
                </label>
                <Field
                  id="account_holder_name"
                  name="account_holder_name"
                  placeholder="Account Holder Name"
                  type="text"
                  className="form-control form-control-sm border-1 shadow-none"
                />
                <ErrorMessage
                  name="account_holder_name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="address"
                  className="form-label fs-6 text-gray-600"
                >
                  Address
                </label>
                <Field
                  id="address"
                  name="address"
                  placeholder="Address"
                  type="text"
                  className="form-control form-control-sm border-1 shadow-none"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="postCode"
                  className="form-label fs-6 text-gray-600"
                >
                  Post Code
                </label>
                <Field
                  id="postCode"
                  name="postCode"
                  placeholder="Post Code"
                  type="text"
                  className="form-control form-control-sm border-1 shadow-none"
                />
                <ErrorMessage
                  name="postCode"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-5">
                <label
                  htmlFor="legal_type"
                  className="form-label fs-6 text-gray-600"
                >
                  Legal Type
                </label>
                <Select
                  id="legal_type"
                  name="legal_type"
                  className="bg-body"
                  styles={SelectCustomStyles}
                  classNamePrefix="react-select"
                  options={options}
                  placeholder="Select Legal Type"
                  menuPlacement="auto"
                  onChange={(option) =>
                    formik.setFieldValue(
                      "legalType",
                      option ? option.value : ""
                    )
                  }
                  value={options.find(
                    (option) => option.value === formik?.values?.legalType || ""
                  )}
                />
                <ErrorMessage
                  name="legalType"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="location"
                  className="form-label fs-6 text-gray-600"
                >
                  Location
                </label>
                <Map
                  input={
                    <Field
                      type="text"
                      name="location"
                      placeholder="Search location"
                      className="form-control col-12 form-control-sm border-1 shadow-none"
                    />
                  }
                  onChange={(location: any) => {}}
                />
                <ErrorMessage
                  name="location"
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

export default AddressDetail;
