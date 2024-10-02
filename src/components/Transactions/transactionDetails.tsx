
"use client"
import React, { useState } from 'react';
import { ITransactionData } from '@/api/payment/types';
import Pagination from '../Pagination/Pagination';
import TablePagination from '../Pagination/TablePagination';
import DatePicker from '../DatePicker/DatePicker';



interface TransactionDetailsProps {
    allTransaction: ITransactionData;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ allTransaction }) => {

    const [pagination, setPagination] = useState({
        pageSize: 10,
        pageIndex: 0,
      });

      const handlePageChange = (page: number) => {
        setPagination((prev) => ({ ...prev, pageIndex: page - 1 }));
      };
    
      const handlePageSizeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        const pageSize = parseInt(event.target.value, 10);
        setPagination({ pageSize, pageIndex: 0 });

      };

    return (
        <>
            <div className="card mb-5 mb-xl-8">
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-end flex-column"></h3>
                    <div className="card-toolbar">
                        <div className="d-flex justify-content-end gap-5 mb-0">
                            {/* Add any additional components or controls here */}
                            <DatePicker/>
                        </div>
                    </div>
                </div>
                <div className="card-body py-3">
                    <div className="table-responsive">
                        <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4" style={{ width: '100%', textAlign: 'center' }}>
                            <thead>
                                <tr className="fw-bold text-muted">
                                    <th className="text-start w">Date</th>
                                    <th className="text-center">Description</th>
                                    <th className="text-end">Amount ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                           
                                {allTransaction?.data?.data?.map((transaction, index) => ( 
                                    <tr key={index}>
                                        <td className="text-start text-gray-500 fw-semibold text-muted">{transaction.formatted_month ? transaction.formatted_month :'-'}</td>
                                        <td className="text-center text-gray-500 fw-semibold text-muted">{transaction.description ? transaction.description : '-'}</td>
                                        <td className="text-end text-gray-500 fw-semibold text-muted">{transaction.amount ? transaction.amount :'-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                                 {allTransaction.data.total === 0 ? (
                                     <p className="text-center w-100 fw-bold fs-5 pb-3 text-muted">No data available in Table</p>
                            ) : null}
                    </div>
                </div>
            </div>
          
              <TablePagination  
                className=""
                totalItems={allTransaction.data.total}
              />
        </>
    );
};

export default TransactionDetails;