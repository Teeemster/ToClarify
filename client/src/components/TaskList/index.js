import React from "react";
import { Link } from "react-router-dom";
import TaskForm from "../TaskForm";

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
        <ul>
            {filteredTasks.map(task => (
                <li key={task._id}>
                    <Link to={`/project/${projectId}/task/${task._id}`}>{task.title}</Link>
                </li>
            ))}
        </ul>
      )}
      <div>
        <TaskForm status={status} projectId={projectId} />
      </div>
    </div>
  );
};

export default TaskList;
