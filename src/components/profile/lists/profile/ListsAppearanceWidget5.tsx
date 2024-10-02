import React, { useEffect, useState } from "react";
import { ListsAppearanceProps } from "./Profilepageprops";
import { KTIcon } from "@/_metronic/helpers";
import { IprofileAppearance } from "@/api/profile/types";
import {
  getprofileappearancedata,
  updateProfileAppearance,
} from "@/api/profile/get_profile_information";
import { toast } from "react-toastify";
import Select from "react-select";
import SelectCustomStyles from "@/components/SelectCustomStyles/SelectCustomStyles";
import { useFormik } from "formik";

type AppearanceOption = {
  value: string;
  label: string;
};

const fieldLabelMapping: { [key: string]: string } = {
  height: "Height",
  weight: "Weight",
  chest: "Chest",
  skin: "Skin Color",
  eye: "Eye Color",
  waist: "Waist",
  hair_type: "Hair Type",
  hair_colour: "Hair Color",
  hair_length: "Hair Length",
  shoe_size: "Shoe Size",
  ethnicity: "Ethnicity",
};

const ListsAppearanceWidget5: React.FC<ListsAppearanceProps> = ({
  height,
  weight,
  chest,
  skincolor,
  eyecolor,
  waist,
  hairtype,
  haircolor,
  hairlength,
  shoesize,
  ethnicity,
  appearancedatas
}) => {
  const [isEditMode, setIsEditMode] = useState(false);



  const formik = useFormik({
    initialValues: {
      height: height,
      weight: weight,
      chest: chest,
      skin: skincolor,
      eye: eyecolor,
      waist: waist,
      hair_type: hairtype,
      hair_colour: haircolor,
      hair_length: hairlength,
      shoe_size: shoesize,
      ethnicity: ethnicity,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response1 = await updateProfileAppearance(values as any);
        if (response1.status) {
          toast.success(response1.message);
          setIsEditMode(false);
          const response = await getprofileappearancedata();
          // setAppearancedata(response.data);
        } else {
          toast.error(
            "Failed to update appearance information. Please try again."
          );
        }
      } catch (error) {
        toast.error("Some error occurred. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    },
  });
console.log('reorpvknsdv',appearancedatas)
  const mapDataToOptions = (data: { [key: string]: string }) => {
    return Object.entries(data).map(([key, value]) => ({
      value: key,
      label: value,
    }));
  };

  const getLabelFromValue = (
    value: string,
    options: AppearanceOption[]
  ): string => {
    const option = options.find((option) => option.value === value);
    return option ? option.label : value;
  };

  return (
    <div>
      <div className="card mb-5 mb-xl-10">
        <div className="card-header">
          <div className="card-title m-0">
            <h4 className="fw-bold m-0 d-flex gap-3">
              <KTIcon iconName="user" iconType="duotone" className="fs-1" />{" "}
              Appearance
            </h4>
          </div>

          <div className="card-toolbar">
            {!isEditMode && (
              <button
                type="button"
                className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary menu-dropdown"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                data-kt-menu-flip="top-end"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                <KTIcon iconName="pencil" iconType="duotone" className="fs-2" />
              </button>
            )}
          </div>
        </div>

        <div className="card-body p-9">
          <form onSubmit={formik.handleSubmit}>
            <div className="row mb-3">
              {Object.entries(formik.values).map(([label, value], index) => (
                <React.Fragment key={index}>
                  <div className="col-lg-2 fw-semibold text-muted">
                    <span>{fieldLabelMapping[label]}</span>
                  </div>
                  <div
                    className={`col-lg-4 ${index % 2 === 0 ? "bordered" : ""}`}
                  >
                    {isEditMode ? (
                      <Select
                        className=""
                        styles={SelectCustomStyles}
                        classNamePrefix="react-select"
                        name={label}
                        options={
                          appearancedatas &&
                          appearancedatas[
                            label
                              .replace(/ /g, "_")
                              .toLowerCase() as keyof IprofileAppearance
                          ]
                            ? mapDataToOptions(
                                appearancedatas[
                                  label
                                    .replace(/ /g, "_")
                                    .toLowerCase() as keyof IprofileAppearance
                                ]
                              )
                            : []
                        }
                        defaultValue={{
                          value:
                            formik.values[label as keyof typeof formik.values],
                          label: getLabelFromValue(
                            formik.values[label as keyof typeof formik.values],
                            appearancedatas &&
                              appearancedatas[
                                label
                                  .replace(/ /g, "_")
                                  .toLowerCase() as keyof IprofileAppearance
                              ]
                              ? mapDataToOptions(
                                  appearancedatas[
                                    label
                                      .replace(/ /g, "_")
                                      .toLowerCase() as keyof IprofileAppearance
                                  ]
                                )
                              : []
                          ),
                        }}
                        placeholder={`Select a ${fieldLabelMapping[label]}`}
                        onChange={(option) =>
                          formik.setFieldValue(label, option?.value || "")
                        }
                      />
                    ) : (
                      <p className="fw-bold mb-2 fs-6 m-0 text-gray-800 text-start">
                        {getLabelFromValue(
                          value as string,
                          appearancedatas &&
                            appearancedatas[
                              label
                                .replace(/ /g, "_")
                                .toLowerCase() as keyof IprofileAppearance
                            ]
                            ? mapDataToOptions(
                                appearancedatas[
                                  label
                                    .replace(/ /g, "_")
                                    .toLowerCase() as keyof IprofileAppearance
                                ]
                              )
                            : []
                        )}
                      </p>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
            {isEditMode && (
              <div className="d-flex mt-5 justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm me-5"
                  style={{ backgroundColor: "#D9214E", color: "white" }}
                  onClick={() => {
                    setIsEditMode(false);
                    formik.resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm"
                  style={{ backgroundColor: "#0036e3", color: "white" }}
                  disabled={formik.isSubmitting}
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListsAppearanceWidget5;
