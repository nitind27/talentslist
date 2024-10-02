"use client"
import { KTIcon } from "@/_metronic/helpers";
import Link from "next/link";
import React from "react";
import { UncontrolledTooltip } from "reactstrap";

const GetPaid = () => {
  return (
    <div className="mb-5 mb-xl-10">
      <div className="card">
        <div className="card-header">
          <div className="card-title m-0">
            <h4 className="fw-bold m-0 d-flex gap-3">
              <KTIcon
                iconName="credit-cart"
                iconType="duotone"
                className="fs-2 text-gray-500"
              />
              How you get paid
            </h4>
          </div>
          <div className="card-toolbar">
            <Link
              href="/add_bank_account"
              className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
               id="AddPaymentMethod"
            >
              <KTIcon
                iconName="plus"
                iconType="duotone"
                className="fs-2 text-gray-500"
              />
              <UncontrolledTooltip
                delay={0}
                placement="top"
                target="AddPaymentMethod"
              >
                Add Payment Method
              </UncontrolledTooltip>
            </Link>
          </div>
        </div>
        <div className="card-body p-9">
          <span className="text-gray-500 fw-semibold fs-6 d-flex align-items-center gap-2 justify-content-center">
            <KTIcon
              iconName="information"
              iconType="duotone"
              className="fs-2 text-gray-500"
            />
            Please add a payment method to withdraw an amount.
          </span>
        </div>
      </div>
    </div>
  );
};

export default GetPaid;
