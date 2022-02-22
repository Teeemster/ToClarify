// Task Detail Page
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { QUERY_TASK } from "../../utils/queries";
import { UPDATE_TASK } from "../../utils/mutations";
import CommentFeed from "../CommentFeed";
import TimeLog from "../TimeLog";

import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { formatHours } from "../../utils/helpers";

// TODO double check InputTask variables requirements when updating task on both handle submit functions

const TaskDetail = () => {
  // get task id
  const { taskId } = useParams();

  // query task by id
  const { loading, data } = useQuery(QUERY_TASK, {
    variables: { id: taskId },
  });

  const task = data?.task || {};

  // import updateTask mutation
  const [updateTask] = useMutation(UPDATE_TASK);

  // set up toggle for description elements
  const [descriptionToggle, setDescriptionToggle] = useState(true);
  // set up state for description
  const [descriptionValue, setDescriptionValue] = useState({
    description: "",
  });

  // when status dropdown is clicked out of set toggle back to original state and update task
  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    try {
      await updateTask({
        variables: {
          taskInputs: {
            taskId: task._id,
            status: e.target.value,
          },
        },
      });
    } catch (e) {
      console.error(e);
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

  if (loading) {
    return (
      <div className="m-4">
        <h2>Loading...</h2>
      </div>
    );
  }

  let statusColor = "white";
  let statusName = "Complete";
  if (task.status === "REQUESTED") {
    statusColor = "orange";
    statusName = "Requested";
  } else if (task.status === "INPROGRESS") {
    statusColor = "green";
    statusName = "In Progress";
  }

  return (
    <div className="m-4">
      <div className="mb-4">
        <h2 className="fw-bold">
          <Link to="/" className="d-inline d-md-none link-white">
            <Icon path={mdiMenu} size={1.5} />
          </Link>{" "}
          <Link to={`/project/${task.project._id}`} className="link-white">
            {task.project.title}
          </Link>
          {" > "}
          {task.title}
        </h2>
      </div>
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="mx-2">
            <div className="row">
              <div className="col-12 col-sm-5">
                <h5 className="float-start fw-bold fs-5">Status:</h5>
                <form
                  className="float-start ms-2"
                  onChange={handleStatusSubmit}
                >
                  <select
                    className={`bg-dark-grey text-${statusColor} border-0 fs-5 fw-bold`}
                  >
                    {task.status === "REQUESTED" && (
                      <>
                        <option selected value="REQUESTED">
                          Requested
                        </option>
                        <option value="INPROGRESS">In Progress</option>
                        <option value="COMPLETE">Complete</option>
                      </>
                    )}
                    {task.status === "INPROGRESS" && (
                      <>
                        <option value="REQUESTED">Requested</option>
                        <option selected value="INPROGRESS">
                          In Progress
                        </option>
                        <option value="COMPLETE">Complete</option>
                      </>
                    )}
                    {task.status === "COMPLETE" && (
                      <>
                        <option value="REQUESTED">Requested</option>
                        <option value="INPROGRESS">In Progress</option>
                        <option selected value="COMPLETE">
                          Complete
                        </option>
                      </>
                    )}
                  </select>
                </form>
              </div>
              <div className="col-12 col-sm-7">
                <p className="mt-1">
                  <span className="fw-bold">Hours:</span>{" "}
                  {formatHours(task.totalHours)} complete /{" "}
                  {formatHours(task.estimatedHours)} estimated
                </p>
              </div>
            </div>
            <div className="mt-3">
              <h3 className="fw-bold fs-4">Description</h3>
              <p>{task.description}</p>
            </div>
            <div className="my-5">
              <div>
                <h4 className="fw-bold">Comments</h4>
                <CommentFeed comments={task.comments} taskId={task._id} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="mx-2 mb-5">
            <TimeLog
              timeLog={task.timeLog}
              totalHours={task.totalHours}
              taskId={task._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
