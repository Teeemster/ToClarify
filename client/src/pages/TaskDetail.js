//Task detail
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { QUERY_TASK } from "../utils/queries";
import { UPDATE_TASK } from "../utils/mutations";
import CommentList from "../components/CommentList";
import TimeLog from "../components/TimeLog";

// TODO double check InputTask variables requirements when updating task on both handle submit functions

const TaskDetail = () => {
  // get task id
  const { id: taskId } = useParams();

  // set up toggle for description elements
  const [descriptionToggle, setDescriptionToggle] = useState(true);
  // set up state for description
  const [descriptionValue, setDescriptionValue] = useState({
    description: "",
  });

  // set up toggle for status elements
  const [statusToggle, setStatusToggle] = useState(true);
  // set up state for status
  const [statusValue, setStatusValue] = useState({
    status: "",
  });

  // import updateTask mutation
  const [updateTask] = useMutation(UPDATE_TASK);

  // query the current task by id
  const { loading, data } = useQuery(QUERY_TASK, {
    variables: { id: taskId },
  });

  // set current task data to task
  const task = data?.task || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  // when status dropdown is changed set the status value
  const handleStatusChange = (e) => {
    setStatusValue(e.target.value);
  };

  // when status dropdown is clicked out of set toggle back to original state and update task
  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    setStatusToggle(true);

    try {
      // eslint-disable-next-line
      const { data } = await updateTask({
        variables: {
          taskInputs: { statusValue },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // when description textarea is changed set the description value
  const handleDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  // when description textarea is clicked out of set toggle back to original state and update task
  const handleDescriptionSubmit = async (e) => {
    e.preventDefault();
    setDescriptionToggle(true);

    try {
      // eslint-disable-next-line
      const { data } = await updateTask({
        variables: {
          taskInputs: { descriptionValue },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2>
            {task.project.title} : {task.title}
          </h2>
          <p>
            <b>Status:</b>
          </p>
          {statusToggle ? (
            <span
              onClick={() => {
                setStatusToggle(false);
              }}
            >
              {task.status}
            </span>
          ) : (
            <form onBlur={handleStatusSubmit}>
              <input list="task-status" onChange={handleStatusChange}>
                <datalist id="task-status">
                  <option value="REQUESTED">REQUESTED</option>
                  <option value="INPROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </datalist>
              </input>
            </form>
          )}
          <p>
            <b>Hours:</b> {task.totalHours} / {task.estimatedHours}
          </p>
        </div>
        <div>
          <p>
            <b>Description</b>
          </p>
          {descriptionToggle ? (
            <p
              onClick={() => {
                setDescriptionToggle(false);
              }}
            >
              {task.description}
            </p>
          ) : (
            <form onBlur={handleDescriptionSubmit}>
              <textarea
                id="description"
                name="description"
                rows="5"
                cols="33"
                onChange={handleDescriptionChange}
              >
                {task.description}
              </textarea>
            </form>
          )}
        </div>
        <CommentList />
      </div>
      <div>
        <Link to={`/${task.project.projectId}`}>
          <button>Back To Project</button>
        </Link>
        <TimeLog />
      </div>
    </div>
  );
};

export default TaskDetail;
