"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AddressDetail from "../../AcountTyeps/AddressDetail";
import { CHftypes, ICurrency } from "@/api/payment/types";
import { postBankAccountSubmit } from "@/api/payment/payment";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import AEDLocalbank from "./AEDLocalbank";
import { useState } from "react";

function AED({ currencyData }: { currencyData: ICurrency }) {
  const initialValues = {
    account_holder_name: "",
    address: "",
    postCode: "",
    legalType: "",
    location: "",
    aaddate: "",
    aediban: "",
    aedoption: "",
  };

  const validationSchema = Yup.object({
    account_holder_name: Yup.string().required(
      "Account Holder Name is required *"
    ),
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("Post Code is required"),
    legalType: Yup.string().required("Legal Type is required"),
    location: Yup.string().required("Location is required"),
    aaddate: Yup.string().required("Pick a date"),
    aediban: Yup.string()
      .min(2, "At least 2 letters required")
      .max(28, "You can write only up to 28 letters")
      .required("IBAN is required"),
  });

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          // Transforming formik.values to match the desired structure
          const transformedValues = {
            currency: currencyData.data.currency,
            account_holder_name: values.account_holder_name,
            legal_type: values.legalType.toLowerCase(), // Assuming legalType is "Person" or "Company"
            address: values.address,
            location: values.location,
            postcode: values.postCode,
            form_fields: {
              emirates: [
                {
                  type: currencyData.data.form[0].fields[1].group[0].type,
                  key: currencyData.data.form[0].fields[1].group[0].key,
                  value: values.aaddate,
                  is_required: 0,
                },
                {
                  type: currencyData.data.form[0].fields[2].group[0].type,
                  key: currencyData.data.form[0].fields[2].group[0].key,
                  value: values.aediban,
                  is_required: 1,
                },
                {
                  type: currencyData.data.form[0].fields[3].group[0].type,
                  key: currencyData.data.form[0].fields[3].group[0].key,
                  value: values.aedoption,
                  is_required: 1,
                  text: currencyData.data.form[0].fields[3].group[0].valuesAllowed?.find(
                    (option) => option.key === values.aedoption
                  )?.name,
                },
              ],
            },
          };

          const postResponse = await postBankAccountSubmit(
            transformedValues as CHftypes
          );

          console.log(postResponse);

          resetForm();
          if (postResponse.error) {
            toast.error("Failed to submit the form. Please try again.");
          } else {
            toast.success(postResponse.data.message);
            router.push("/payments");
          }
        } catch (error) {
          console.error("Error submitting the form: ", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formik) => (
        <Form>
          <div className="row">
            <div className="col-6 pe-10">
              <AddressDetail formik={formik} />
            </div>
            <div className="col-6">
              {currencyData.data.form.map((formdata, index) => (
                <AEDLocalbank
                  key={index}
                  currencyData={formdata}
                  formik={formik || []}
                />
              ))}
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn col-1 text-end justify-content-end btn-primary"
                disabled={formik.isSubmitting}
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AED;
