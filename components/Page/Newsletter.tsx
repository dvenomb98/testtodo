import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Layout from "../Layout/Layout";
import {
  bgLightSecondary2,
  formErrorText,
  gradientBgUp,
  pinkGradientButtonSecondary,
} from "../Styles/CustomStyles";
import * as Yup from "yup";
import Loader from "../Atoms/Loader";

const Newsletter = () => {
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState <boolean>(false)

  return (
    <div className={gradientBgUp}>
        <div className="bg-[url('/newsletterImg.jpg')] bg-cover rounded-md p-10 py-20 relative text-white">
          <Layout>
            <div className="flex flex-col gap-10 lg:items-center">
          <h1 className="font-bold font-headFamily text-h1 z-40">
            Get notified about new features
          </h1>
          <p className="text-white z-40">
            We are developing lot of a new features, fixing bugs and more!
          </p>

          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email("Invalid email").required("Required"),
            })}
            onSubmit={async (values) => {
              console.log(values)
            }}
            key={"newsletterFormik"}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="flex flex-col md:flex-row gap-2">
                  <Field
                    name="email"
                    className={`p-3 z-40 rounded-md ${bgLightSecondary2} md:w-[400px] border-[0.25px]  ${errors.email && touched.email ? "border-primary-red border-2" : "border-slate-700"}`}
                    placeholder={"Your email"}
                  />

                  <button type="submit" className={`${pinkGradientButtonSecondary} z-40`}>
                    {isSubmitting ? (
                      <Loader loading={isSubmitting} />
                    ) : (
                      "Get notified"
                    )}
                  </button>
                </div>

                
                
              </Form>
            )}
          </Formik>
          <div className="bg-slate-900 absolute inset-0 opacity-30 " />
          </div>
          </Layout>
        </div>
      
    </div>
  );
};

export default Newsletter;
