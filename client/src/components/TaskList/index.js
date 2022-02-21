import React from "react";
import { Link } from "react-router-dom";
import { QUERY_PROJECT } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import TaskForm from "../TaskForm";

const TaskList = () => {
    const { loading, data } = useQuery(QUERY_PROJECT);
    const tasks = data?.tasks || {};

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="m-3">
            <h3 className="fs-4 fw-bold">My Tasks</h3>
            {!tasks.length ? (
                <p className="mt-3">You have no tasks, yet.</p>
            ) : (
                <ul className="list-group list-group-flush">
                    {tasks.map((task) => (
                        <li key={task._id} className="list-group-item bg-grey">
                            <Link to={`/task/${task._id}`}>{task.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-3">
                <TaskForm />
            </div>
        </div>
    );
};

export default TaskList;
