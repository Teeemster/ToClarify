// Login Component
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { validateEmail } from "../../utils/helpers";

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [login] = useMutation(LOGIN_USER);

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
      console.log(e);
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
      <h1>Sign-In!</h1>
      <form onSubmit={handleSubmit}>
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
