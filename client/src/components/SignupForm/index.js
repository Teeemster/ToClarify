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
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState)
    try {
      // pass form inputs to signup mutation and retrieve token
      const { data } = await addUser({
        variables: { newUser: { ...formState } },
      });
      // save token to local storage
      Auth.login(data.addUser.token);
    } catch (e) {
      setErrorMessage("Signup failed.");
      console.log(e);
      console.log(error)
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setErrorMessage("This is not a valid email.");
      } else {
        setErrorMessage("");
      }
    } else {
      if (!e.target.value.length) {
        setErrorMessage(`${e.target.name} is required.`);
      } else {
        setErrorMessage("");
      }
    }
    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
      console.log("Handle Form", formState);
    }
  };

  return (
    <section>
      <h1>Sign-Up!</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your First Name"
          name="firstName"
          type="text"
          id="firstName"
          defaultValue={formState.firstName}
          onBlur={handleChange}
        ></input>

        <input
          placeholder="Your Last Name"
          name="lastName"
          type="text"
          id="lastName"
          defaultValue={formState.lastName}
          onBlur={handleChange}
        ></input>

        <input
          placeholder="Your email"
          name="email"
          type="email"
          id="email"
          defaultValue={formState.email}
          onBlur={handleChange}
        ></input>

        <input
          placeholder="Password"
          name="password"
          type="password"
          id="password"
          defaultValue={formState.password}
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
