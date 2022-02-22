// Add Task Component
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TASK } from "../../utils/mutations";
import { QUERY_PROJECT } from "../../utils/queries";

const TaskForm = ({ status, projectId }) => {
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    estimatedHours: "",
  });
  const [inputErrors, setInputErrors] = useState({
    title: "",
  });
  const [submitError, setSubmitError] = useState("");

  const [addTask, { error }] = useMutation(ADD_TASK, {
    update(cache, { data: { addTask } }) {
      try {
        // read project currently in cache
        const { project } = cache.readQuery({
          query: QUERY_PROJECT,
          variables: { id: projectId },
        });
        // add new thought to project's cache
        cache.writeQuery({
          query: QUERY_PROJECT,
          variables: { id: projectId },
          data: {
            project: { ...project, tasks: [...project.tasks, addTask] },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  // validate single input and return appropriate validation message
  const validateInput = (inputName, inputValue) => {
    if (inputName === "title" && !inputValue.length) {
      return "Please provide a title for your task.";
    }
  };

  // get validation message for single input and display to user
  const updateInputError = (e) => {
    const validationMessage = validateInput(e.target.name, e.target.value);
    setInputErrors({ ...inputErrors, [e.target.name]: validationMessage });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // create object to hold error messages for all inputs
    const updatedInputErrors = {};
    // create variable to indicate if there are input errors
    let inputErrorsExists;

    // loop through each input to validate and retrieve validation msg
    for (let input in inputValues) {
      const errorMsg = validateInput(input, inputValues[input]);
      if (errorMsg) {
        updatedInputErrors[input] = errorMsg;
        inputErrorsExists = true;
      } else {
        updatedInputErrors[input] = "";
      }
    }

    // after running validation on all inputs, update inputErrors state
    setInputErrors({ ...inputErrors, ...updatedInputErrors });

    // only submit form if there are no input errors
    if (!inputErrorsExists) {
      try {
        // pass form inputs to add task mutation
        await addTask({
          variables: {
            taskInputs: {
              title: inputValues.title,
              description: inputValues.description,
              estimatedHours: inputValues.estimatedHours ? parseFloat(inputValues.estimatedHours) : 0,
              status: status.replace(/ /g, "").toUpperCase(),
              projectId: projectId,
            },
          },
        });
        // clear form
        setInputValues({
          title: "",
          description: "",
          estimatedHours: "",
        });
      } catch (e) {
        setSubmitError("Sorry, something went wrong.");
        console.error(e);
      }
    }
  };

  return (
    <div className="mt-4 mb-3">
      <form className="" onSubmit={handleFormSubmit}>
        <div className="my-2">
          <label htmlFor="title" className="w-100 fw-bold">
            Task Title:
          </label>
          <input
            className="w-100"
            placeholder="New Task"
            name="title"
            type="text"
            id="title"
            value={inputValues.title}
            onChange={handleChange}
            onBlur={updateInputError}
          ></input>
          {inputErrors.title && (
            <p className="form-error-msg">{inputErrors.title}</p>
          )}
        </div>

        <div className="my-1">
          <label htmlFor="description" className="w-100 fw-bold">
            Task Description:
          </label>
          <textarea
            className="w-100"
            placeholder="Task Description"
            name="description"
            type="text"
            id="description"
            value={inputValues.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="estimatedHours" className="w-100 fw-bold">
            Estimated Hours:
          </label>
          <input
            className="w-auto"
            placeholder="1.5"
            name="estimatedHours"
            type="number"
            step="0.01"
            id="estimatedHours"
            value={inputValues.estimatedHours}
            onChange={handleChange}
          ></input>
        </div>

        {submitError && (
          <div className="my-4">
            <p className="form-error-msg fs-6">{submitError}</p>
          </div>
        )}

        <div className="my-1">
          <button className="btn btn-purple text-white fw-bold" type="submit">
            + Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
