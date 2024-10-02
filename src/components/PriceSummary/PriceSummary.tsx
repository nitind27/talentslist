import React from "react";
import { IServiceIdData } from "@/api/services/types";

interface PriceSummaryProps {
  initialValues: IServiceIdData;
  values: IServiceIdData; // Use IServiceIdData type for values to ensure type safety
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ values }) => {
  // Ensure default values or fallbacks in case values are undefined
  const serviceCost = values.price;
  const discountPercentage = values.discount;
  const discount = (serviceCost * discountPercentage) / 100;
  const totalPrice = serviceCost - discount;
  const advancedPaymentLabel =
    values?.advanced_payment_type === "$" ? "$" : "%";
  const advancepayment = values.advanced_payment;

  // Handle cases where initialValues or values might be undefined
  if (!values) {
    return null; // or render a loading state or placeholder if needed
  }

  // Input date in YYYY-MM-DD format
  const inputDate = `${values.discount_to}`;

  // Convert the input date to the desired format
  const formattedDate = new Date(inputDate).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div>
      <div
        className="card-body p-5"
        style={{
          minHeight: "fit-content",
          border: "1px solid #BFBFBF",
          borderTop: "none",
          borderBottomRightRadius: "5px",
          borderBottomLeftRadius: "5px",
        }}
      >
        <div className="d-flex text-gray-500 fw-bold justify-content-between fs-5">
          <div className="flex">
            <div>Service Cost</div>
          </div>
          <div>
            <h5 className="mb-2 booking-price">$ {values.price || 0}</h5>
          </div>
        </div>
        <div className="d-flex fw-bold justify-content-between fs-5">
          <div className="flex text-gray-500">
            <div>Advanced Payment</div>
          </div>
          <div>
            <h5 className="mb-2 advancedPayment">
              {advancedPaymentLabel} {values.advanced_payment || 0}
            </h5>
          </div>
        </div>
        <div className="d-flex fw-bold text-gray-500 justify-content-between fs-5">
          <div className="flex">
            <div>Discount</div>
          </div>
          <div>
            <h5 className="mb-2 discount-promote">{values.discount || 0} %</h5>
          </div>
        </div>
        <div className="d-flex fw-bold text-gray-500 justify-content-between fs-5 border-bottom mb-2">
          <div className="flex">
            <div>Discount End Date</div>
          </div>
          <div>
            <h5 className="mb-2 discount-to-label">{formattedDate}</h5>
          </div>
        </div>
        <div className="d-flex fw-bold text-gray-500 justify-content-between fs-5">
          <div className="flex">
            <div>Total Price</div>
          </div>
          <div>
            <h5 className="package-price">$ {totalPrice.toFixed(2)}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
