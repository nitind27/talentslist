import React, { FC, useEffect, useRef, useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import SingleDatePicker from "../../SingleDatePicker/SingleDatePicker";
import PriceSummary from "../../PriceSummary/PriceSummary";
import { IServiceIdData } from "@/api/services/types";
import { useServiceData } from "../../store/data";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { format } from "date-fns";

const Step2: FC<{ initialValues: IServiceIdData; setFieldValue: any }> = ({
  initialValues,
  setFieldValue,
}) => {
  const { items, setItems } = useServiceData();
  const { values } = useFormikContext<IServiceIdData>();
  const [skuPrice, setSkuPrice] = useState<string>("");

  const handleKeyUp =
    (fieldName: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      setItems({ ...items, [fieldName]: e.currentTarget.value });
    };

  const formatDate = (date: Date | null) => {
    if (!date) return null;

    // Convert date to IST (UTC+5:30)
    const istDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    // Format the IST date
    const formattedDate = format(istDate, "yyyy-MM-dd");

    return formattedDate;
  };

  const datepickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datepickerRef.current) {
      flatpickr(datepickerRef.current, {
        dateFormat: "M d, Y", // Display format for the datepicker
        defaultDate: initialValues.discount_from || undefined,
        onChange: function (selectedDates) {
          const selectedDate = selectedDates[0];
          if (selectedDate) {
            const formattedDate = formatDate(selectedDate);
            setItems({ ...items, discount_from: formattedDate });
            setFieldValue("discount_from", formattedDate); // Set the value in Formik as YYYY-MM-DD format
          }
        },
      });
    }
  }, [initialValues.discount_from, setFieldValue, items, setItems]);

  const datepickerRefs = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datepickerRefs.current) {
      flatpickr(datepickerRefs.current, {
        dateFormat: "M d, Y", // Display format for the datepicker
        defaultDate: initialValues.discount_to || undefined,
        onChange: function (selectedDates) {
          const selectedDate = selectedDates[0];
          if (selectedDate) {
            const formattedDate = formatDate(selectedDate);
            setItems({ ...items, discount_to: formattedDate });
            setFieldValue("discount_to", formattedDate); // Set the value in Formik as YYYY-MM-DD format
          }
        },
      });
    }
  }, [initialValues.discount_to, setFieldValue, items, setItems]);

  useEffect(() => {
    setSkuPrice(String(initialValues.price)); // Ensure the value is a string
    setFieldValue(
      "advanced_payment_type",
      initialValues.advanced_payment_type || "$"
    ); // Ensure this line is present and provide a default value
    setFieldValue("advanced_payment", initialValues.advanced_payment || 0); // Ensure advanced_payment is set
    setFieldValue("promote", initialValues.promote);
  }, [initialValues, setFieldValue, setSkuPrice]);

  // Ensure default values in case values are undefined
  const defaultValues: IServiceIdData = {
    price: values?.price || 0,
    advanced_payment: values?.advanced_payment || 0,
    advanced_payment_type: values?.advanced_payment_type || "$",
    discount: values?.discount || 0,
    discount_to: values?.discount_to || "",
    promote: values?.promote || false,
    title: "",
    duration: "",
    discount_from: null,
    type: "",
    offering: {},
    require: {},
    parent_skills_id: "",
    child_skills_ids: [],
  };

  return (
    <div className="w-100">
      <div>
        <div>
          <div className="mb-5">
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Price:</label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    $
                  </span>
                  <Field
                    type="number"
                    className="form-control"
                    name="price"
                    placeholder="Price"
                    aria-label="Price"
                    aria-describedby="basic-addon1"
                    onKeyUp={handleKeyUp("price")}
                  />
                  <Field type="hidden" name="sku-price" value={skuPrice} />
                </div>
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Advanced payment:</label>
                <div className="input-group mb-5">
                  <Field
                    type="number"
                    className="form-control w-200px"
                    name="advanced_payment"
                    placeholder="Advanced payment price"
                    aria-label="Advanced payment price"
                    onKeyUp={handleKeyUp("advanced_payment")}
                  />
                  <select
                    className="w-0 form-select border-1"
                    name="advanced_payment_type"
                    aria-label="Domain selection"
                    value={values?.advanced_payment_type || "$"} // Provide default value here
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setItems({
                        ...items,
                        advanced_payment_type: e.target.value,
                      });
                      setFieldValue("advanced_payment_type", e.target.value);
                    }}
                  >
                    <option value="%">%</option>
                    <option value="$">$</option>
                  </select>
                  <ErrorMessage
                    name="advanced_payment"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="row flex-nowrap">
              <label className="form-label w-auto">
                Do you want to promote?
              </label>
              <div className="form-check form-switch">
                <Field
                  className="form-check-input cursor-pointer"
                  type="checkbox"
                  name="promote"
                  id="flexSwitchCheckChecked"
                  checked={values?.promote || false} // Provide default checked value
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("promote", e.target.checked ? 1 : 0);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Start date:</label>
                <SingleDatePicker
                  input={
                    <input
                      ref={datepickerRef}
                      name="discount_from"
                      className="form-control form-control-sm"
                      placeholder="Pick a date"
                      id="date_range_picker"
                      disabled={!values?.promote || false} // Provide default disabled state
                    />
                  }
                />
                <ErrorMessage
                  name="discount_from"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">End date:</label>
                <SingleDatePicker
                  input={
                    <input
                      ref={datepickerRefs}
                      className="form-control form-control-sm"
                      placeholder="Pick a date"
                      name="discount_to"
                      disabled={!values?.promote || false} // Provide default disabled state
                      id="date_range_picker"
                    />
                  }
                />
                <ErrorMessage
                  name="discount_to"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
          </div>

          <div className="discount_price">
            <div className="mb-5">
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">Discount:</label>
                  <div className="input-group mb-5">
                    <Field
                      type="number"
                      className="form-control"
                      name="discount"
                      placeholder="Discount"
                      aria-label="Discount"
                      disabled={!values?.promote || false} // Provide default disabled state
                      onKeyUp={handleKeyUp("discount")}
                    />
                    <span className="input-group-text" id="basic-addon1">
                      %
                    </span>
                  </div>
                  <ErrorMessage
                    name="discount"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-md-6">
                  <div className="card mb-4">
                    <div
                      className="p-5"
                      style={{
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                        border: "1px solid #BFBFBF",
                      }}
                    >
                      <div className="mb-0 fs-3">Price summary</div>
                    </div>
                    <PriceSummary
                      initialValues={initialValues}
                      values={defaultValues}
                    />{" "}
                    {/* Pass defaultValues here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Step2 };
