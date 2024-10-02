import React from "react";
import { KTIcon } from "@/_metronic/helpers";
import PriceSummary from "../../PriceSummary/PriceSummary";
import { useServiceData } from "../../store/data";
import { IServiceIdData } from "@/api/services/types";

const Step3 = ({
  initialValues,
  goToStep1,
}: {
  initialValues: IServiceIdData;
  goToStep1: any;
}) => {
  const { items } = useServiceData();

  const combinedValues = {
    ...initialValues,
    ...items,
  };

  return (
    <>
      <div className="card-body">
        <div className="row">
          <div className="col-7 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center  mb-3">
              <h5 className="card-title fs-4 fw-bold text-gray-700">
                Services Details
              </h5>
              <div className="edit-icon cursor-pointer" onClick={goToStep1}>
                <i className="fas fa-edit"></i>
              </div>
            </div>
            <div className="p-5 px-8">
              <div className="row mb-3">
                <div className="col-md-6 px-3 ">
                  <div className="text-gray-600 fs-6">Title</div>
                  <div className="text-gray-700 fs-5 fw-bold mb-7">
                    {combinedValues.title}
                  </div>
                  <div className="separator mb-3 "></div>
                </div>
                <div className="col-md-6 ">
                  <div className="text-gray-600 fs-6">Performance Type</div>
                  <div className="text-gray-700 fs-5 fw-bold mb-7">
                    {combinedValues.type}
                  </div>
                  <div className="separator mb-3 "></div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 ">
                  <div className="text-gray-600 fs-6">Skills</div>
                  <div className="text-gray-700 fs-5 fw-bold mb-7">
                    {Array.isArray(combinedValues.child_skills_ids)
                      ? combinedValues.parent_skills_id
                      : combinedValues.parent_skills_id}
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="text-gray-600 fs-6">Duration</div>
                  <div className="text-gray-700 fs-5 fw-bold mb-7">
                    {combinedValues.duration} Minute(s)
                  </div>
                </div>
              </div>
              <div className="separator mb-3 "></div>
            </div>
            <h5 className="card-title fs-4 fw-bold text-gray-700">
              Services Description
            </h5>
            <div className="row mb-3 px-4">
              <div className="col-md-6">
                <div className="text-gray-600 fs-6 mb-3">I AM OFFERING</div>
                {Object.keys(combinedValues.offering || {}).map(
                  (key, index) => (
                    <div
                      key={index}
                      className="text-gray-700 d-flex align-items-center fs-5 fw-bold mb-2"
                    >
                      <KTIcon
                        className="fs-1"
                        iconName="check"
                        iconType="duotone"
                      />{" "}
                      {combinedValues.offering?.[key]}
                    </div>
                  )
                )}
              </div>
              <div className="col-md-6">
                <div className="text-gray-600 fs-6 mb-3">I REQUIRE</div>
                {Object.keys(combinedValues.require || {}).map((key, index) => (
                  <div
                    key={index}
                    className="text-gray-700 d-flex align-items-center fs-5 fw-bold mb-2"
                  >
                    <KTIcon
                      className="fs-1"
                      iconName="check"
                      iconType="duotone"
                    />{" "}
                    {combinedValues.require?.[key]}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-end">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={goToStep1}
              >
                Edit Details
              </button>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card mb-4 mt-11">
              <div
                style={{
                  border: "1px solid #BFBFBF",
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                }}
                className="p-5"
              >
                <div className="mb-0 fs-3">Price summary</div>
              </div>
              <PriceSummary
                initialValues={initialValues}
                values={combinedValues}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Step3 };
