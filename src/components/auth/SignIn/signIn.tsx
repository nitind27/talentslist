"use client";
import { Field, Formik, Form, ErrorMessage } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, getSession, signOut } from "next-auth/react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Session } from "inspector";
import { KTIcon } from "@/_metronic/helpers";

// Validation schema
const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string().required("Password Required"),
});

const SignIn = ({ loginNotCheck = false }: { loginNotCheck?: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-100 container d-flex align-items-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchemaSignIn}
        onSubmit={async (values) => {
          setLoading(true);
          console.log("login form values ", values);

          try {
            const result = await signIn("credentials", {
              email: values.email,
              password: values.password,
              redirect: false,
            });
            console.log("result ", result);

            const session = await getSession();
            if (session?.user.error) {
              console.log("login message", session.user.error);
              toast.error(session.user.error);
              signOut({
                redirect: false,
              });
              return;
            }
            if (session?.user) {
              sessionStorage.setItem("userEmail", session.user.email ?? "");
            }
            console.log("session", session);

            router.push(
              // Boolean(session?.user) ?
              session?.user ? `/dashboard` : "/"
              // : "/"
            );
          } catch (error) {
            console.error("Error in login", error);
            toast.error("Some error occurred. Please try again later.");
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ values }) => (
          <Form className="form w-100 px-20 py-9" id="kt_login_signin_form">
            <div className="text-center mb-11">
              <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>
            </div>
            <div className="fv-row">
              <label className="form-label fs-6 fw-bolder text-gray-900">
                Email
              </label>
              <Field
                name="email"
                values={values.email}
                placeholder="Email address"
                type="email"
                className="form-control mb-3"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="fv-row mb-3">
              <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
                Password
              </label>
              <div className="position-relative">
                <Field
                  name="password"
                  value={values.password}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"} // Toggle type based on state
                  className="form-control mt-3"
                />
                <span
                  className="position-absolute top-50 translate-middle-y cursor-pointer"
                  style={{ right: "10px" }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <KTIcon
                      iconName="eye-slash"
                      iconType="duotone"
                      className="fs-2"
                    />
                  ) : (
                    <KTIcon
                      iconName="eye"
                      iconType="duotone"
                      className="fs-2"
                    />
                  )}{" "}
                  {/* Toggle icon */}
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
              <div />
              <Link href="/forgot_password" className="text-blue">
                Forgot Password ?
              </Link>
            </div>
            <div className="d-grid mb-10">
              <button
                type="submit"
                className="btn bg-blue text-white"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
            <div className="text-gray-500 text-center fw-semibold fs-6">
              Not a Member yet?{" "}
              <Link href="/register" className="ms-2 text-blue">
                Sign up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
