'use client'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AddressDetail from "../../AcountTyeps/AddressDetail";
import CHFIban from "./CHFIban";
import { CHftypes, ICurrency } from "@/api/payment/types";
import { postBankAccountSubmit } from "@/api/payment/payment";
import { useRouter } from "next/navigation";
import { Toast } from "react-bootstrap";
import { toast } from "react-toastify";

function CHF({ currencyData }: { currencyData: ICurrency }) {
  const initialValues = {
    account_holder_name: "",
    address: "",
    postCode: "",
    legalType: "",
    location: "",
    chfibanbank: "",
    chfibancode: "",
  };

  const validationSchema = Yup.object({
    account_holder_name: Yup.string().required("Account Holder Name is required *"),
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("Post Code is required"),
    legalType: Yup.string().required("Legal Type is required"),
    location: Yup.string().required("Location is required"),
    chfibanbank: Yup.string()
      .matches(/^[A-Za-z]{6}[A-Za-z\d]{2}([A-Za-z\d]{3})?$/, "Invalid Bank code")
      .min(8, "At least 8 letters required")
      .max(11, "You can write only up to 11 letters")
      .required("Bank code is required *"),
    chfibancode: Yup.string()
      .matches(/^[a-zA-Z]{2}[a-zA-Z0-9 ]{12,40}$/, "Invalid IBAN")
      .min(14, "At least 14 letters required")
      .max(42, "You can write only up to 42 letters")
      .required("IBAN is required"),
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
            currency: currencyData.data.currency,
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
                  value: values.chfibanbank,
                  is_required: 0,
                },
                {
                  type: currencyData.data.form[0].fields[2].group[0].type,
                  key: currencyData.data.form[0].fields[2].group[0].key,
                  value: values.chfibancode,
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
                <CHFIban key={index} currencyData={formdata} formik={formik} />
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

export default CHF;