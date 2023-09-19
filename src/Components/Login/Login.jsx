import React, { useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup"; // import all inside yup
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

export default function Login() {
  let [backError, setBackError] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  async function submitLogin(values) {
    setLoading(true);
    // (values) automaticly recived from onSubmit ==> obj contains values
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        // console.log(err.response.data.message);
        setBackError(err.response.data.message);
        setLoading(false);
      });

    if (data.message === "success") {
      setLoading(false);
      alert("successfully");
      navigate("/");
    }
  }

  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,5}$/;

  let schema = yup.object({
    email: yup
      .string()
      .email("invalid email")
      .required("email is required")
      .matches(emailRegex, "invalid email, exp: name@gmail.com"),
    password: yup
      .string()
      .max(15, "password can't be more than 15 char")
      .min(6, "password can't be less than 6 char")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: submitLogin,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5">
        <h3 className="text-center bg-main text-white rounded-3 p-2 mb-3 fw-bold text-capitalize">
          Login form
        </h3>
        {backError ? (
          <div className="alert alert-danger p-2" role="alert">
            {backError}
          </div>
        ) : (
          ""
        )}
        <form onSubmit={formik.handleSubmit} /*formik fire when submit*/>

          {/* email input */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control my-2"
            id="email" // for label
            name="email" // to determine initial value in formik
            onChange={formik.handleChange} //formik with every change set new value
            onBlur={formik.handleBlur} // formik fire when blur the input
            value={formik.values.email} // formik to can get value and set it in initial
          />
          {/* show error if is existed */}
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.email}
            </div>
          ) : null}


          {/* password input */}
          <label htmlFor="password">Password:</label>
          <input
            type="password" // when open with password open numbers of password
            className="form-control my-2"
            id="password" // for label
            name="password" // to determine initial value in formik
            onChange={formik.handleChange} //formik with every change set new value
            onBlur={formik.handleBlur} // formik fire when blur the input
            value={formik.values.password} // formik to can get value and set it in initial
          />
          {/* show error if is existed */}
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.password}
            </div>
          ) : null}

          <button
            disabled={!(formik.isValid && formik.dirty)}
            className="btn bg-main text-white me-3"
            type="submit"
          >
            {loading ? (
              <RotatingLines
                strokeColor="#fff"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />
            ) : (
              "Login" 
            )}
          </button>
          <Link to="/register">Go To Register</Link>
        </form>
      </div>
    </>
  );
}
