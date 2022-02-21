//List of all the projects for an individual
//ProjectForm Component
import React, { useState } from "react";

import { QUERY_MY_PROJECTS } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../../utils/mutations";

const ProjectForm = () => {
  const [projectText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      try {
        // read what's currently in the cache
        const data = cache.readQuery({ query: QUERY_MY_PROJECTS });
        // if cache contains projects, add new project to array
        if (data) {
          const { myProjects } = data;
          cache.writeQuery({
            query: QUERY_MY_PROJECTS,
            data: { myProjects: [...myProjects, addProject] },
          });
        } else {
          // else, add new project
          cache.writeQuery({
            query: QUERY_MY_PROJECTS,
            data: { myProjects: [addProject] },
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
  });

  //Handle state based on input changes from the form
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
  //Form Submission Area
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addProject({
        variables: { projectInputs: { title: projectText } },
      });
      //Clear the form value
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        {/* Character Count: {characterCount}/280 */}
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="New Project Title"
          type="text"
          value={projectText}
          className="form-input w-100"
          onChange={handleChange}
        />
        <button className="link link-white bg-grey mt-1 fw-bold" type="submit">
          + Add project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
