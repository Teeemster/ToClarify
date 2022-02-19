// Login Component
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { validateEmail } from "../../utils/helpers";

const LoginForm = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState({
    email: false,
    password: false,
  });
  const [submitError, setSubmitError] = useState("");
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const validateInput = (e) => {
    e.target.value.length
      ? setInputErrors({ ...inputErrors, [e.target.name]: false })
      : setInputErrors({ ...inputErrors, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create object to hold error values for all inputs
    const updatedInputErrors = {};
    // create variable to indicate if there are input errors
    let inputErrorsExists;

    // loop through each input and validate
    for (let input in inputValues) {
      if (!inputValues[input].length) {
        updatedInputErrors[input] = true;
        inputErrorsExists = true;
      } else {
        updatedInputErrors[input] = false;
      }
    }

    // after running validation on inputs, update inputErrors state in one function call
    setInputErrors({ ...inputErrors, ...updatedInputErrors });

    // check if there are input errors before continuing
    if (!inputErrorsExists) {
      try {
        // pass inputs to login mutation, retrieving token
        const { data } = await login({
          variables: { ...inputValues },
        });
        // save token to localStorage
        Auth.login(data.login.token);
      } catch (e) {
        setSubmitError(e.message);
      }
    }
  };

  return (
    <section>
      <h1>Sign-In!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Your email"
            name="email"
            type="email"
            id="email"
            defaultValue={inputValues.email}
            onChange={handleInputChange}
            onBlur={validateInput}
          ></input>
          {inputErrors.email && (
            <p className="form-error-msg">Please enter your email address.</p>
          )}
        </div>

        <div>
          <input
            placeholder="Password"
            name="password"
            type="password"
            id="password"
            defaultValue={inputValues.password}
            onChange={handleInputChange}
            onBlur={validateInput}
          ></input>
          {inputErrors.password && (
            <p className="form-error-msg">Please enter your password.</p>
          )}
        </div>

        {submitError && (
          <div>
            <p className="error-text">{submitError}</p>
          </div>
        )}

        <button>Login</button>
      </form>
    </section>
  );
};

export default LoginForm;
