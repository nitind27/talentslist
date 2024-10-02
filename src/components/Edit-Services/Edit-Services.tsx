"use client";
import { useEffect, useRef, useState } from "react";

import { Step3 } from "./Steps/Step3";
import { StepperComponent } from "@/_metronic/assets/ts/components";
import { Form, Formik, FormikValues } from "formik";
import { KTIcon } from "@/_metronic/helpers";
import { IServiceIdData } from "@/api/services/types";
import { validationSchema } from "./CreateAccountWizardHelper";
import { getAddServices, getEditServices } from "@/api/services/services";
import { useServiceData } from "../store/data";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Step1 from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";

const EditServices = ({
  initialValues,
  searchParams,
}: {
  initialValues: IServiceIdData;
  searchParams: { id: string };
}) => {
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const [stepper, setStepper] = useState<StepperComponent | null>(null);
  const [currentSchema, setCurrentSchema] = useState(validationSchema[0]);
  const [isSubmitButton, setSubmitButton] = useState(false);
  const router = useRouter();

  const { setItems } = useServiceData();

  const loadStepper = () => {
    setStepper(
      StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
    );
  };

  const prevStep = () => {
    if (!stepper) {
      return;
    }
    stepper.goPrev();

    setCurrentSchema(validationSchema[stepper.currentStepIndex - 1]);
    setSubmitButton(stepper.currentStepIndex === stepper.totalStepsNumber);
  };

  const goToStep1 = () => {
    if (!stepper) return;
    stepper.goto(1);
    setCurrentSchema(validationSchema[0]);
    setSubmitButton(false);
  };

  const submitStep = async (values: IServiceIdData) => {
    if (!stepper) {
      return;
    }

    if (stepper.currentStepIndex !== stepper.totalStepsNumber) {
      stepper.goNext();
    } else {
      setSubmitButton(stepper.currentStepIndex === stepper.totalStepsNumber);
      setCurrentSchema(validationSchema[stepper.currentStepIndex]);

      try {
        let response;
        if (searchParams.id) {
          response = await getEditServices(Number(searchParams.id), values);
          if (!response.error) {
            toast.success(response.data.message);
            router.push("/services");
          } else {
            toast.error(response.data.message);
          }
        } else {
          response = await getAddServices(values);
          if (!response.error) {
            toast.success(response.data.message);
            router.push("/services");
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        toast.error("Failed to add or update service");
      }
    }
  };

  useEffect(() => {
    if (!stepperRef.current) {
      return;
    }

    loadStepper();
  }, [stepperRef]);

  return (
    <>
      <div className="card w-75">
        <div className="card-body ">
          <div
            ref={stepperRef}
            className="stepper stepper-links  d-flex flex-column"
            id="kt_create_account_stepper"
          >
            <div className="stepper-nav mb-5">
              <div
                className="stepper-item current"
                data-kt-stepper-element="nav"
              >
                <h3 className="stepper-title">Details</h3>
              </div>

              <div className="stepper-item" data-kt-stepper-element="nav">
                <h3 className="stepper-title">Price</h3>
              </div>

              <div className="stepper-item" data-kt-stepper-element="nav">
                <h3 className="stepper-title">Review</h3>
              </div>
            </div>

            <Formik
              validationSchema={currentSchema}
              initialValues={initialValues}
              onSubmit={submitStep}
            >
              {({ setFieldValue }) => (
                <Form
                  className="mx-auto mw-800px w-100  pb-10"
                  id="kt_create_account_form"
                >
                  <div className="current" data-kt-stepper-element="content">
                    <Step1 initialValues={initialValues} />
                  </div>

                  <div data-kt-stepper-element="content">
                    <Step2
                      initialValues={initialValues}
                      setFieldValue={setFieldValue}
                    />
                  </div>

                  <div data-kt-stepper-element="content">
                    <Step3
                      initialValues={initialValues}
                      goToStep1={goToStep1}
                    />
                  </div>

                  <div className="d-flex flex-stack pt-15">
                    <div className="mr-2">
                      <button
                        onClick={prevStep}
                        type="button"
                        className="btn btn-lg btn-light-primary me-3 btn-sm"
                        data-kt-stepper-action="previous"
                      >
                        <KTIcon iconName="arrow-left" className="fs-4 me-1" />
                        Back
                      </button>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary me-3 btn-sm d-flex align-items-center justify-content-center"
                      >
                        <span className="indicator-label d-flex align-items-center">
                          {!isSubmitButton && "Continue"}
                          {isSubmitButton && "Submit"}
                          <KTIcon
                            iconName="arrow-right"
                            className="fs-3 ms-2 me-0"
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export { EditServices };
