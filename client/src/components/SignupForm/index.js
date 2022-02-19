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
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    passwordCheck: false,
  });
  const [submitError, setSubmitError] = useState("");
  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const validateInput = (e) => {
    if (e.target.name === "email") {
      const validEmail = validateEmail(e.target.value);
      validEmail
        ? setInputErrors({ ...inputErrors, email: false })
        : setInputErrors({ ...inputErrors, email: true });
    } else if (e.target.name === "passwordCheck") {
      e.target.name === inputValues.password
        ? setInputErrors({ ...inputErrors, passwordCheck: false })
        : setInputErrors({ ...inputErrors, passwordCheck: true });
    } else {
      e.target.value.length
        ? setInputErrors({ ...inputErrors, [e.target.name]: false })
        : setInputErrors({ ...inputErrors, [e.target.name]: true });
    }
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
            onBlur={validateInput}
          ></input>
          {inputErrors.firstName && (
            <p className="form-error-msg">Please enter your first name.</p>
          )}
        </div>

        <div>
          <input
            placeholder="Your last name"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleInputChange}
            onBlur={validateInput}
          ></input>
          {inputErrors.lastName && (
            <p className="form-error-msg">Please enter your last name.</p>
          )}
        </div>

        <div>
          <input
            placeholder="Your email"
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
            onBlur={validateInput}
          ></input>
          {inputErrors.email && (
            <p className="form-error-msg">Please enter a valid email address.</p>
          )}
        </div>

        <div>
          <input
            placeholder="Password"
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
            onBlur={validateInput}
          ></input>
          {inputErrors.password && (
            <p className="form-error-msg">Please enter a password between 5 and 50 charaters.</p>
          )}
        </div>

        <div>
          <input
            placeholder="Reenter Password"
            name="passwordCheck"
            type="password"
            id="passwordCheck"
            onChange={handleInputChange}
            onBlur={validateInput}
          ></input>
          {inputErrors.passwordCheck && (
            <p className="form-error-msg">Sorry, your passwords don't match.</p>
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
