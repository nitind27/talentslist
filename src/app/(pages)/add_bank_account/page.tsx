import {  getBankAccountFormMethod } from "@/api/payment/payment";
import SearchCurrency from "@/components/AddBankAcount/AcountTyeps/SearchCurrency";
import AED from "@/components/AddBankAcount/AllCurreny/AED/AED";
import CAD from "@/components/AddBankAcount/AllCurreny/CAD/CAD";
import CHF from "@/components/AddBankAcount/AllCurreny/CHF/CHF";
import EGP from "@/components/AddBankAcount/AllCurreny/EGP/EGP";
import EUR from "@/components/AddBankAcount/AllCurreny/EUR/EUR";
import GBP from "@/components/AddBankAcount/AllCurreny/GBP/GBP";
import JPY from "@/components/AddBankAcount/AllCurreny/JPY/JPY";
import NOK from "@/components/AddBankAcount/AllCurreny/NOK/NOK";
import TRY from "@/components/AddBankAcount/AllCurreny/TRY/TRY";
import USD from "@/components/AddBankAcount/AllCurreny/USD/USD";

import Link from "next/link";
import React from "react";

const Page = async (context: {
  searchParams?: {
    currency?: string;
  };
}) => {
  const currency = context.searchParams?.currency;
  const response = await getBankAccountFormMethod({
    currency: currency,
  });

  return (
    <>
      <div className="app-toolbar py-3 py-lg-6">
        <div className="d-flex flex-stack">
          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
              Add Bank Account
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li className="breadcrumb-item text-muted">
                <Link
                  href="dashboard"
                  className="text-muted text-hover-primary"
                >
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item text-muted">-</li>
              <li className="breadcrumb-item text-muted">Payments</li>
            </ul>
          </div>
        </div>
      </div>
      <SearchCurrency />
      {currency === "EUR" && <EUR currencyData={response.data || []}   />}
      {currency === "GBP" && <GBP currencyData={response.data || []}   />}
      {currency === "USD" && <USD currencyData={response.data || []}   />}
      {currency === "AED" && <AED currencyData={response.data || []}   />}
      {currency === "CAD" && <CAD currencyData={response.data || []}   />}
      {currency === "CHF" && <CHF currencyData={response.data || []}   />}
      {currency === "EGP" && <EGP currencyData={response.data || []}   />}
      {currency === "JPY" && <JPY currencyData={response.data || []}   />}
      {currency === "NOK" && <NOK currencyData={response.data || []}   />}
      {currency === "TRY" && <TRY currencyData={response.data || []}   />}
      {/* {response.data.data && response.data.data.currency.length > 0 && (
        
      )} */}
    </>
  );
};

export default Page;
