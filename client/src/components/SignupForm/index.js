// Signup Component
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { validateEmail } from "../../utils/helpers";

const SignupForm = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [addUser] = useMutation(ADD_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // pass form inputs to signup mutation and retrieve token
      const { data } = await addUser({
        variables: { newUser: { ...formState } },
      });
      console.log(data);
      // save token to local storage
      Auth.login(data.addUser.token);
    } catch (e) {
      setErrorMessage("Signup failed.");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setErrorMessage("This is not a valid email.");
      } else {
        setFormState({ ...formState, email: e.target.value });
        setErrorMessage("");
      }
    }
    if (!e.target.value.length) {
      setErrorMessage(`${e.target.placeholder} is required.`);
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
      setErrorMessage("");
    }
  };

  return (
    <section>
      <h1>Sign-Up!</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your first name"
          name="firstName"
          type="text"
          id="firstName"
          onBlur={handleChange}
        ></input>

        <input
          placeholder="Your last name"
          name="lastName"
          type="text"
          id="lastName"
          onBlur={handleChange}
        ></input>

        <input
          placeholder="Your email"
          name="email"
          type="email"
          id="email"
          onBlur={handleChange}
        ></input>

        <input
          placeholder="Password"
          name="password"
          type="password"
          id="password"
          onBlur={handleChange}
        ></input>

        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}

        <button>Submit</button>
      </form>
    </section>
  );
};

export default SignupForm;
