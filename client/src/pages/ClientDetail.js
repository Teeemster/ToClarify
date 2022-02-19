//Client detail
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { validateEmail } from "../../utils/helpers";
import { ADD_CLIENT_TO_PROJECT } from "../utils/mutations";

// TODO : Add functionality to add/view clients of a project
// TODO : Return to project button
const ClientDetail = () => {
  const {id: projectId} = useParams();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [addClient] = useMutation(ADD_CLIENT_TO_PROJECT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addClient({
        variables: { projectId: projectId, clientInputs: { ...formState } },
      });

    } catch (e) {
      setErrorMessage("Failed to Add Client.");
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
      <h1>Add/View Client!</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Client first name"
          name="firstName"
          type="text"
          id="firstName"
          onBlur={handleChange}
        ></input>

        <input
          placeholder="Client last name"
          name="lastName"
          type="text"
          id="lastName"
          onBlur={handleChange}
        ></input>

        <input
          placeholder="Client email"
          name="email"
          type="email"
          id="email"
          onBlur={handleChange}
        ></input>

        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}

        <button>Submit</button>
      </form>
      <div>
        <Link to={`/${projectId}`}>
            <button>Return To Project</button>
        </Link>
      </div>
    </section>
  );
};

export default ClientDetail;
