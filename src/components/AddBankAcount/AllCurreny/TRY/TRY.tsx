// 'use client'
// import React from 'react'
// import AddressDetail from '../../AcountTyeps/AddressDetail'
// import TRYIban from './TRYIban'
// import { ICurrency } from '@/api/payment/types'


// const TRY = ({ currencyData }: { currencyData: ICurrency }) => {
//   return (
//     <>
//     <div className="row">
//         <div className="col-6 pe-10">
//             <AddressDetail/>
//         </div>
//         <div className="col-6">
//         {currencyData.data.form.map((formdata,index) => (
//             <TRYIban key={index}  currencyData={formdata} />
//           ))}
          
//         </div>
//     </div>
//     </>
//   )
// }

// export default TRY

// 'use client'
// import React from 'react'
// import AddressDetail from '../../AcountTyeps/AddressDetail'
// import NOKIban from './NOKIban'
// import { ICurrency } from '@/api/payment/types'

// const NOK = ({ currencyData }: { currencyData: ICurrency }) => {
//   return (
//     <>
//     <div className="row ">
//         <div className="col-6 pe-10">
//             <AddressDetail/>
//         </div>
//         <div className="col-6">
//         {currencyData.data.form.map((formdata,index) => (
//             <NOKIban key={index}  currencyData={formdata} />
//           ))}
        
//         </div>
//     </div>
//     </>
//   )
// }

// export default NOK

'use client'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AddressDetail from "../../AcountTyeps/AddressDetail";

import { CHftypes, ICurrency } from "@/api/payment/types";
import { postBankAccountSubmit } from "@/api/payment/payment";
import { useRouter } from "next/navigation";
import { Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import TRYIban from "./TRYIban";



function TRY({ currencyData }: { currencyData: ICurrency }) {
  const initialValues = {
    account_holder_name: "",
    address: "",
    postCode: "",
    legalType: "",
    location: "",
    tryibancode: "",
  };

  const validationSchema = Yup.object({
    account_holder_name: Yup.string().required("Account Holder Name is required *"),
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("Post Code is required"),
    legalType: Yup.string().required("Legal Type is required"),
    location: Yup.string().required("Location is required"),
    tryibancode: Yup.string().min(2,"At least 2 letter require").required("IBAN is required"),
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
            currency: "TRY",
            account_holder_name: values.account_holder_name,
            legal_type: values.legalType.toLowerCase(), // Assuming legalType is "Person" or "Company"
            address: values.address,
            location: values.location,
            postcode: values.postCode,
            form_fields: {
              turkish_earthport: [
                {
                  type: currencyData.data.form[0].fields[1].group[0].type,
                  key: currencyData.data.form[0].fields[1].group[0].key,
                  value: values.tryibancode,
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
                <TRYIban key={index} currencyData={formdata} initialValues={initialValues} />
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

export default TRY;