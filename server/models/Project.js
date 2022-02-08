//Project Model
const { Schema, model } = require('mongoose');


const projectSchema = new Schema(
    {
        Title: {
            type: String,
            required: 'Project must have a title!',
            minlength: 1,
            maxlength: 80
        },
        Owner: {
            type: String,
            enum: ['User', 'Admin'],
            default: 'User',
            required: 'Owner is required!'
        },
        Tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task'
            }
        ],
        Clients: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
);

const Project = model('Project', ProjectSchema);

export default Project;