"use client";
import React, { useEffect, useState } from "react";
import Step1 from "./Requestreview/Step1";
import Step2 from "./Requestreview/Step2";
import { getprofileinformationClient } from "@/api/profile/get_profile_information";
import { Iprofile } from "@/api/profile/types";
import { addreviewrequest } from "@/api/profile/review/addrequestreview";
import { toast } from "react-toastify";
const ListsReviewWidget4: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<Iprofile | null>(null);
  const [formData, setFormData] = useState({
    client_email: "",
    client_name: "",
    event_name: "",
    event_date: "",
    location: "",
    event_type: "",
    client_message: "", // Include client_message in formData
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getprofileinformationClient();

        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleContinue = (data: any) => {
    setFormData(data);
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleEditorChange = (editorContent: string) => {
    setFormData({ ...formData, client_message: editorContent }); // Update client_message in formData
  };

  const handleSubmit = async () => {
    try {
      const updatedProfile = await addreviewrequest(formData as any);
      if (updatedProfile.status) {
        toast.success(updatedProfile.message);
      } else {
        toast.error(updatedProfile.message);
      }
    } catch (error) {
      console.error("Error updating profile information:", error);
      // Handle error scenarios (e.g., show error message)
      toast.error("Failed to submit request. Please try again later.");
    }
  };

  return (
    <div>
      <div className="card w-50 mt-15">
        <div className="card-body">
          <div
            className="stepper stepper-links d-flex flex-column"
            id="kt_create_account_stepper"
          >
            <div className="stepper-nav mb-5">
              <div
                className={`stepper-item ${currentStep === 1 ? "current" : ""}`}
                data-kt-stepper-element="nav"
              >
                <h3 className="stepper-title">Step1</h3>
              </div>

              <div
                className={`stepper-item ${currentStep === 2 ? "current" : ""}`}
                data-kt-stepper-element="nav"
              >
                <h3 className="stepper-title">Step2</h3>
              </div>
            </div>

            {currentStep === 1 && (
              <div>
                <Step1 onContinue={handleContinue} formData={formData} />
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <Step2
                  formData={formData}
                  data={profileData}
                  onEditorChange={handleEditorChange} // Pass handleEditorChange function as prop
                />

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  {/* Trigger handleSubmit function onClick */}
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListsReviewWidget4;
