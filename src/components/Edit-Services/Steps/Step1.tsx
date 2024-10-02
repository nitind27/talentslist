import React, { FC, useEffect, useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { IParentsSkillsData, IServiceIdData } from "@/api/services/types";
import Select from "react-select";
import { getChildSkills, getParentsSkills } from "@/api/services/services";
import { useServiceData } from "../../store/data";
import SelectCustomStyles from "../../SelectCustomStyles/SelectCustomStyles";
import { IconDelete } from "@/_metronic/assets/Svgicons/IocnDelete";
import { KTIcon } from "@/_metronic/helpers";

const Step1: FC<{ initialValues: IServiceIdData }> = ({ initialValues }) => {
  const [skills, setSkills] = useState<IParentsSkillsData[]>([]);
  const [parentSkills, setParentSkills] = useState<any[]>([]);
  const [childSkills, setChildSkills] = useState<IParentsSkillsData[]>([]);
  const { items, setItems } = useServiceData();
  const { values, setFieldValue } = useFormikContext<IServiceIdData>();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getParentsSkills();
        setSkills(response.data.data);

        // Set the initial values of the form fields
        setFieldValue("type", initialValues.type);
        setFieldValue("parent_skills_id", initialValues.parent_skills_id);
        setFieldValue(
          "child_skills_ids",
          Array.isArray(initialValues.child_skills_ids)
            ? initialValues.child_skills_ids
            : []
        );
        setFieldValue("duration", initialValues.duration);
        setItems({
          ...items,
          offering: initialValues.offering,
          require: initialValues.require,
        });
      } catch (error) {
        console.error("Error fetching parent skills:", error);
      }
    };
    fetchSkills();
  }, [initialValues, setFieldValue, setItems]);

  useEffect(() => {
    const fetchParentSkills = async () => {
      try {
        const response = await getParentsSkills();
        setParentSkills(response.data.data);
      } catch (error) {
        console.error("Error fetching parent skills:", error);
      }
    };
    fetchParentSkills();
  }, []);
  const fetchChildSkills = async (parentId: number) => {
    try {
      const response = await getChildSkills(parentId);
      setChildSkills(response.data.data);
    } catch (error) {
      console.error("Error fetching child skills:", error);
    }
  };

  const handleKeyUp =
    (fieldName: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      setItems({ ...items, [fieldName]: e.currentTarget.value });
    };

  const handleKeyup = (fieldName: string, value: any) => {
    setItems({ ...items, [fieldName]: value });
  };

  const handleObjectChange = (field: string, key: string, value: string) => {
    setFieldValue(`${field}.${key}`, value);
    setItems((prevItems: any) => ({
      ...prevItems,
      [field]: {
        ...prevItems[field],
        [key]: value,
      },
    }));
  };

  const handleAddEntry = (field: string) => {
    // Check if there are any empty fields
    const emptyFields = Object.values(values[field] || {}).some(
      (value) => !value
    );

    // If no empty fields, proceed to add a new entry
    if (!emptyFields) {
      const newKey = Date.now().toString();
      setFieldValue(`${field}.${newKey}`, "");
      setItems((prevItems: any) => ({
        ...prevItems,
        [field]: {
          ...prevItems[field],
          [newKey]: "",
        },
      }));
    } else {
      // Set error for empty fields (trigger formik validation)
      Object.keys(values[field] || {}).forEach((key) => {
        if (!values[field][key]) {
          setFieldValue(`${field}.${key}`, "");
        }
      });
    }
  };

  const handleRemoveEntry = (field: string, key: string) => {
    const updatedField = { ...values[field] };
    delete updatedField[key];
    setFieldValue(field, updatedField);
    setItems((prevItems: any) => ({
      ...prevItems,
      [field]: updatedField,
    }));
  };

  const handleParentSkillChange = (selectedOption: any) => {
    console.log("fasf", selectedOption);
    const parentId = selectedOption ? selectedOption.value : null;
    const parentLabel = selectedOption ? selectedOption.label : null;
    setFieldValue("parent_skills_id", parentLabel);
    setItems({ ...items, childSkillsLabels: [] }); // Clear childSkillsLabels if needed
    handleKeyup("parent_skills_id", parentLabel); // Pass the label instead of the ID
    if (parentId) {
      fetchChildSkills(parentId);
    } else {
      setChildSkills([]); // Clear childSkills array if parentId is null
    }
  };

  return (
    <div
      className="mx-auto mw-700px w-100 pt-10 pb-10"
      id="kt_create_account_form"
    >
      <div className="current" data-kt-stepper-element="content">
        <div className="w-100">
          <div className="fv-row mb-10">
            <label className="form-label required">Service title</label>
            <Field
              name="title"
              className="form-control form-control-lg "
              placeholder="Enter your service title"
              onKeyUp={handleKeyUp("title")}
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="fv-row mb-10">
            <label className="form-label required">Location</label>
            <div className="row">
              <div className="col-lg-6">
                <Field
                  type="radio"
                  className="btn-check"
                  name="type"
                  id="kt_create_account_form_account_type_personal"
                  value="online"
                  onClick={() => handleKeyup("type", "online")}
                />
                <label
                  className={`btn btn-outline btn-outline-dashed ${
                    values.type === "online" ? "btn-active-light-primary" : ""
                  } p-2 pe-5 ps-5 d-flex align-items-center`}
                  htmlFor="kt_create_account_form_account_type_personal"
                >
                  Online
                </label>
              </div>
              <div className="col-lg-6">
                <Field
                  type="radio"
                  className="btn-check"
                  name="type"
                  id="kt_create_account_form_account_type_corporate"
                  value="onsite"
                  onClick={() => handleKeyup("type", "onsite")}
                />
                <label
                  className={`btn btn-outline btn-outline-dashed ${
                    values.type === "onsite" ? "btn-active-light-primary" : ""
                  } p-2 pe-5 ps-5 d-flex align-items-center`}
                  htmlFor="kt_create_account_form_account_type_corporate"
                >
                  Onsite
                </label>
              </div>
            </div>
            <ErrorMessage name="type" component="div" className="text-danger" />
          </div>

          <div className="row">
            <div className="mb-10 col-lg-6">
              <label className="form-label required">Skills</label>
              <Select
                name="parent_skills_id"
                styles={SelectCustomStyles}
                classNamePrefix="react-select"
                placeholder="Please select skills"
                menuPlacement="auto"
                isSearchable={true}
                options={parentSkills.map((skill) => ({
                  value: skill.id,
                  label: skill.name,
                }))}
                onChange={handleParentSkillChange}
                defaultValue={
                  Array.isArray(values.parent_skills_id)
                    ? values.parent_skills_id.map((c: any) => ({
                        value: c.id,
                        label: c.name,
                      }))
                    : null
                }
              />

              <ErrorMessage
                name="parent_skills_id"
                component="div"
                className="text-danger"
              />
            </div>

            <div className=" mb-10 col-lg-6">
              <label className="form-label required">Child Skills</label>
              <Select
                name="child_skills_ids"
                className="form-control.border-black"
                isMulti
                options={childSkills.map((childSkill: any) => ({
                  value: childSkill.id,
                  label: childSkill.name,
                }))}
                classNamePrefix="react-select"
                placeholder="Please select skills"
                menuPlacement="auto"
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map(
                    (opt: any) => opt.value
                  );
                  setFieldValue("child_skills_ids", selectedValues); // Set field value as array of IDs
                  handleKeyup("child_skills_ids", selectedValues); // Ensure items are set with IDs
                  setItems({ ...items, childSkillsLabels: selectedOptions }); // Optionally set labels if needed
                }}
                value={childSkills
                  .filter((childSkill) =>
                    (values.child_skills_ids?.length > 0
                      ? values.child_skills_ids.map(String)
                      : []
                    ).includes(String(childSkill.id))
                  )
                  .map((childSkill) => ({
                    value: childSkill.id,
                    label: childSkill.name,
                  }))}
              />

              <ErrorMessage
                name="child_skills_ids"
                component="div"
                className="text-danger"
              />
            </div>
          </div>
          {/* {childSkillsArray.map((skillId, index) => (
            <div key={index}>{skillId}</div>
          ))} */}
          <div className="fv-row mb-10">
            <label className="form-label required">Duration (Minutes)</label>
            <Field
              name="duration"
              className="form-control form-control-lg"
              placeholder="Enter your service duration in minutes"
              onKeyUp={handleKeyUp("duration")}
            />
            <ErrorMessage
              name="duration"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="fv-row mb-10">
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">I am offering</label>
                {Object.entries(values.offering || {}).map(
                  ([key, value], index) => (
                    <div className="form-group row mb-3" key={key}>
                      <div className="col-md-9">
                        <Field
                          type="text"
                          name={`offering.${key}`}
                          className="form-control mb-2 mb-md-0"
                          placeholder="Enter what you offer here"
                          onKeyUp={(e: any) =>
                            handleObjectChange("offering", key, e.target.value)
                          }
                        />
                      </div>
                      <ErrorMessage
                        name={`offering.${key}`}
                        component="div"
                        className="text-danger bg-black h-100"
                      />
                      <div className="col-md-3">
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-light-danger me-2 btn-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveEntry("offering", key);
                            }}
                          >
                            <KTIcon
                              iconName="trash"
                              iconType="duotone"
                              className="fs-1"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  )
                )}

                <ErrorMessage
                  name={`offerin`}
                  component="div"
                  className="text-danger"
                />
                <button
                  type="button"
                  className="btn btn-light-primary me-2 btn-sm"
                  onClick={() => handleAddEntry("offering")}
                >
                  Add New
                </button>
              </div>
              <ErrorMessage
                name="offering"
                component="div"
                className="text-danger"
              />
              <div className="col-md-6">
                <label className="form-label">I require</label>
                {Object.entries(values.require || {}).map(
                  ([key, value], index) => (
                    <div className="form-group row mb-3" key={key}>
                      <div className="col-md-9">
                        <Field
                          type="text"
                          name={`require.${key}`}
                          className="form-control mb-2 mb-md-0"
                          placeholder="Enter your requirements here"
                          onKeyUp={(e: any) =>
                            handleObjectChange("require", key, e.target.value)
                          }
                        />
                        <ErrorMessage
                          name={`require.${key}`}
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-3">
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-light-danger me-2 btn-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveEntry("require", key);
                            }}
                          >
                            <KTIcon
                              iconName="trash"
                              iconType="duotone"
                              className="fs-1"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  )
                )}
                <button
                  type="button"
                  className="btn btn-light-primary me-2 btn-sm"
                  onClick={() => {
                    const emptyFields = Object.values(
                      values.require || {}
                    ).some((value) => !value);
                    if (!emptyFields) {
                      handleAddEntry("require");
                    }
                  }}
                >
                  Add New
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
