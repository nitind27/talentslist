'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AddressDetail from '../../AcountTyeps/AddressDetail';
import { ICurrency } from '@/api/payment/types';
import { postBankAccountSubmit } from '@/api/payment/payment';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import JPYLocalbank from './JPYLocalbank';

function JPY({ currencyData }: { currencyData: ICurrency }) {
  const initialValues = {
    account_holder_name: '',
    address: '',
    postCode: '',
    legalType: '',
    location: '',
    bankName: '',
    accountType: '',
    branchName: '', // Store selected branch name here
    accountNumber: '',
    branchOptions: [] as { value: string; label: string }[],
  };

  const validationSchema = Yup.object({
    account_holder_name: Yup.string().required('Account Holder Name is required *'),
    address: Yup.string().required('Address is required'),
    postCode: Yup.string().required('Post Code is required'),
    legalType: Yup.string().required('Legal Type is required'),
    location: Yup.string().required('Location is required'),
    bankName: Yup.string().required('Bank Name is required'),
    accountType: Yup.string().required('Account Type is required'),
    branchName: Yup.string().required('Branch Name is required'),
    accountNumber: Yup.string().matches(/^\d{2,7}$/, 'Invalid Account Number').required('Account Number is required'),
  });

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const bankNameText = currencyData.data.form[0].fields[1].group[0].valuesAllowed?.find(option => option.key === values.bankName)?.name || '';
          const branchNameText = values.branchOptions.find((option: any) => option.value === values.branchName)?.label || '';

          const transformedValues = {
            currency: currencyData.data.currency,
            account_holder_name: values.account_holder_name,
            legal_type: values.legalType.toLowerCase(),
            address: values.address,
            location: values.location,
            postcode: values.postCode,
            form_fields: {
              japanese: [
                {
                  type: currencyData.data.form[0].fields[1].group[0].type,
                  key: currencyData.data.form[0].fields[1].group[0].key,
                  value: values.bankName,
                  is_required: 1,
                  text: bankNameText,
                },
                {
                  type: currencyData.data.form[0].fields[2].group[0].type,
                  key: currencyData.data.form[0].fields[2].group[0].key,
                  value: values.branchName,
                  is_required: 1,
                  text: branchNameText,
                },
                {
                  type: currencyData.data.form[0].fields[3].group[0].type,
                  key: currencyData.data.form[0].fields[3].group[0].key,
                  value: values.accountType,
                  is_required: 1,
                  text: currencyData.data.form[0].fields[3].group[0].valuesAllowed?.find(option => option.key === values.accountType)?.name || '',
                },
                {
                  type: currencyData.data.form[0].fields[4].group[0].type,
                  key: currencyData.data.form[0].fields[4].group[0].key,
                  value: values.accountNumber,
                  is_required: 1,
                },
              ],
            },
          };

          const response = await postBankAccountSubmit(transformedValues as any);

          resetForm();
          if (response.error) {
            toast.error("Failed to submit the form. Please try again.");
          } else {
            toast.success(response.data.message);
            router.push("/payments");
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          toast.error('Error submitting form');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {formik => (
        <Form>
          <div className="row">
            <div className="col-6 pe-10">
              <AddressDetail formik={formik} />
            </div>
            <div className="col-6">
              {currencyData.data.form.map((formdata, index) => (
                <JPYLocalbank
                  key={index}
                  currencyData={formdata}
                  formik={formik}
                  initialValues={formik.initialValues}
                  setBranchOptions={(options: any) => formik.setFieldValue('branchOptions', options)} // Passing setBranchOptions to child component
                />
              ))[0]}
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default JPY;
