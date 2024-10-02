import * as Yup from "yup";

const validationSchema = [
  Yup.object().shape({
    title: Yup.string().required("Service title is required"),
    type: Yup.string().required("Location type is required"),
    parent_skills_id: Yup.mixed().required("Parent skill is required"),
    child_skills_ids: Yup.mixed().required("Child skill ID is required"),
    duration: Yup.mixed().required("Duration is required"),
    // .positive('Duration must be positive').integer('Duration must be an integer'),
    // offering: Yup.object().shape({
    //   // Example validation for offering keys
    //   // Modify as per your actual data structure
    //   // Assuming each key is a string with required constraint
    //   ...Object.keys(values.offering).reduce((acc, key) => ({
    //     ...acc,
    //     [key]: Yup.string().required('Offering description is required'),
    //   }), {}),
    // }),
    // require: Yup.object().shape({
    //   // Example validation for require keys
    //   // Modify as per your actual data structure
    //   // Assuming each key is a string with required constraint
    //   ...Object.keys(values.require).reduce((acc, key) => ({
    //     ...acc,
    //     [key]: Yup.string().required('Requirement description is required'),
    //   }), {}),
    // }),
  }),
  Yup.object().shape({
    price: Yup.number().required("Price is required"),
    advanced_payment: Yup.number()
      .required("Advanced payment is required")
      .max(100, "Advanced payment cannot be more than 100"),
    // discount_from: Yup.string().required('Discount start date is required'),
    // discount_to: Yup.string().required('Discount end date is required'),
    discount: Yup.number()
      .required("Discount is required")
      .max(100, "Discount cannot be more than 100"),
    discount_from: Yup.date()
      .required("Discount start date is required")
      .nullable(),
    discount_to: Yup.date()
      .required("Discount end date is required")
      .nullable(),
    discounts: Yup.number()
      .max(100, "Discount cannot be more than 100")
      .nullable(),
  }),
];
export { validationSchema };
