"use client";
import { KTIcon } from '@/_metronic/helpers';
import { ITransactionData, Datum } from '@/api/payment/types';
import Link from 'next/link';
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';

const TransactionCard = ({ TransactionData }: { TransactionData: ITransactionData }) => {
  return (
    <div className="bg-white rounded-3">
      <div className="card mb-5 mb-xl-10">
        <div className="card-header">
          <div className="card-title align-items-center gap-3">
            <h4 className="fw-bold m-0 d-flex gap-3">
              <KTIcon iconName="bank" iconType="duotone" className="fs-1 text-gray-500" />
              Transactions
            </h4>
          </div>
          <div className="card-toolbar">
            <Link href="/transactions" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary text-blue" id="tooltipTranscation">
              <KTIcon iconName="eye" iconType="duotone" className="fs-2 text-gray-500" />
              <UncontrolledTooltip
                delay={0}
                placement="top"
                target="tooltipTranscation"
              >
                View all transactions
              </UncontrolledTooltip>
            </Link>
          </div>
        </div>
        <div className="card-body p-9">
          {TransactionData?.data && TransactionData.data.length > 0 ? (
            <div className='table-responsive'>
              <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-3 my-0">
                <thead>
                  <tr className="text-gray-500 fs-7 fw-bold">
                    <th className="p-0 pb-3">Date</th>
                    <th className="p-0 pb-3 text-end">Amount ($)</th>
                  </tr>
                </thead>
                <tbody className='fw-bold text-gray-600'>
                  {TransactionData.data.map((transaction: Datum, index: number) => (
                    <tr key={index}>
                      <td>{transaction.formatted_month}</td>
                      <td className="text-end">{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 fw-bold">
              No transactions available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
