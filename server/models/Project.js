//Project Model
import { Schema, model } from 'mongoose';

const projectSchema = new Schema(
    {
        title: {
            type: String,
            required: 'Project must have a title!',
            minlength: 1,
            maxlength: 80
        },
        owner: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task'
            }
        ],
        clients: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
);

const Project = model('Project', projectSchema);

export default Project;