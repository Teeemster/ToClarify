// Signup Component
import React, { useState } from "react";
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
    // try {
    //   // pass form inputs to signup mutation and retrieve token
    //   const { data } = await addUser({
    //     variables: { newUser: { ...formState } },
    //   });
    //   console.log(data);
    //   // save token to local storage
    //   Auth.login(data.addUser.token);
    // } catch (e) {
    //   setErrorMessage("Signup failed.");
    // }
  };

  return (
    <section>
      <h1>Sign-Up!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
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

        <div>
          <input
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

        <div>
          <input
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

        <div>
          <input
            placeholder="Password"
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

        <div>
          <input
            placeholder="Reenter Password"
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
          <div>
            <p className="error-text">{submitError}</p>
          </div>
        )}

        <button>Submit</button>
      </form>
    </section>
  );
};

export default SignupForm;
