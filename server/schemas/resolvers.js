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
    project: async (_, { projectId }, context) => {
      // check if a user is logged in
      if (context.user) {
        // get project data
        const projectData = await Project.findById(projectId);
        // check if current user has access to queried project
        if (
          projectData.owner.includes(context.user._id) ||
          projectData.clients.includes(context.user._id)
        ) {
          // return fully populated project data
          return await projectData
            .populate("owners")
            .populate("tasks")
            .populate("clients");
        }
        throw new AuthenticationError("Not authorized.");
      }
      throw new AuthenticationError("Not logged in.");
    },
    // get single task by id
    task: async (_, { taskId }, context) => {
      // check if a user is logged in
      if (context.user) {
        // get task data
        const taskData = await Task.findById(taskId);
        // get parent project's owners and clients
        const projectUsers = await Project.findById(taskData.project).select(
          "owners",
          "clients"
        );
        // check if current user has access to queried task's parent project
        if (
          projectUsers.owners.includes(context.user._id) ||
          projectUsers.clients.includes(context.user._id)
        ) {
          return await taskData.populate("comments").populate("timeLog");
        }
        throw new AuthenticationError("Not authorized.");
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
    // update project title
    updateProjectTitle: async (_, { projectId, title }, context) => {
      // confirm a user is logged in
      if (context.user) {
        // get current user data
        const currentUserData = await User.findById(context.user._id).select(
          "projects type"
        );
        // check if current user is owner of queried project
        if (
          currentUserData.projects.includes(projectId) &&
          currentUserData.type === "Admin"
        ) {
          return await Project.findByIdAndUpdate(projectId, title, {
            new: true,
            runValidators: true,
          });
        }
        throw new AuthenticationError("Not authorized.");
      }
      throw new AuthenticationError("Not logged in.");
    },
    // TO-DO: add client to project
    // delete project (password required)
    deleteProject: async (_, { projectId, password }, context) => {
      // confirm a user is logged in
      if (context.user) {
        // get current user data
        const currentUserData = await User.findById(context.user._id).select(
          "projects type"
        );
        // check if current user is owner of queried project
        if (
          currentUserData.projects.includes(projectId) &&
          currentUserData.type === "Admin"
        ) {
          // check if correct password was provided
          const correctPw = await currentUserData.isCorrectPassword(password);
          if (correctPw) {
            return await Project.findByIdAndDelete(projectId);
          }
          throw new AuthenticationError("Incorrect password.");
        }
        throw new AuthenticationError("Not authorized.");
      }
      throw new AuthenticationError("Not logged in.");
    },
    // add task
    addTask: async (_, args, context) => {
      // confirm a user is logged in
      if (context.user) {
        const { projectId, ...taskInputs } = args;
        // get current user data
        const currentUserData = await User.findById(context.user._id).select(
          "projects type"
        );
        // check if current user has access to queried project
        if (currentUserData.projects.includes(projectId)) {
          // create task, add it to project, then return it
          const newTask = await Task.create(taskInputs);
          await Project.findByIdAndUpdate(projectId, {
            $push: { tasks: newTask._id },
          });
          return newTask;
        }
        throw new AuthenticationError("Not authorized.");
      }
      throw new AuthenticationError("Not logged in.");
    },
    // update task
    updateTask: async (_, args, context) => {
      // confirm a user is logged in
      if (context.user) {
        // destructure args
        const { projectId, taskId, ...taskInputs } = args;
        // get current user data
        const currentUserData = await User.findById(context.user._id).select(
          "projects type"
        );
        // get queried project data
        const queriedProjectData = await Project.findById(projectId).select(
          "tasks"
        );
        // check if current user is owner of queried project
        // AND check if queried task belongs to queried project
        if (
          currentUserData.projects.includes(projectId) &&
          currentUserData.type === "Admin" &&
          queriedProjectData.tasks.includes(taskId)
        ) {
          return Task.findByIdAndUpdate(taskId, taskInputs, {
            new: true,
            runValidators: true,
          });
        }
        throw new AuthenticationError("Not authorized.");
      }
      throw new AuthenticationError("Not logged in.");
    },
    // delete task
    deleteTask: async (_, args, context) => {
      // confirm a user is logged in
      if (context.user) {
        // destructure args
        const { projectId, taskId, ...taskInputs } = args;
        // get current user data
        const currentUserData = await User.findById(context.user._id).select(
          "projects type"
        );
        // get queried project data
        const queriedProjectData = await Project.findById(projectId).select(
          "tasks"
        );
        // check if current user is owner of queried project
        // AND check if queried task belongs to queried project
        if (
          currentUserData.projects.includes(projectId) &&
          currentUserData.type === "Admin" &&
          queriedProjectData.tasks.includes(taskId)
        ) {
          return Task.findByIdAndDelete(taskId);
        }
        throw new AuthenticationError("Not authorized.");
      }
      throw new AuthenticationError("Not logged in.");
    },
    // add comment
    addComment: async (_, { projectId, taskId, commentBody }, context) => {
      // confirm a user is logged in
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
          queriedProjectData.tasks.includes(taskId)
        ) {
          // create comment
          const newComment = Comment.create({
            commentBody: commentBody,
            userId: context.user._id,
          });
          // add comment to task
          await Task.findByIdAndUpdate(
            taskId,
            { $push: { comments: newComment } },
            { new: true, runValidators: true }
          );
        }
        throw new AuthenticationError("Not authorized.");
      }
      throw new AuthenticationError("Not logged in.");
    },
    // delete comment
    deleteComment: async (_, { commentId }, context) => {
      // confirm a user is logged in
      if (context.user) {
        // find comment and confirm it was created by current user
        const comment = Comment.findById(commentId).select("userId");
        if (comment.userId === context.user._id) {
          return Comment.findByIdAndDelete(commentId);
        }
        throw new AuthenticationError("Not authorized.");
      }
      throw new AuthenticationError("Not logged in.");
    },
    // add logged time
    addLoggedTime: async (_, args, context) => {
      // confirm a user is logged in
      if (context.user) {
        // destructure args
        const { projectId, taskId, ...loggedTimeInput } = args;
        // get current user data
        const currentUserData = await User.findById(context.user._id).select(
          "projects type"
        );
        // get queried project data
        const queriedProjectData = await Project.findById(projectId).select(
          "tasks"
        );
        // check if current user is owner of queried project
        // AND check if queried task belongs to queried project
        if (
          currentUserData.projects.includes(projectId) &&
          currentUserData.type === "Admin" &&
          queriedProjectData.tasks.includes(taskId)
        ) {
          // create logged time entry
          const newLoggedTime = LoggedTime.create(loggedTimeInput);
          // add logged time to task
          await Task.findByIdAndUpdate(
            taskId,
            { $push: { timeLog: newLoggedTime } },
            { new: true, runValidators: true }
          );
        }
        throw new AuthenticationError("Not authorized.");
      }
      throw new AuthenticationError("Not logged in.");
    },
    // delete logged time
  },
};

export default resolvers;
