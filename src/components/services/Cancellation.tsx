"use client";
import React, { useState } from "react";
import { KTIcon } from "@/_metronic/helpers";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from 'react-select';
import { updateCancellation } from "@/api/services/services";
import { toast } from "react-toastify";
import { ICancellationData } from "@/api/services/types";
import SelectCustomStyles from "../SelectCustomStyles/SelectCustomStyles";

interface CancellationProps {
  cancellationData: ICancellationData | null;
}

const Cancellation: React.FC<CancellationProps> = ({ cancellationData: initialCancellationData }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [cancellationData, setCancellationData] = useState(initialCancellationData);

  const options = [
    { value: 'hour', label: 'Hour (s)' },
    { value: 'day', label: 'Day (s)' },
  ];

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleSave = async (values: any) => {
    try {
      console.log(values.cancel_fees_value);
      const transformedValues:any = {
        free_cancellation: values.free_cancellation ? 1 : 0,
        cancel_before_value: values.cancel_before_value || null,
        cancel_before_type: values.cancel_before_type || 0,
        paid_cancellation_type: values.cancel_fees_type === "Full advanced payment" ? "full" : "part",
        cancel_fees_value: values.cancel_fees_value || "",
        cancel_fees_type: values.cancel_fees_type || "",
      };

      const response = await updateCancellation(transformedValues);
      if (response.data && response.data.status) {
        setCancellationData(response.data.data);
        setIsEditMode(false);
        toast.success(response.data.message);
      } else if (response.data && response.data.message) {
        toast.error("Failed to update cancellation policy: " + response.data.message);
      } else {
        toast.error("Failed to update cancellation policy");
      }
    } catch (error) {
      console.error('An error occurred while updating the cancellation policy', error);
      toast.error("An error occurred while updating the cancellation policy");
    }
  };

  const validationSchema = Yup.object({
    // Define your validation schema here if needed
  });

  return (
    <div className="card mb-5 mb-xl-10">
      <div className="card-header">
        <div className="card-title m-0">
          <h4 className="fw-bold m-0 d-flex gap-3">
            <KTIcon iconName="cross-circle" iconType="duotone" className="fs-2" />
            Cancellation
          </h4>
        </div>
        <div className="card-toolbar">
          <div className="me-0">
            <button
              className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary menu-dropdown"
              onClick={handleEditClick}
            >
              <KTIcon iconName="pencil" iconType="duotone" className="fs-4 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      <div className="card-body p-9 pt-5 pb-5 fw-bold text-gray-600">
        {isEditMode ? (
          <Formik
            initialValues={{
              free_cancellation: cancellationData ? (cancellationData.free_cancellation ?? true) : false,
              cancel_before_value: cancellationData?.cancel_before_value ?? null,
              cancel_before_type: cancellationData?.cancel_before_type ?? null,
              cancel_fees_type: cancellationData?.cancel_fees_type ?? null,
              cancel_fees_value: cancellationData?.cancel_fees_value ?? null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSave}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="mb-3">
                  <label>Free Cancellation</label>
                  <span>
                    <label>
                      <div className="form-check form-switch ms-3">
                        <Field
                          className="form-check-input cursor-pointer"
                          type="checkbox"
                          name="free_cancellation"
                        />
                        Yes
                      </div>
                    </label>
                  </span>
                </div>
                <>
                  <div className="mb-4">
                    <label>Cancellation Value</label>
                    <Field
                      type="number"
                      name="cancel_before_value"
                      className="form-control form-control-sm  border-1 shadow-none mt-3"
                      placeholder="Cancellation Value"
                      disabled={!values.free_cancellation}
                    />
                    <ErrorMessage name="cancel_before_value" component="div" className="text-danger" />
                  </div>

                  <div className="mb-4">
                    <label>Cancellation In</label>
                    <Select
                      className=' mt-3'
                      classNamePrefix='react-select'
                      styles={SelectCustomStyles}
                      options={options}
                      name="cancel_before_type"
                      placeholder='Select an option'
                      isDisabled={!values.free_cancellation} 
                      value={options.find(option => option.value === values.cancel_before_type)}
                      onChange={option => setFieldValue('cancel_before_type', option?.value || '')}
                    />
                    <ErrorMessage name="cancel_before_type" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label>Paid Cancellation After Free Hours</label>
                    <div className="mt-3">
                      <label className="form-check form-check-sm form-check-solid me-5">
                        <Field
                          className="form-check-input me-2"
                          type="radio"
                          name="cancel_fees_type"
                          value="Full advanced payment"
                          disabled={!values.free_cancellation}
                        />{" "}
                        Full advanced payment
                      </label>

                      <label className="form-check form-check-sm form-check-solid mt-4">
                        <Field
                          className="form-check-input me-2"
                          type="radio"
                          name="cancel_fees_type"
                          value="Percent"
                          disabled={!values.free_cancellation}
                        />{" "}
                        Percent
                      </label>
                      <div className="input-group  ">
                        <Field
                          type="number"
                          name="cancel_fees_value"
                          className="form-control   form-control-sm  border-1 shadow-none mt-4 "
                          aria-label="Amount (to the nearest dollar)"
                          disabled={!values.free_cancellation || values.cancel_fees_type === "Full advanced payment"}
                        />
                        {/* <span className="d-flex align-items-center bg-white  py-6 p-4 mt-4 rounded-1 fs-4"
                          style={{
                            backgroundColor: "#F5F8FA",
                            height: "35px",
                            border:"1px solid #ced4da",
                            borderLeft:'0px',
                          }}
                        >%</span> */}
                        <ErrorMessage
                          name="cancel_fees_value"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="button"
                      className="btn btn-sm me-5 btn-danger"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm"
                      style={{ backgroundColor: "#0036e3", color: "white" }}
                    >
                      Save
                    </button>
                  </div>
                </>
              </Form>
            )}
          </Formik>
        ) : (
          cancellationData ? (
            <span className="fw-semibold text-gray-600 fs-6 d-block">
              <span className="m-0">
                Free cancellation before {cancellationData.cancel_before_value} {cancellationData.cancel_before_type} (s) of booking.
              </span>
              {cancellationData.cancel_fees_type === "Full advanced payment" ? (
                <p>Full advance payment is required.</p>
              ) : (
                <p>{cancellationData.cancel_fees_value}% cancellation charges.</p>
              )}
            </span>
          ) : (
            <span className="fw-semibold text-gray-600 fs-6 d-block">
              No Policy Set
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default Cancellation;
