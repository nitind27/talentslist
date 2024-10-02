import { string } from "yup";
import { aCFetch, cCFetch, cFetch } from "../basiApi";
import {
  IEaringData,
  IPayment,
  IPaymentMethod,
  ICurrency,
  BankBranchName,
  CHftypes,
  DeleteBankAccounttype,
  TransferRate,
  AddWithdraw,
  ITransactionData,
} from "./types";

export const getAllTransaction = async ({ page, per_page,date }: { page: number, per_page: number,date:string }) => {
  const response = await cFetch<ITransactionData>({
    url: `/talent/payment/get_transaction` + `?page=${page}&per_page=${per_page}&date=${date}`,
    method: "GET",
  });
  return response;
};

export const getEarnings = async () => {
  const response = await cFetch<IPayment>({
    url: `/talent/payment/get_earnings`,
  });
  return response.data;
};

export const getTransaction = async () => {
  const response = await cFetch<ITransactionData>({
    url: `/talent/payment/get_transaction`+`?limit=${4}&combined=${1}`,
  });
  return response;
};
export const getPaymentMethod = async () => {
  const response = await cFetch<IPaymentMethod>({
    url: `/talent/payment/get_payment_method`,
  });
  return response;
};
export const getBankAccountFormMethod = async ({
  currency,
}: {
  currency?: string;
}) => {
  const response = await cFetch<ICurrency>({
    url:
      `/talent/payment/bank_account_form` +
      (currency ? `?currency=${currency}` : ""),
    method: "GET",
  });
  return response;
};

export const getBranchNameFromBank = async ({
  bank_code,
  currency,
  type,
}: {
  bank_code: number;
  currency: string;
  type: string;
}) => {
  const response = await cCFetch<BankBranchName>({
    url: `/talent/payment/get_branch_name_from_bank_name?bank_code=${bank_code}&currency=${currency}&type=${type}`,
  });
  return response;
  0.0;
};

export const postBankAccountSubmit = async (data: CHftypes) => {
  const response = await cCFetch<BankBranchName>({
    url: `/talent/payment/bank_account_submit`,
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};

export const DeleteBankAccount = async () => {
  const response = await cCFetch<DeleteBankAccounttype>({
    url: `/talent/payment/delete_payment_method`,
    method: "DELETE",
  });
  return response;
};

export const getTransferRate = async ({ amount }: { amount?: number }) => {
  const response = await cCFetch<TransferRate>({
    url: `/talent/payment/get_transfer_rate?amount=${amount}`,
    method: "GET",
  });
  return response;
};

export const postAddWithdrawRequest = async ({
  amount,
}: {
  amount: number;
}) => {
  const response = await cCFetch<AddWithdraw>({
    url: `/talent/payment/add_withdraw_request`,
    method: "POST",
    data: JSON.stringify({ amount }), // Send the amount in the correct format
  });
  return response;
};
