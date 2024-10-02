import React, { useEffect, useRef } from "react";
import { useFormikContext, FieldProps } from "formik";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import SingleDatePicker from "@/components/SingleDatePicker/SingleDatePicker";
import { format } from "date-fns";

interface CustomDateInputProps extends FieldProps {
  // Additional props if needed
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
  field,
  form,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const datepickerRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (datepickerRef.current) {
      flatpickr(datepickerRef.current, {
        dateFormat: "M d, Y", // Display format for the datepicker
        onChange: function (selectedDates) {
          const selectedDate = selectedDates[0];
          if (selectedDate) {
            const formattedDate = formatDate(selectedDate);
            setFieldValue(field.name, formattedDate); // Set the value in Formik as YYYY-MM-DD format
          }
        },
      });
    }
  }, [field.name, setFieldValue]);

  return (
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
  );
};

export default CustomDateInput;
