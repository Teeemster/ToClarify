// Signup Component
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { validateEmail } from "../../utils/helpers";

const SignupForm = () => {
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [inputErrors, setInputErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const validateInput = (inputName, inputValue) => {
    if (inputName === "email") {
      const validEmail = validateEmail(inputValue);
      if (!validEmail) {
        return "Please provide a valid email address.";
      }
    } else if (inputName === "password") {
      if (inputValue.length < 5 || inputValue.length > 50) {
        return "Please choose a password between 5 and 50 characters.";
      }
    } else if (inputName === "passwordCheck") {
      if (!inputValue.length) {
        return "Please reenter your password.";
      } else if (inputValue !== inputValues.password) {
        return "Sorry, your passwords don't match.";
      }
    } else {
      if (!inputValue.length) {
        return `Please provide your ${inputName
          .split(/(?=[A-Z])/)
          .join(" ")
          .toLowerCase()}.`;
      }
    }
  };

  const updateInputError = (e) => {
    const validationMessage = validateInput(e.target.name, e.target.value);
    setInputErrors({ ...inputErrors, [e.target.name]: validationMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create object to hold error messages for all inputs
    const updatedInputErrors = {};
    // create variable to indicate if there are input errors
    let inputErrorsExists;

    // loop through each input to validate and retrieve error msg
    for (let input in inputValues) {
      const errorMsg = validateInput(input, inputValues[input]);
      if (errorMsg) {
        updatedInputErrors[input] = errorMsg;
        inputErrorsExists = true;
      } else {
        updatedInputErrors[input] = "";
      }
    }

    // after running validation on all inputs, update inputErrors state in one function call
    setInputErrors({ ...inputErrors, ...updatedInputErrors });

    if (!inputErrorsExists) {
      try {
        // pass form inputs to signup mutation and retrieve token
        const { data } = await addUser({
          variables: {
            newUser: {
              firstName: inputValues.firstName,
              lastName: inputValues.lastName,
              email: inputValues.email,
              password: inputValues.password,
            },
          },
        });
        // save token to local storage
        Auth.login(data.addUser.token);
      } catch (e) {
        if (e.message.includes("11000")) {
          setSubmitError(
            "Sorry, a user with that email address already exists."
          );
        } else {
          setSubmitError("Sorry, something went wrong.");
        }
      }
    }
  };

  return (
    <div className="col col-sm-8 col-md-6 col-xl-4">
      <h1 className="text-center mb-4 fw-bold">Create an Account</h1>
      <form onSubmit={handleSubmit} className="fs-5">
        <div className="my-3">
          <label for="firstName" className="w-100 fw-bold">
            First Name:
          </label>
          <input
            className="w-100"
            placeholder="Your first name"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleInputChange}
            onBlur={updateInputError}
          ></input>
          {inputErrors.firstName && (
            <p className="form-error-msg">{inputErrors.firstName}</p>
          )}
        </div>

        <div className="my-3">
          <label for="lastName" className="w-100 fw-bold">
            Last Name:
          </label>
          <input
            className="w-100"
            placeholder="Your last name"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleInputChange}
            onBlur={updateInputError}
          ></input>
          {inputErrors.lastName && (
            <p className="form-error-msg">{inputErrors.lastName}</p>
          )}
        </div>

        <div className="my-3">
          <label for="email" className="w-100 fw-bold">
            Email:
          </label>
          <input
            className="w-100"
            placeholder="Your email"
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
            onBlur={updateInputError}
          ></input>
          {inputErrors.email && (
            <p className="form-error-msg">{inputErrors.email}</p>
          )}
        </div>

        <div className="my-3">
          <label for="password" className="w-100 fw-bold">
            Password:
          </label>
          <input
            className="w-100"
            placeholder="Choose a password"
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
            onBlur={updateInputError}
          ></input>
          {inputErrors.password && (
            <p className="form-error-msg">{inputErrors.password}</p>
          )}
        </div>

        <div className="my-3">
          <label for="passwordCheck" className="w-100 fw-bold">
            Reenter Password:
          </label>
          <input
            className="w-100"
            placeholder="Reenter your password"
            name="passwordCheck"
            type="password"
            id="passwordCheck"
            onChange={handleInputChange}
            onBlur={updateInputError}
          ></input>
          {inputErrors.passwordCheck && (
            <p className="form-error-msg">{inputErrors.passwordCheck}</p>
          )}
        </div>

        {submitError && (
          <div className="my-4">
            <p className="form-error-msg fs-6">{submitError}</p>
          </div>
        )}

        <div className="my-4">
          <button className="btn btn-purple text-white fw-bold">
            Sign Up
          </button>
        </div>
      </form>

      <div>
        <p>Already have an account? <Link to="/login">Login here.</Link></p>
      </div>
    </div>
  );
};

export default SignupForm;
