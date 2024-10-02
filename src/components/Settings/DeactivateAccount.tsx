"use client";
import { KTIcon } from '@/_metronic/helpers';
import { closeAccount } from '@/api/settings/closeAccount';
import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { toast } from 'react-toastify';
import SelectCustomStyles from '../SelectCustomStyles/SelectCustomStyles';

const DeactivateAccount = () => {
  const [status, setStatus] = useState('delete');
  const [reasonLabel, setReasonLabel] = useState('Reason to delete account');
  const [buttonLabel, setButtonLabel] = useState('Delete');
  const [reason, setReason] = useState<SingleValue<{ value: string; label: string }>>(null);

  const handleChange = (event: any) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    if (newStatus === 'delete') {
      setReasonLabel('Reason to delete account');
      setButtonLabel('Delete');
    } else {
      setReasonLabel('Reason to deactivate account');
      setButtonLabel('Deactivate');
    }
  };

  const handleAccount = async () => {
    // event.preventDefault();

    if (!reason) {
      toast.error('Please select a reason.');
      return;
    }

    try {
      const response = await closeAccount({
        action: status,
        reason: reason.value
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  }

  const reasons = [
    { value: "I am not able to use it in my country", label: "I am not able to use it in my country" },
    { value: "The system is too difficult for me to use", label: "The system is too difficult for me to use" },
    { value: "I didn't get any invitations for a long time", label: "I didn't get any invitations for a long time" },
    { value: "I want to keep working with Client not via Talent List", label: "I want to keep working with Client not via Talent List"},
    { value: "I don't feel a need in Talent List services any more", label: "I don't feel a need in Talent List services any more" },
    { value: "I have payment issues", label: "I have payment issues" },
  ];

  return (
    <div className="card mb-5 mb-xl-10">
      <div className="card-header">
        <div className="card-title m-0">
          <h4 className="fw-bold m-0 d-flex gap-3">
            <KTIcon
              iconName="trash"
              iconType="duotone"
              className="fs-2 text-gray-500"
            />
            Delete/Deactivate account
          </h4>
        </div>
      </div>
      <div className="card-body pt-5 pb-5">
          <div className="row g-5 g-xxl-8">
            <div className="d-flex flex-column align-items-start gap-5 col-xl-6" style={{ borderRight: "1px solid #f4f4f4" }}>
              <label className="form-check form-check-sm form-check-custom form-check-solid align-items-start">
                <input
                  className="form-check-input form-check-sm"
                  type="radio"
                  value="delete"
                  name="status"
                  checked={status === 'delete'}
                  onChange={handleChange}
                />
                <span className="form-check-label">
                  <label className="form-label">Delete account</label>
                  <div className="form-text">
                    This is permanent. When you delete your Talent List account, you won&apos;t be able to retrieve the content or information you&apos;ve shared on Talent List.
                  </div>
                </span>
              </label>
              <label className="form-check form-check-sm form-check-custom form-check-solid align-items-start mt-5">
                <input
                  className="form-check-input form-check-sm"
                  type="radio"
                  value="deactive"
                  name="status"
                  checked={status === 'deactive'}
                  onChange={handleChange}
                />
                <span className="form-check-label">
                  <label className="form-label">Deactivate account</label>
                  <div className="form-text">
                    This can be temporary. Your account will disable your profile and remove your name and photo from most things you&apos;ve shared on Talent List. Some information may still be visible to others, such as your name in the client list and messages you sent.
                  </div>
                </span>
              </label>
            </div>
            <div className="mt-5 col-xl-6">
              <label className="form-label" id="reason_div">{reasonLabel}</label>
              <Select 
                className='bg-body'
                styles={SelectCustomStyles}
                classNamePrefix='react-select'
                options={reasons}
                placeholder="Select an option"
                value={reason}
                onChange={setReason}
              />
            </div>
          </div>
      </div>
          <div className="card-footer border-top d-flex justify-content-end px-9 py-2">
            <button type="submit" className="btn btn-sm btn-danger text-white" id="delete_btn" onClick={handleAccount}>
              {buttonLabel}
            </button>
          </div>
    </div>
  );
};

export default DeactivateAccount;