"use client"
import { KTIcon } from '@/_metronic/helpers'
import { getEarnings } from '@/api/payment/payment';
import { IEaringData, IPaymentMethod } from '@/api/payment/types';
import React, { useEffect, useState } from 'react';

const Earnings = ( {
    getEarning,
  }: {
    getEarning: IEaringData | null;
  }) => {
    // const [earningsData, setEarningsData] = useState<IEaringData | null>(null);

    // useEffect(() => {
    //     const fetchEarnings = async () => {
    //         const response = await getEarnings();
    //         setEarningsData(response.data);
    //     };
    //     fetchEarnings();
    // }, []);

    // if (!earningsData) {
    //     return <div>Loading...</div>;
    // }

    // const earnings = parseFloat(earningsData.earnings);
    // const paymentThreshold = parseFloat(earningsData.payment_threshold);
    // let percentage = (getEarning?.earnings / getEarning?.payment_threshold) * 100;
    // percentage = Math.min(percentage, 100);

    return (
        <div className="">
            <div className='card mb-5 mb-xxl-8 '>
                <div className='card-header '>
                    <div className="card-title m-0">
                        <h4 className="fw-bold m-0 d-flex gap-3">
                            <KTIcon iconName="dollar" iconType="duotone" className="fs-2"/>
                            Earnings
                        </h4>
                    </div>
                    <div className="card-toolbar">
                        <span className="fw-semibold fs-2">$ {getEarning?.earnings}</span>
                    </div>
                </div>
                <div className='card-body pt-5'>
                    <span className='text-gray-500 fw-semibold fs-6'>
                        Paid monthly if the total is at least ${getEarning?.payment_threshold} (Your payout threshold)
                    </span>
                    <div className="d-flex align-items-center flex-column mt-5 mw-75 ">
                        <div className="h-10px mx-3 w-100 bg-light-primary rounded">
                            <div
                                className="bg-blue rounded h-10px"
                                role="progressbar"
                                style={{ width: `${getEarning?.earnings_percentage}%`}}
                                aria-valuenow={Number(getEarning?.earnings_percentage)}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            ></div>
                        </div>
                        <div className="d-flex justify-content-between w-100 mt-1 mb-2">
                            <span className="text-gray-500 fw-semibold fs-7">
                                You have reached {getEarning?.earnings_percentage}% of your payment threshold
                            </span>
                            <span className="text-gray-500 fw-semibold fs-7">
                                Payment threshold: ${getEarning?.payment_threshold}   
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Earnings;