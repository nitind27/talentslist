import React from "react";
import Link from "next/link";
import TransactionDetails from "@/components/Transactions/transactionDetails";
import { getAllTransaction } from "@/api/payment/payment";

const Transaction = async (context: {
  searchParams?: {
    page?: number;
    per_page?: number;
    date?:string
  };
}) => {
  const page = context.searchParams?.page;
  const per_page = context.searchParams?.per_page;
  const date = context.searchParams?.date;

  const getallTransaction = await getAllTransaction({
    page: Number(page || 1),
    per_page: Number(per_page || 10),
    date:String(date|| '')
  });

  const allTransaction = getallTransaction.data;

  return (
    <>
      <div className="app-toolbar py-3 py-lg-6">
        <div className="page-title d-flex flex-column justify-content-center flex-wrap">
          <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
            Transactions
          </h1>
          <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
            <li className="breadcrumb-item text-muted">
              <Link href="dashboard" className="text-muted text-hover-primary">
                Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item text-muted">-</li>
            <li className="breadcrumb-item text-muted">Transactions</li>
          </ul>
        </div>
      </div>
      <TransactionDetails allTransaction={allTransaction} />
    </>
  );
};

export default Transaction;
