'use client'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AddressDetail from "../../AcountTyeps/AddressDetail";

import { CHftypes, ICurrency } from "@/api/payment/types";
import { postBankAccountSubmit } from "@/api/payment/payment";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ACH from "./ACH";
import WIRE from "./WIRE";
import SWIFT from "./SWIFT";


function USD({ currencyData }: { currencyData: ICurrency }) {
  const initialValues = {
    account_holder_name: "",
    address: "",
    postCode: "",
    legalType: "",
    location: "",
    bankbiccode: "",
    ibanac: "",
    achroutingno: "",
    achacoountno: "",
    achaccountType: "",
    wirenumber: "",
    wireaccountno: "",
    wireaccountType: "",
  };

  const validationSchema = Yup.object({
    account_holder_name: Yup.string().required("Account Holder Name is required *"),
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("Post Code is required"),
    legalType: Yup.string().required("Legal Type is required"),
    location: Yup.string().required("Location is required"),
    achroutingno: Yup.string() .min(9,"At list 9 letter require").max(9,"You can write only up to 9 letters").matches(/^\\d{9}$/,"Invalid Routing Number ").required("Routing Number is required"),
    achacoountno: Yup.string().min(4,"At list 4 letter require").max(17,"You can write only up to 17 letters").matches(/^\\d{4,17}$/,"Invalid Account Number").required("Account Number is required"),
    achaccountType: Yup.string().required("Account type is required"),
    ibanac: Yup.string().matches(/^[a-zA-Z0-9\\s]{4,34}$/,"Invalid account number").min(4,"At list 4 letter require").max(34,"You can write only up to 34 letters").required("Account Number is required"),
    wirenumber: Yup.string().min(9,"At list 9 letter require").max(9,"You can write only up to 9 letters").matches(/^\\d{9}$/,"Invalid Routing Number").required("Routing Number is required"),
    bankbiccode: Yup.string().min(8,"At list 8 letter require").max(11,"You can write only up to 11 letters").matches(/^[a-zA-Z]{6}(([a-zA-Z0-9]{2})|([a-zA-Z0-9]{5}))$/,"Invalid routing number").required("Routing Number is required"),
    wireaccountno: Yup.string().min(4,"At list 4 letter require").max(17,"You can write only up to 17 letters").matches(/^\\d{4,17}$/,"Invalid Account Number").required("Account Number is required"),
    wireaccountType: Yup.string().required("Account type is required")
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
            currency: "USD",
            account_holder_name: values.account_holder_name,
            legal_type: values.legalType.toLowerCase(), // Assuming legalType is "Person" or "Company"
            address: values.address,
            location: values.location,
            postcode: values.postCode,
            form_fields: {
              aba: [
                {
                  type: currencyData.data.form[0].fields[1].group[0].type,
                  key: currencyData.data.form[0].fields[1].group[0].key,
                  value: values.achroutingno,
                  is_required: 1,
                },
                {
                  type: currencyData.data.form[0].fields[2].group[0].type,
                  key: currencyData.data.form[0].fields[2].group[0].key,
                  value: values.achacoountno,
                  is_required: 1,
                },
                {
                  type: currencyData.data.form[0].fields[3].group[0].type,
                  key: currencyData.data.form[0].fields[3].group[0].key,
                  value: values.achaccountType,
                  is_required: 1,
                },
              ],
              fedwire_local: [
                {
                  type: currencyData.data.form[1].fields[1].group[0].type,
                  key: currencyData.data.form[1].fields[1].group[0].key,
                  value: values.wirenumber,
                  is_required: 1,
                },
                {
                  type: currencyData.data.form[1].fields[2].group[0].type,
                  key: currencyData.data.form[1].fields[2].group[0].key,
                  value: values.wireaccountno,
                  is_required: 1,
                },
                {
                  type: currencyData.data.form[1].fields[3].group[0].type,
                  key: currencyData.data.form[1].fields[3].group[0].key,
                  value: values.wireaccountType,
                  is_required: 1,
                },
              ],
              swift_code: [
                {
                  type: currencyData.data.form[2].fields[1].group[0].type,
                  key: currencyData.data.form[2].fields[1].group[0].key,
                  value: values.bankbiccode,
                  is_required: 1,
                },
                {
                  type: currencyData.data.form[2].fields[2].group[0].type,
                  key: currencyData.data.form[2].fields[2].group[0].key,
                  value: values.ibanac,
                  is_required: 1,
                },
                
              ]
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
              <AddressDetail formik={formik}/>
            </div>
            <div className="col-6">
              {currencyData.data.form.map((formdata, index) => (
                <ACH key={index} currencyData={formdata} formik={formik} />
              ))[0]}
            </div>
            <div className="col-6">
              {currencyData.data.form.map((formdata, index) => (
                <WIRE key={index} currencyData={formdata} formik={formik} />
              ))[1]}
            </div>
            <div className="col-6">
              {currencyData.data.form.map((formdata, index) => (
                <SWIFT key={index} currencyData={formdata} formik={formik} />
              ))[2]}
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

export default USD;