import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup"; // import all inside yup
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

export default function Register() {
  let [backError, setBackError] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  async function submitRegister(values) {
    setLoading(true);
    // (values) automaticly recived from onSubmit ==> obj contains values
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        // console.log(err.response.data.message);
        setBackError(err.response.data.message);
        setLoading(false);
      });

    if (data.message === "success") {
      setLoading(false);
      alert("successfully");
      navigate("/login");
    }
  }

  let phoneRegex = /^01[0125][0-9]{8}$/gm;
  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,5}$/;

  let schema = yup.object({
    name: yup
      .string()
      .min(3, "name min length is 3 char")
      .max(10, "name max length is 10 char")
      .required(),
    email: yup
      .string()
      .email("invalid email")
      .required("email is required")
      .matches(emailRegex, "invalid email, exp: name@gmail.com"),
    phone: yup
      .string()
      .matches(phoneRegex, "invalid numebr")
      .required("phone is required"),
    password: yup
      .string()
      .max(15, "password can't be more than 15 char")
      .min(6, "password can't be less than 6 char")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "rePassword must be the same with password")
      .required("rePassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: schema,
    onSubmit: submitRegister,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5">
        <h3 className="text-center bg-main text-white rounded-3 p-2 mb-3 fw-bold text-capitalize">
          Register form
        </h3>
        {backError ? (
          <div className="alert alert-danger p-2" role="alert">
            {backError}
          </div>
        ) : (
          ""
        )}
        <form onSubmit={formik.handleSubmit} /*formik fire when submit*/>
          {/* name input */}
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control my-2"
            id="name" // for label
            name="name" // to determine initial value in formik
            onChange={formik.handleChange} //formik with every change set new value
            onBlur={formik.handleBlur} // formik fire when blur the input
            value={formik.values.name} // formik to can get value and set it in initial
          />
          {/* show error if is existed */}
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.name}
            </div>
          ) : null}

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

          {/* phone input */}
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel" // when open with phone open numbers of phone
            className="form-control my-2"
            id="phone" // for label
            name="phone" // to determine initial value in formik
            onChange={formik.handleChange} //formik with every change set new value
            onBlur={formik.handleBlur} // formik fire when blur the input
            value={formik.values.phone} // formik to can get value and set it in initial
          />
          {/* show error if is existed */}
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.phone}
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

          {/* repassword input */}
          <label htmlFor="repassword">Re-Password:</label>
          <input
            type="password" // when open with password open numbers of password
            className="form-control my-2"
            id="repassword" // for label
            name="rePassword" // to determine initial value in formik
            onChange={formik.handleChange} //formik with every change set new value
            onBlur={formik.handleBlur} // formik fire when blur the input
            value={formik.values.rePassword} // formik to can get value and set it in initial
          />
          {/* show error if is existed */}
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.rePassword}
            </div>
          ) : null}

          <button
            disabled={!(formik.isValid && formik.dirty)}
            className="btn bg-main me-3 text-white"
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
              "Register"
            )}
          </button>
          <Link to="/login">Go To Login</Link>
        </form>
      </div>
    </>
  );
}
