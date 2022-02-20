//List of all the projects for an individual
//ProjectForm Component
import React, { useState } from 'react';

import { QUERY_ME, QUERY_PROJECT } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../utils/mutations';

const ProjectForm = () => {
    const [projectText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addProject, { error }] = useMutation(ADD_PROJECT, {
        update(cache, { data: { addProject } }) {
            try {
                //Add to the project array cache 
                const { project } = cache.readQuery({ query: QUERY_PROJECT });
                cache.writeQuery({
                    query: QUERY_PROJECT,
                    data: { project: [addProject, ...project] },
                });
            } catch (e) {
                console.error(e);
            }
            //Update the object cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, project: [...me.project, addProject] } },
            });
        },
    });

    //Handle state based on input changes from the form
    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };
    //Form Submission Area
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addProject({
                variables: { projectText },
            });
            //Clear the form value
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p
                className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
            >
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Please add a project."
                    value={projectText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProjectForm;
