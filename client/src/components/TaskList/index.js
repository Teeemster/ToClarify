import React from "react";
import { Link } from "react-router-dom";
import TaskForm from "../TaskForm";
import { formatHours } from "../../utils/helpers";

const TaskList = ({ tasks, status, projectId }) => {
  let color = "white";
  if (status === "Requested") {
    color = "orange";
  } else if (status === "In Progress") {
    color = "green";
  }

  const filteredTasks = tasks.filter(
    (task) => task.status === status.replace(/ /g, "").toUpperCase()
  );

  return (
    <div>
      <h3 className={`fs-4 fw-bold text-${color}`}>{status}</h3>
      {!filteredTasks.length ? (
        <p>Nothing {status.toLowerCase()}.</p>
      ) : (
        <div>
          {filteredTasks.map((task) => (
            <div key={task._id} className="card bg-purple text-white p-0 my-3">
              <Link
              to={`/project/${projectId}/task/${task._id}`}
              className="d-inline-block p-3">
                <h4 className="fs-5 fw-bold">{task.title}</h4>
                <p className="mt-2 mb-0 fst-italic">{formatHours(task.totalHours)} of {formatHours(task.estimatedHours)} estimated hours complete</p>
              </Link>
            </div>
          ))}
        </div>
      )}
      <div>
        <TaskForm status={status} projectId={projectId} />
      </div>
    </div>
  );
};

export default TaskList;
