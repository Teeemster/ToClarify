// Login Component
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { validateEmail } from "../../utils/helpers";

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { email, password } = formState;
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // pass form inputs to login mutation and retrieve token
      const { data } = await login({
        variables: { ...formState },
      });
      // save token to localStorage
      Auth.login(data.login.token);
    } catch (e) {
      setErrorMessage("Login failed.");
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
      <h1>Sign-In!</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your email"
          name="Email"
          type="email"
          id="email"
          defaultValue={email}
          onBlur={handleChange}
        ></input>

        <input
          placeholder="Password"
          name="Password"
          type="password"
          id="password"
          defaultValue={password}
          onBlur={handleChange}
        ></input>

        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}

        {/* {error && (
          <div>
            <p className="error-text">{error}</p>
          </div>
        )} */}

        <button>Login</button>
      </form>
    </section>
  );
};

export default LoginForm;
