import React from "react";
import Link from "next/link";
import Earnings from "@/components/Payment/earningsCard";
import TransactionCard from "@/components/Payment/transactionsCard";
import { getEarnings, getPaymentMethod, getTransaction, getTransferRate } from "@/api/payment/payment";
import PaymentCard from "../../../components/Payment/PaymentCard"

const page = async () => {

  const response = await getTransaction();
  const transactiongData = response.data;
  console.log( "transation list ",response.data)

  const paymentresponse = await getPaymentMethod();
  const paymentmethodData = paymentresponse.data;

  const getEarningsresponse =await getEarnings();
  const getEarning = getEarningsresponse.data;

  return (
    <>
      <div className=" app-toolbar py-3 py-lg-6">
        <div className="page-title  flex-column justify-content-center flex-wrap">
          <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
            Payments
          </h1>
          <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
            <li className="breadcrumb-item text-muted">
              <Link href="dashboard" className="text-muted text-hover-primary">
                Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item text-muted">-</li>
            <li className="breadcrumb-item text-muted">Payments</li>
          </ul>
        </div>
      </div>
      <Earnings getEarning={getEarning}/>
      <div className="row">
        <div className="col-md-6">
          <TransactionCard TransactionData={transactiongData}/>
        </div>
        <div className="col-md-6">
        {/* {paymentmethodData.data ? (
          <PaymentMethodCard PaymentMethodData={paymentmethodData}  />
        ) : (
          <GetPaid />
        )} */}
        <PaymentCard getEarning={getEarning} paymentmethodData={paymentmethodData}/>
        </div>
      </div>
    </>
  );
};

export default page;
