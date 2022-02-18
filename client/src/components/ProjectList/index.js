//List of all the projects for an individual
//Project List Component
import React, { useState } from 'react';

import { QUERY_ME } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../utils/mutations';

const ProjectList = () => {
    const [projectText, setProjectText] = useState('');
    
    //Update Project Cache Array
    const [addProject, { error }] = useMutation(ADD_PROJECT, {
        update(cache, { data: { addProject } }) {
            try {
                const { project } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { project: [addProject, ...project] },
                });
            } catch (e) {
                console.error(e);
            }
            //Update Me Object Cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, project: [...me.task, addProject] } },
            });
        },
    });


    return (
        <section>
            <div>

            </div>
            <button>📍 Add New Project</button>
        </section>
    );
};

export default ProjectList;