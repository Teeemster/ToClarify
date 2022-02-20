// Login Component
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

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
  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const validateInput = (inputValue) => {
    if (inputValue.length) {
      return true;
    } else {
      return false;
    }
  };

  const updateInputError = (e) => {
    const validInput = validateInput(e.target.value);
    validInput
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
      const validInput = validateInput(inputValues[input]);
      if (validInput) {
        updatedInputErrors[input] = false;
      } else {
        updatedInputErrors[input] = true;
        inputErrorsExists = true;
      }
    }

    // after running validation on all inputs, update inputErrors state in one function call
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
            onBlur={updateInputError}
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
            onBlur={updateInputError}
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
