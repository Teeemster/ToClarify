//List of all the projects for an individual
//TaskForm Component
import React, { useState } from "react";

import { QUERY_TASK } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_TASK } from "../../utils/mutations";

const TaskForm = () => {
    const [taskTitle, setText] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [estimatedHours, setTaskEstimatedHours] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);

    const [addTask, { error }] = useMutation(ADD_TASK, {
        update(cache, { data: { addTask } }) {
            try {
                // read what's currently in the cache
                const data = cache.readQuery({ query: QUERY_TASK });
                // if cache contains projects, add new project to array
                if (data) {
                    const { myTasks } = data;
                    cache.writeQuery({
                        query: QUERY_TASK,
                        data: { myTasks: [...myTasks, addTask] },
                    });
                } else {
                    // else, add new project
                    cache.writeQuery({
                        query: QUERY_TASK,
                        data: { myTasks: [addTask] },
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
            setTaskDescription(event.target.value);
            setTaskEstimatedHours(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };
    //Form Submission Area
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addTask({
                variables: { taskInputs: { title: taskTitle}, taskDescriptions: {description: taskDescription}, estimatedTaskHours: {hours: estimatedHours} }
            });
            //Clear the form value
            setText("");
            setTaskDescription("");
            setTaskEstimatedHours(0);
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
                    placeholder="Task Title"
                    type="text"
                    value={taskTitle}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                />
                <input
                    placeholder="Task Description"
                    type="text"
                    value={taskDescription}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                />
                <input
                    placeholder="Estimated Hours"
                    type="text"
                    value={estimatedHours}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                />
                <button className="" type="submit">
                    + Add a Task
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
