import { User, Project, Task, Comment, LoggedTime } from "../models";
// TO-DO: Import Auth functions for login mutation
import { AuthenticationError } from "apollo-server-express";

const resolvers = {
  Query: {
    // get current user
    me: async (_, __, context) => {
      if (context.user) {
        const currentUserData = await User.findById(context.user._id)
          .select("-__v, -password")
          .populate("projects");
        return currentUserData;
      }
      throw new AuthenticationError("Not logged in.");
    },
    // get single project by id
    project: async (_, { _id }, context) => {
      // confirm a user is logged
      if (context.user) {
        // get current user data
        const currentUserData = await User.findById(context.user._id).select(
          "projects"
        );
        // check if current user has access to queried project
        if (currentUserData.projects.includes(_id)) {
          return await Project.findById(_id)
            .populate("tasks")
            .populate("clients");
        }
        throw new AuthenticationError("Project not found for current user.");
      }
      throw new AuthenticationError("Not logged in.");
    },
    // get single task by id
    task: async (_, { projectId, _id }, context) => {
      // confirm a user is logged
      if (context.user) {
        // get current user data
        const currentUserData = await User.findById(context.user._id).select(
          "projects"
        );
        // get queried project data
        const queriedProjectData = await Project.findById(projectId).select(
          "tasks"
        );
        // check if current user has access to queried project
        // AND check if queried task belongs to queried project
        if (
          currentUserData.projects.includes(projectId) &&
          queriedProjectData.tasks.includes(_id)
        ) {
          return await Task.findById(_id)
            .populate("comments")
            .populate("timeLog");
        }
        throw new AuthenticationError(
          "Task not found for current user or project."
        );
      }
      throw new AuthenticationError("Not logged in.");
    },
  },
  Mutation: {
    // add user
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // login user
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email: email });
      if (!user) throw new AuthenticationError("Incorrect login credentials.");
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw)
        throw new AuthenticationError("Incorrect login credentials.");
      const token = signToken(user);
      return { token, user };
    },
    // update current user
    updateUser: async (_, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
          runValidators: true,
        });
      }
      throw new AuthenticationError("Not logged in.");
    },
    // delete current user (password required)
    deleteUser: async (_, { password }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const correctPw = await user.isCorrectPassword(password);
        if (correctPw) {
          return await User.findByIdAndDelete(user._id);
        }
        throw new AuthenticationError("Incorrect password.");
      }
      throw new AuthenticationError("Not logged in.");
    },
    // add project
    addProject: async (_, args, context) => {
      if (context.user) {
        // create project
        const newProject = await Project.create({
          ...args,
          owner: context.user._id,
        });
        // add to user's projects
        await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { projects: newProject._id } },
          { new: true }
        );
        // return new project
        return newProject;
      }
      throw new AuthenticationError("You must be logged in to add a project.");
    },
    // update project
    // delete project
    // add task
    // update task
    // delete task
    // add comment
    // delete comment
    // add logged time
    // delete logged tim
  },
};

export default resolvers;
