//Task detail
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { QUERY_TASK } from "../utils/queries";
import { UPDATE_TASK } from "../utils/mutations";
import CommentList from "../components/CommentList";
import TimeLog from "../components/TimeLog";

// TODO create dropdown for changing task status
// TODO have span style change for task.status
// TODO create javascript for status change
// TODO ask if we need all of InputTask for updateTask variables

const TaskDetail = () => {
  const { id: taskId } = useParams();

  const [toggle, setToggle] = useState(true);
  const [descriptionValue, setDescriptionValue] = useState({
    description: "",
  });

  const [updateTask] = useMutation(UPDATE_TASK);

  const { loading, data } = useQuery(QUERY_TASK, {
    variables: { id: taskId },
  });

  const task = data?.task || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  const handleDescriptionSubmit = async (e) => {
    e.preventDefault();
    setToggle(true);

    try {
      // eslint-disable-next-line
      const { data } = await updateTask({
        variables: {
          InputTask: {
            _id: task.id,
            title: task.title,
            status: task.status,
            description: descriptionValue,
            estimatedHours: task.estimatedHours,
            totalHours: task.totalHours,
            timeLog: task.timeLog,
            comments: task.comments,
            createdAt: task.createdAt,
          },
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
            <b>Status:</b> <span>{task.status}</span>
          </p>
          <p>
            <b>Hours:</b> {task.totalHours} / {task.estimatedHours}
          </p>
        </div>
        <div>
          <p>
            <b>Description</b>
          </p>
          {toggle ? (
            <p
              onClick={() => {
                setToggle(false);
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
