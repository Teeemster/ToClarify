//List of all tasks for an individual project
//Task List Component
import React, { useState } from 'react';

import { QUERY_PROJECT } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../../utils/mutations';

const TaskList = () => {
    const [taskText, setTaskText] = useState('');

    //Update Task Cache Array
    const [addTask, { error }] = useMutation(ADD_TASK, {
        update(cache, { data: { addTask } }) {
            try {
                const { task } = cache.readQuery({ query: QUERY_PROJECT });
                cache.writeQuery({
                    query: QUERY_PROJECT,
                    data: { task: [addTask, ...task] },
                });
            } catch (e) {
                console.error(e);
            }
            //Update Project Object Cache
            const { project } = cache.readQuery({ query: QUERY_PROJECT });
            cache.writeQuery({
                query: QUERY_PROJECT,
                data: { project: { ...project, task: [...project.task, addTask] } },
            });
        },
    });
            



    return (
        <section>
            <div>

            </div>
            <button>📍 Add New Task</button>
        </section>
    );
};

export default TaskList;