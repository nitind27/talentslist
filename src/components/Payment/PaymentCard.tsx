"use client";
import React, { useState } from "react";
import PaymentMethodCard from "./paymentmethodCard";
import GetPaid from "./getPaidCard";
import { IEaringData, IPaymentMethod } from "@/api/payment/types";

const PaymentCard = ({
  paymentmethodData,
  getEarning,
}: {
  paymentmethodData: IPaymentMethod | null;
  getEarning:IEaringData;

}) => {
  const [currentPaymentMethod, setCurrentPaymentMethod] =
    useState<IPaymentMethod | null>(paymentmethodData);
  console.log("data show paymentmethodData ", paymentmethodData);
  const handleDelete = () => {
    setCurrentPaymentMethod(null);
  };

  return (
    <div>
      {currentPaymentMethod && currentPaymentMethod.status ? (
        <PaymentMethodCard
          PaymentMethodData={currentPaymentMethod}
          getEarning={getEarning}
          handeldelete={handleDelete} // Corrected spelling of handleDelete
        />
      ) : (
        <GetPaid />
      )}
    </div>
  );
};

export default PaymentCard;
