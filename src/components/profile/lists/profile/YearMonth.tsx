import React, { useEffect, useRef, useState } from "react";
import { useFormikContext, FieldProps, FormikProps } from "formik";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import SingleDatePicker from "@/components/SingleDatePicker/SingleDatePicker";
import Flatpickr from "react-flatpickr";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/plugins/monthSelect/style.css";

interface CustomDateInputProps extends FieldProps {
  // You can extend with any additional props if needed
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
  field,
  form,
  ...props
}) => {
  const { setFieldValue } = useFormikContext<FormikProps<any>>();
  const datepickerRef = useRef<HTMLInputElement>(null);

  //   useEffect(() => {
  //     if (datepickerRef.current) {
  //       flatpickr(datepickerRef.current, {
  //         dateFormat: "M d, Y", // Display format for the datepicker
  //         onChange: function (selectedDates) {
  //           const formattedDate = selectedDates[0].toLocaleDateString("en-IN", {
  //             year: "numeric",
  //             month: "short",
  //             day: "numeric",
  //           }); // Format the date as "Jun 29, 2024" for India
  //           setFieldValue(field.name, formattedDate); // Set the value in Formik as displayed format
  //         },
  //       });
  //     }
  //   }, []);

  useEffect(() => {
    if (datepickerRef.current) {
      flatpickr(datepickerRef.current, {
        dateFormat: "M d, Y", // Display format for the datepicker
        onChange: function (selectedDates) {
          const selectedDate = selectedDates[0];
          const formattedDate = selectedDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD
          setFieldValue(field.name, formattedDate); // Set the value in Formik as YYYY-MM-DD format
        },
      });
    }
  }, []);

  return (
    <>
      <SingleDatePicker
        input={
          <input
            ref={datepickerRef}
            {...field}
            {...props}
            className="form-control form-control-sm"
            placeholder="Pick a date"
            id="date_range_picker"
          />
        }
      />
      <Flatpickr
        options={{
          plugins: [
            monthSelectPlugin({
              shorthand: true,
              dateFormat: "m/Y",
              // altInput: true,
              altFormat: "m/Y",
              theme: "light",
            }),
          ],
          static: true,
        }}
      />
    </>
  );
};

export default CustomDateInput;
