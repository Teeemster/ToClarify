//User Model
const { Schema, model } = require('mongoose');
const Project = require('./Project')
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            trim: true
        },
        firstname: {
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

//Middleware for password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

//Compares the incoming password to the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

//Virtual that retrieves number of user's projects
UserSchema.virtual('projectCount').get(function () {
    return this.project.length
})

const User = model('User', userSchema);
module.exports = User;
