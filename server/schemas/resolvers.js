import { User, Project, Task, Comment, LoggedTime } from "../models";
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
    task: async (_, { _id }, context) => {
      return await Task.findById(_id).populate("comments").populate("timeLog");
    },
  },
  Mutation: {
    // add user
    // update user
    // delete user
    // add project
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
