
'use client'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AddressDetail from "../../AcountTyeps/AddressDetail";

import { CHftypes, ICurrency } from "@/api/payment/types";
import { postBankAccountSubmit } from "@/api/payment/payment";
import { useRouter } from "next/navigation";
import { Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import GBPLocalBank from "./GBPLocalBank";
import GBPIBANcode from "./GBPIBANcode";

function GBP({ currencyData }: { currencyData: ICurrency }) {
  const initialValues = {
    account_holder_name: "",
    address: "",
    postCode: "",
    legalType: "",
    location: "",
    gbpibanbank: "", 
    gbpibancode: "", 
    uksortcode: "", 
    gbpaccountno: "", 
    
  };

  const validationSchema = Yup.object({
    account_holder_name: Yup.string().required("Account Holder Name is required *"),
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("Post Code is required"),
    legalType: Yup.string().required("Legal Type is required"),
    location: Yup.string().required("Location is required"),
    gbpibanbank: Yup.string().min(8,"At list 8 letter require").max(11,"You can write only up to 11 letters").matches(/^[A-Za-z]{6}[A-Za-z\\d]{2}([A-Za-z\\d]{3})?$/,"Invalid Bank code (BIC/SWIFT)").required("Bank code (BIC/SWIFT) is required *"),
    gbpiban: Yup.string().min(14,"At list 14 letter require").max(42,"You can write only up to 42 letters").matches(/^[a-zA-Z]{2}[a-zA-Z0-9 ]{12,40}$/,"Invalid IBAN").required("IBAN is required"),
    uksortcode: Yup.string().min(6,"At list 6 letter require").max(8,"You can write only up to 8 letters") .matches(/^\\d{2}-?\\d{2}-?\\d{2}$/,"Invalid UK sort code").required("UK sort code is required *"),
    gbpaccountno: Yup.string().min(6,"At list 6 letter require").max(8,"You can write only up to 8 letters").matches(/[0-9]{8}/,"Invalid Account number").required("Account number is required"),
  });

  const router = useRouter()

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          // Transforming formik.values to match the desired structure
          const transformedValues = {
            currency: "GBP",
            account_holder_name: values.account_holder_name,
            legal_type: values.legalType.toLowerCase(), // Assuming legalType is "Person" or "Company"
            address: values.address,
            location: values.location,
            postcode: values.postCode,
            form_fields: {
              sort_code: [
                {
                  type: currencyData.data.form[0].fields[1].group[0].type,
                  key: currencyData.data.form[0].fields[1].group[0].key,
                  value: values.uksortcode,
                  is_required: 1,
                },
                {
                  type: currencyData.data.form[0].fields[2].group[0].type,
                  key: currencyData.data.form[0].fields[2].group[0].key,
                  value: values.gbpaccountno,
                  is_required: 1,
                },
              ],
              iban: [
                {
                  type: currencyData.data.form[1].fields[1].group[0].type,
                  key: currencyData.data.form[1].fields[1].group[0].key,
                  value: values.gbpibanbank,
                  is_required: 0,
                },
                {
                  type: currencyData.data.form[1].fields[2].group[0].type,
                  key: currencyData.data.form[1].fields[2].group[0].key,
                  value: values.gbpibancode,
                  is_required: 1,
                },
              ],
            },
          };

          const postResponse = await postBankAccountSubmit(transformedValues as CHftypes);
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
                <GBPLocalBank key={index} currencyData={formdata} initialValues={initialValues} />
              ))[0]}
            </div>
            <div className="col-6">
              {currencyData.data.form.map((formdata, index) => (
                <GBPIBANcode key={index} currencyData={formdata} initialValues={initialValues} />
              ))[1]}
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

export default GBP;