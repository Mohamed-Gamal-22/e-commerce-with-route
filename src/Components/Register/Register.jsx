import React from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";

export default function Register() {
  function submitRegister(values) {
    // (values) automaticly recived from onSubmit ==> obj contains values
    console.log(values);
  }

  function validate(values) {
    // (values) automaticly recived from onSubmit ==> obj contains values
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validate,
    onSubmit: submitRegister,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5">
        <h3>Register form</h3>
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

          <button className="btn mt-2 bg-main text-white" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
