// "use client";
// import { Formik, Field, ErrorMessage, Form } from "formik";
// import AddressDetail from "../../AcountTyeps/AddressDetail";
// import OutEurope from "./OutEurope";
// import { ICurrency } from "@/api/payment/types";
// import InEurope from "./InEurope";



// const EUR = ({ currencyData }: { currencyData: ICurrency }) => {
//   return (
//     <>
//     <div className="row">
//       <div className="col-6 pe-10">
//         <AddressDetail formik={formik} />
//       </div>
    
//       <div className="col-6">
//         <div>
//     {currencyData.data.form.map((formdata,index) => (
//           <InEurope key={index}  currencyData={formdata} />
//         ))[0]}
//       </div>
    
//       <div>
//         {currencyData.data.form.map((formdata,index) => (
//           <OutEurope key={index}  currencyData={formdata} />
//         ))[1]}
//       </div>
//       </div>
//       </div>
//     </>
//   );
// };

// export default EUR;
'use client'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AddressDetail from "../../AcountTyeps/AddressDetail";

import { CHftypes, ICurrency } from "@/api/payment/types";
import { postBankAccountSubmit } from "@/api/payment/payment";
import { useRouter } from "next/navigation";
import { Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import InEurope from "./InEurope";
import OutEurope from "./OutEurope";

function EUR({ currencyData }: { currencyData: ICurrency }) {
  const initialValues = {
    account_holder_name: "",
    address: "",
    postCode: "",
    legalType: "",
    location: "",
    bankcode: "",
    ibancode: "",
    bankbiccode: "",
    ibanac: "",
  };

  const validationSchema = Yup.object({
    account_holder_name: Yup.string().required("Account Holder Name is required *"),
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("Post Code is required"),
    legalType: Yup.string().required("Legal Type is required"),
    location: Yup.string().required("Location is required"),
    bankcode: Yup.string().min(8,"At list 8 letter require").max(11,"You can write only up to 11 letters").matches(/^[A-Za-z]{6}[A-Za-z\\d]{2}([A-Za-z\\d]{3})?$/,"Invalid SWIFT / BIC code ").required(
      "Bank code (BIC/SWIFT)  is required"
    ),
    ibancode: Yup.string().min(14,"At list 14 letter require").max(42,"You can write only up to 42 letters").matches(/^[a-zA-Z]{2}[a-zA-Z0-9 ]{12,40}$/,"Invalid IBAN code ").required("IBAN is required"),
    bankbiccode: Yup.string().min(8,"At list 8 letter require").max(11,"You can write only up to 11 letters").matches(/^[a-zA-Z]{6}(([a-zA-Z0-9]{2})|([a-zA-Z0-9]{5}))$/,"Invalid SWIFT / BIC code ").required(
      "SWIFT / BIC code  is required *"
    ),
    ibanac: Yup.string().min(4,"At list 4 letter require").max(34,"You can write only up to 34 letters").matches(/^[a-zA-Z]{2}[a-zA-Z0-9 ]{12,40}$/,"Invalid IBAN / Account number").required("IBAN / Account number is required"),
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
            currency: "EUR",
            account_holder_name: values.account_holder_name,
            legal_type: values.legalType.toLowerCase(), // Assuming legalType is "Person" or "Company"
            address: values.address,
            location: values.location,
            postcode: values.postCode,
            form_fields: {
              iban: [
                {
                  type: currencyData.data.form[0].fields[1].group[0].type,
                  key: currencyData.data.form[0].fields[1].group[0].key,
                  value: values.bankcode,
                  is_required: 0,
                },
                {
                  type: currencyData.data.form[0].fields[2].group[0].type,
                  key: currencyData.data.form[0].fields[2].group[0].key,
                  value: values.ibancode,
                  is_required: 1,
                },
              ],
              swift_code: [
                {
                  type: currencyData.data.form[0].fields[1].group[0].type,
                  key: currencyData.data.form[0].fields[1].group[0].key,
                  value: values.bankbiccode,
                  is_required: 1,
                },
                {
                  type: currencyData.data.form[0].fields[2].group[0].type,
                  key: currencyData.data.form[0].fields[2].group[0].key,
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
              <AddressDetail formik={formik} />
            </div>
            <div className="col-6">
              {currencyData.data.form.map((formdata, index) => (
                <InEurope key={index} currencyData={formdata} formik={formik} />
              ))[0]}
            </div>
            <div className="col-6">
              {currencyData.data.form.map((formdata, index) => (
                <OutEurope key={index} currencyData={formdata} formik={formik} />
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

export default EUR;