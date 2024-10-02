
'use client'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AddressDetail from "../../AcountTyeps/AddressDetail";
import { CHftypes, ICurrency } from "@/api/payment/types";
import { postBankAccountSubmit } from "@/api/payment/payment";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CADInterac from "./CADInterac";
import CADLocalbank from "./CADLocalbank";

function CAD({ currencyData }: { currencyData: ICurrency }) {
  const initialValues = {
    account_holder_name: "",
    address: "",
    postCode: "",
    legalType: "",
    location: "",
    CADEmail: "",
    cadinstitition: "",
    cadtransit: "",
    cadaccountno: "",
    accountType: "",
  };

  const validationSchema = Yup.object({
    account_holder_name: Yup.string().required("Account Holder Name is required *"),
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("Post Code is required"),
    legalType: Yup.string().required("Legal Type is required"),
    location: Yup.string().required("Location is required"),
    CADEmail: Yup.string().min(6,"At least 6 letters required").max(50,"You can write only up to 50 letters").matches(/^(([A-Za-z0-9_\\-\\.\\+])*[A-Za-z0-9_]\\@(?!.*?\\.\\.|\\s|\\.)[^@]([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,63}))$/,"Invalid Email").required("Interac registered email is required"),
    cadinstitition: Yup.string().min(3,"At list 3 letter require").max(3,"You can write only up to 3 letters").matches(/\\d{3}/,"invalid InstitutionNumber").required("Institution Number is required"),
    cadtransit: Yup.string().min(5,"At list 5 letter require").max(5,"You can write only up to 5 letters").matches(/\\d{5}/,"Invalid Transit number").required("Transit Number is required"),
    cadaccountno: Yup.string().min(7,"At list 7 letter require").max(12,"You can write only up to 12 letters").matches(/\\d{7,12}/,"Invalid Account Number ").required("Account Number is required")
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
              canadian: [
                {
                  type: currencyData.data.form[0].fields[1].group[0].type,
                  key: currencyData.data.form[0].fields[1].group[0].key,
                  value: values.cadinstitition,
                  is_required: 1,
                },
                {
                  type: currencyData.data.form[0].fields[2].group[0].type,
                  key: currencyData.data.form[0].fields[2].group[0].key,
                  value: values.cadtransit,
                  is_required: 1,
                },
                {
                  type: currencyData.data.form[0].fields[3].group[0].type,
                  key: currencyData.data.form[0].fields[3].group[0].key,
                  value: values.cadaccountno,
                  is_required: 1,
                },
                {
                  type: currencyData.data.form[0].fields[4].group[0].type,
                  key: currencyData.data.form[0].fields[4].group[0].key,
                  value: values.accountType,
                  is_required: 1,
                },
              ],
              interac: [
                {
                  type: currencyData.data.form[1].fields[1].group[0].type,
                  key: currencyData.data.form[1].fields[1].group[0].key,
                  value: values.CADEmail,
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
                <CADLocalbank key={index} currencyData={formdata} formik={formik || []} />
              ))[0]}
            </div>
            <div className="col-6">
              {currencyData.data.form.map((formdata, index) => (
                <CADInterac key={index} currencyData={formdata} formik={formik || []} />
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

export default CAD;