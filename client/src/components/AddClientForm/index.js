// Signup Component
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT_TO_PROJECT } from "../../utils/mutations";
import { validateEmail } from "../../utils/helpers";

const AddClientForm = ({ projectId }) => {
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
  const [addClient] = useMutation(ADD_CLIENT_TO_PROJECT);

  const handleInputChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  // validate input and return appropriate validation message
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
        return "Please reenter the password.";
      } else if (inputValue !== inputValues.password) {
        return "Sorry, the passwords don't match.";
      }
    } else {
      if (!inputValue.length) {
        return `Please provide a ${inputName
          .split(/(?=[A-Z])/)
          .join(" ")
          .toLowerCase()}.`;
      }
    }
  };

  // get validation message for individual input and display to user
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

    // only submit form if there are no input errors
    if (!inputErrorsExists) {
      try {
        // pass form inputs to signup mutation and retrieve token
        const { data } = await addClient({
          variables: {
            projectId: projectId,
            clientInputs: {
              firstName: inputValues.firstName,
              lastName: inputValues.lastName,
              email: inputValues.email,
              password: inputValues.password,
            },
          },
        });
      } catch (e) {
        setSubmitError("Sorry, something went wrong.");
      }
    }
  };

  return (
    <div className="col col-sm-8 col-md-6 col-xl-4">
      <form onSubmit={handleSubmit} className="fs-5">
        <div className="my-3">
          <label htmlFor="firstName" className="w-100">
            First Name:
          </label>
          <input
            className="w-100"
            placeholder="Client's first name"
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
          <label htmlFor="lastName" className="w-100">
            Last Name:
          </label>
          <input
            className="w-100"
            placeholder="Client's last name"
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
          <label htmlFor="email" className="w-100">
            Email:
          </label>
          <input
            className="w-100"
            placeholder="Client's email"
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
          <label htmlFor="password" className="w-100">
            Password:
          </label>
          <input
            className="w-100"
            placeholder="Set a password for your client"
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
          <label htmlFor="passwordCheck" className="w-100">
            Reenter Password:
          </label>
          <input
            className="w-100"
            placeholder="Reenter the password"
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
          <button className="btn btn-purple text-white fw-bold">Add Client</button>
        </div>
      </form>
    </div>
  );
};

export default AddClientForm;
