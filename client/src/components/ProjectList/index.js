import React from 'react';

const ProjectList = ({ project, title }) => {
    if (!project.length) {
        return <h3>No Projects Yet</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {project &&
                project.map(project => (
                    <div key={project._id} className="card mb-3">
                        <p className="card-header">
                                {project.title}
                        </p>
                    </div>
                ))}
        </div>
    );
};

export default ProjectList;
