import React from 'react'

const WithdrawalPending = () => {
    return (
        <div className='mt-10'>
            <div className='card mb-xxl-8 mb-5'>
                <div className='card-body pt-9 pb-9'>
                    <label className='withdrawal_label custom-text'>WITHDRAWAL</label>
                    <div className=" d-flex align-items-center g-10 border-bottom pb-4 justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                            <span className="withdrawal_amount">$100.00 </span>
                            <span className="fs-1">USD</span>
                            <span className="py-2 px-3 text-bg-warning rounded-1">Pending</span>
                        </div>
                    </div>

                    <div className='d-flex pt-4 pb-4'>
                        <div className='pe-5 d-flex flex-column'>
                            <label className='custom-text'>Sort code</label>
                            <span className='mt-1'>403020</span>
                        </div>
                        <div className='px-5 border-start border-end d-flex flex-column'>
                            <label className='custom-text'>Account holder name</label>
                            <span className='mt-1'>Max smith</span>
                        </div>
                        <div className='ps-5 d-flex flex-column'>
                            <label className='custom-text'>Account number</label>
                            <span className='mt-1'>**** 5678</span>
                        </div>
                    </div>

                    <div className='pb-4 pt-5'>
                        <label className="fs-2 w-100 fw-bold border-bottom pb-4">Withdrawal details</label>
                        <div className='pt-5'>
                            <div className="d-flex pb-3">
                                <label className="talent_fees_label">Withdrawal code:</label>
                                <span className="talent_fees_span">1712028896394</span>
                            </div>
                            <div className=" d-flex pb-3">
                                <label className="talent_fees_label">Requested on:</label>
                                <span className="talent_fees_span">Apr 02, 2024</span>
                            </div>
                        </div>
                    </div>
                    <div className='pb-4 pt-5'>
                        <label className="fs-2 w-100 fw-bold border-bottom pb-4">Withdrawal summary</label>
                        <div className='pt-5'>
                            <div className="d-flex pb-3">
                                <label className="talent_fees_label">Withdrawal amount:</label>
                                <span className="talent_fees_span">$ 100.00</span>
                            </div>
                            <div className="d-flex pb-3">
                                <label className="talent_fees_label">Fee:</label>
                                <span className="talent_fees_span">$ 4.79</span>
                            </div>
                            <div className="d-flex pb-3">
                                <label className="talent_fees_label">Sub total:</label>
                                <span className="talent_fees_span">$ 95.21</span>
                            </div>
                            <div className="d-flex pb-3">
                                <label className="talent_fees_label">Rate:</label>
                                <span className="talent_fees_span">$ 3.672500</span>
                            </div>
                            <div className="d-flex">
                                <label className="talent_fees_label">Get in GBP:</label>
                                <span className="talent_fees_span">$ 349.66</span>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default WithdrawalPending