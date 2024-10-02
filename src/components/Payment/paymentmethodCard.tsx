"use client";
import React, { useEffect, useState } from "react";
import { KTIcon } from "@/_metronic/helpers";
import { DeleteBankAccount, getTransferRate, postAddWithdrawRequest } from "@/api/payment/payment";
import { Detailsinfo, IEaringData, IPaymentMethod, TransferRate } from "@/api/payment/types";
import { UncontrolledTooltip } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { currencyFieldMapping } from "./currencyFieldMapping";
import { toast } from "react-toastify";

const PaymentMethodCard = ({
  PaymentMethodData,
  handeldelete: handeldeleteFromParent,
  getEarning,
}: {
  PaymentMethodData: IPaymentMethod;
  handeldelete: () => void;
  getEarning: IEaringData;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWithdrawalModalVisible, setIsWithdrawalModalVisible] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number | undefined>();
  const [transferRate, setTransferRate] = useState<TransferRate | null>(null);
  const [isRequesting, setIsRequesting] = useState(false); // State for handling request status
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (withdrawalAmount !== undefined) {
      const fetchTransferRate = async () => {
        try {
          const response = await getTransferRate({ amount: withdrawalAmount });
          const transferData = response.data;
          setTransferRate(transferData);
        } catch (error) {
          console.error("Error fetching transfer rate:", error);
        }
      };

      fetchTransferRate();
    }
  }, [withdrawalAmount]);

  if (!PaymentMethodData || !PaymentMethodData.data) {
    return null;
  }

  const { account_holder_name, currency, form_data } = PaymentMethodData.data;
  const details: Detailsinfo = form_data.details;
  const fieldsToShow = currencyFieldMapping[currency] || [];

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await DeleteBankAccount();
      console.log("Delete response:", response);
      if (response.error) {
        toast.error("Failed to delete payment method. Please try again.");
      } else {
        toast.success(response.data.message);
      }
      handeldeleteFromParent();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error deleting payment method:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleWithdrawalModal = () => {
    setIsWithdrawalModalVisible(!isWithdrawalModalVisible);
    setErrorMessage(null); // Reset error message when toggling the modal
  };

  const handleWithdrawalAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(event.target.value);
    if (amount >= 100 && amount <= parseFloat(getEarning.earnings)) {
      setWithdrawalAmount(amount);
      setErrorMessage(null); // Clear error message if valid
    } else {
      setWithdrawalAmount(undefined);
      setErrorMessage(`Amount must be between 100 and ${getEarning.earnings}`);
    }
  };

  const handleRequestWithdrawal = async () => {
    setIsRequesting(true); // Start requesting
    if (withdrawalAmount !== undefined) {
      try {
        const response = await postAddWithdrawRequest({ amount: withdrawalAmount });
        console.log("Request Withdrawal Response:", response);
        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success(response.data.message);
        }
        setIsWithdrawalModalVisible(false);
      } catch (error) {
        console.error("Error requesting withdrawal:", error);
      } finally {
        setIsRequesting(false); // Requesting complete
      }
    } else {
      setErrorMessage("The amount field is required and must be between 100 and your total earnings.");
      setIsRequesting(false); // Requesting complete with error
    }
  };

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
            <div className="me-0">
              <button
                className="btn btn-sm btn-icon btn-bg-light me-1"
                onClick={toggleModal}
                disabled={isDeleting}
                id="tooltipDelete"
              >
                <KTIcon
                  iconName="trash"
                  iconType="duotone"
                  className={`fs-2 text-gray-500 ${isDeleting ? "spinner spinner-sm spinner-primary" : ""}`}
                />
                <UncontrolledTooltip delay={0} placement="top" target="tooltipDelete">
                  Delete Payment method
                </UncontrolledTooltip>
              </button>
              {parseFloat(getEarning.earnings) >= 100 && (
                <button
                  className="btn btn-sm btn-icon btn-bg-light"
                  onClick={toggleWithdrawalModal}
                  id="tooltipWallet"
                >
                  <KTIcon
                    iconName="wallet"
                    iconType="duotone"
                    className="fs-2 text-gray-500"
                  />
                  <UncontrolledTooltip delay={0} placement="top" target="tooltipWallet">
                    Request a withdrawal
                  </UncontrolledTooltip>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="card-body p-9">
          <div className="row mb-3">
            <label className="col-lg-4 fw-semibold text-muted fs">
              Account Holder Name
            </label>
            <div className="col-lg-8">
              <span className="fw-bold fs-6 text-gray-800 fs-7">
                {account_holder_name}
              </span>
            </div>
          </div>
          {/* <div className="row mb-3">
            <label className="col-lg-4 fw-semibold text-muted fs-7">
              Currency
            </label>
            <div className="col-lg-8">
              <span className="fw-bold text-gray-800">
                <span className="fw-bold fs-6 text-gray-800 fs-7">
                  {currency}
                </span>
              </span>
            </div>
          </div> */}
          {fieldsToShow.map((field) => (
            <div className="row mb-3" key={field.key}>
              <label className="col-lg-4 fw-semibold text-muted fs-7 text-capitalize">
                {field.label}
              </label>
              <div className="col-lg-8">
              <span className="fw-bold fs-6 text-gray-800 fs-7">
                  {field.key === "accountNumber"
                    ? `****${details[field.key as keyof Detailsinfo]?.slice(-4)}`
                    : field.key === "IBAN"
                    ? `****${details[field.key as keyof Detailsinfo]?.slice(-4)}`
                    : details[field.key as keyof Detailsinfo] || "-"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Modal */}
      <Modal show={isModalVisible} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this payment method?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-sm"
            onClick={toggleModal}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn btn-sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Withdrawal Modal */}
      <Modal show={isWithdrawalModalVisible} onHide={toggleWithdrawalModal}>
        <Modal.Header closeButton>
          <Modal.Title>Request a Withdrawal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="fw-bold fs-5">Remaining Amount</label>
                    <br />
                    <span>{getEarning.earnings}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="fw-bold fs-5">Withdrawal Amount ($)</label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      className="form-control"
                      min="100"
                      max={parseFloat(getEarning.earnings)}
                      required
                      onChange={handleWithdrawalAmountChange}
                    />
                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6 col-sm-6 fw-bold fs-5">Fee</div>
                <div className="col-md-6 col-sm-6">
                  <span className="shape d-flex align-items-center ">–</span>
                  <span className="fw-bolder ms-3">$ {transferRate ? transferRate?.data?.fees_amount : "0"}</span>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6 col-sm-6">
                  <div className="fw-bold fs-5">Total amount</div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <span className="shape">=</span>
                  <span className="fw-bolder ms-3">$ {transferRate ? transferRate?.data?.convert : "0"}</span>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6 col-sm-6">
                  <div className="fw-bold fs-5">Guaranteed rate</div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <span className="shape">x</span>
                  <span className="fw-bolder ms-3">{transferRate ? transferRate?.data?.rate : "0"}</span>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6 col-sm-6">
                  <div className="fw-bold fs-5">You will get</div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="fw-bolder ms-3t">{transferRate ? transferRate?.data?.targetAmount : "0"}</div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-sm"
            onClick={toggleWithdrawalModal}
          >
            Close
          </Button>
          <Button
            variant="primary"
            className="btn btn-sm"
            onClick={handleRequestWithdrawal}
            disabled={isRequesting} // Disable button when requesting
          >
            {isRequesting ? "Requesting..." : "Request"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentMethodCard;
