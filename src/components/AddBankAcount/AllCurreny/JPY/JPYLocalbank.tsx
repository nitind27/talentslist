import React, { useState, useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import SelectCustomStyles from '@/components/SelectCustomStyles/SelectCustomStyles';
import { getBranchNameFromBank } from '@/api/payment/payment';
import { BankForm } from '@/api/payment/types';

const JPYLocalbank = ({ currencyData, formik, initialValues, setBranchOptions }: { currencyData: BankForm; formik: any; initialValues: any; setBranchOptions: any }) => {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const fetchBranch = async (bank_code: number, currency: string, type: string) => {
    try {
      const response = await getBranchNameFromBank({ bank_code, currency, type });
      const branchData = response.data.data;
      const options = Object.keys(branchData).map((key) => ({
        value: key,
        label: branchData[key], // Use branch name as label
      }));
      setBranchOptions(options);
    } catch (error) {
      console.error('Error fetching branch name:', error);
    }
  };

  useEffect(() => {
    // Fetch branch data when initialValues.bankName changes
    if (initialValues.bankName) {
      fetchBranch(initialValues.bankName, 'JPY', currencyData.type);
    }
  }, [initialValues.bankName]);

  const getLabelFromValue = (fieldName: string, value: any) => {
    const field = currencyData.fields.find(field => field.name === fieldName);
    if (field) {
      const option = field.group[0].valuesAllowed?.find(option => option.key === value);
      return option ? option.name : '';
    }
    return '';
  };

  // Update selected branch state when formik.values.branchName changes
  useEffect(() => {
    setSelectedBranch(formik.values.branchName); // Update selectedBranch state with the branchName value
  }, [formik.values.branchName]);

  return (
    <div className="row">
      <div className="card p-0 mb-5 mb-xl-10">
        <div className="border-0">
          <div className="card-body p-5 m-0">
            <h4 className="mb-7">{currencyData.title}</h4>
            <div className="row">
              <div className="pe-2 col-6">
                {/* Render Bank Name Select */}
                {currencyData.fields.map((field) => {
                  if (field.name === 'Bank name') {
                    return (
                      <div className="mb-5" key={field.name}>
                        <label htmlFor="bankName" className="form-label fs-6 text-gray-600">
                          {field.name}
                        </label>
                        <Select
                          id="bankName"
                          name="bankName"
                          styles={SelectCustomStyles}
                          className="bg-body"
                          classNamePrefix="react-select"
                          options={field.group[0].valuesAllowed?.map((option) => ({
                            value: option.key,
                            label: option.name, // Use option name as label
                          })) || []}
                          value={formik.values.bankName ? { value: formik.values.bankName, label: getLabelFromValue('Bank name', formik.values.bankName) } : null}
                          onChange={(selectedOption: any) => {
                            formik.setFieldValue('bankName', selectedOption.value);
                            fetchBranch(selectedOption.value, 'JPY', currencyData.type);
                          }}
                          placeholder="Select Bank Name"
                          menuPlacement="auto"
                        />
                        <ErrorMessage name="bankName" component="div" className="text-danger"/>
                      </div>
                    );
                  }
                  return null;
                })}

                {/* Render Account Type Select */}
                {currencyData.fields.map((field) => {
                  if (field.name === 'Account type') {
                    return (
                      <div className="mb-5" key={field.name}>
                        <label htmlFor="accountType" className="form-label fs-6 text-gray-600">
                          {field.name}
                        </label>
                        <Select
                          id="accountType"
                          name="accountType"
                          styles={SelectCustomStyles}
                          className="bg-body"
                          classNamePrefix="react-select"
                          options={field.group[0].valuesAllowed?.map((option) => ({
                            value: option.key,
                            label: option.name,
                          })) || []}
                          value={formik.values.accountType ? { value: formik.values.accountType, label: getLabelFromValue('Account type', formik.values.accountType) } : null}
                          placeholder="Select Account Type"
                          menuPlacement="auto"
                          onChange={(selectedOption: any) => {
                            formik.setFieldValue('accountType', selectedOption.value);
                          }}
                        />
                        <ErrorMessage name="accountType" component="div" className="text-danger" />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Right Column */}
              <div className="col-6">
                {/* Render Branch Name Select */}
                <div className="mb-5">
                  <label htmlFor="branchName" className="form-label fs-6 text-gray-600">
                    {currencyData.fields.find(field => field.name === 'Branch name')?.name}
                  </label>
                  <Select
                    id="branchName"
                    name="branchName"
                    styles={SelectCustomStyles}
                    className="bg-body"
                    classNamePrefix="react-select"
                    options={formik.values.branchOptions || []}
                    // value={selectedBranch !== null ? { value: formik.values.branchName, label:  } : null}
                    placeholder="Select Branch Name"
                    menuPlacement="auto"
                    onChange={(selectedOption: any) => {
                      if (selectedOption) {
                        formik.setFieldValue('branchName', selectedOption.value);
                        setSelectedBranch(selectedOption.label); // Update selected branch label
                      } else {
                        formik.setFieldValue('branchName', ''); // Reset branchName field
                        setSelectedBranch(null); // Reset selectedBranch state
                      }
                    }}
                    getOptionLabel={(option) => option.label} // Render the label as the option text
                    getOptionValue={(option) => option.value} // Use the value as the unique identifier
                  />
                  <ErrorMessage name="branchName" component="div" className="text-danger" />
                </div>
                {/* Render Account Number Field */}
                <div className="mb-5">
                  <label htmlFor="accountNumber" className="form-label fs-6 text-gray-600">
                    {currencyData.fields.find(field => field.name === 'Account number')?.name}
                  </label>
                  <Field
                    id={currencyData.fields.find(field => field.name === 'Account number')?.group[0].key}
                    name="accountNumber"
                    placeholder="1234567"
                    type="text"
                    className="form-control form-control-sm"
                    value={formik.values.accountNumber}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage name="accountNumber" component="div" className="text-danger" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JPYLocalbank;
