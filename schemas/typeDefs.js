const { gql } = require("apollo-server-express");

// TO DO:
// verify required fields
// should enum options be capitalized?
// should formatted time be int or string?
// verify mutation end points

const typeDefs = gql`
    type User {
        _id: ID!
        type: UserType
        firstName: String!
        lastName: String!
        email: String!
        projects: [Project]
    },
    enum UserType {
        ADMIN
        CLIENT
    },
    type Project {
        _id: ID!
        title: String!
        owner: User
        tasks: [Task]
        clients: [String]
    },
    type Task {
        _id: ID!
        title: String!
        description: String
        status: TaskStatus
        estimatedHours: String
        timeLog: [LoggedTime]
        totalTime: String
        comments: [Comment]
    },
    enum TaskStatus {
        REQUESTED
        IN-PROGRESS
        COMPLETE
    },
    type LoggedTime {
        _id: ID!
        description: String
        date: String!
        hours: Int!
    },
    type Comment {
        _id: ID!
        body: String!
        user: User
    },
    input InputProject {
        projectId: String!
        title: String!
        owner: User
        tasks: [Task]
        clients: [String]
    },
    input InputTask {
        taskId: String!
        title: String!
        description: String
        status: TaskStatus
        estimatedHours: String
        timeLog: [LoggedTime]
        totalTime: String
        comments: [Comment]
    },
    type Auth {
        token: ID!
        user: User
    },
    type Query {
        me: User
        user(_id: ID!): User
        project(_id: ID!): Project 
        task(_id: ID!, projectId: String!): Task 
    },
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth 
        login(email: String!, password: String!): Auth
        updateUser(username: String!, email: String!, password: String!): User
        deleteUser(userId: ID!, password: String!): User
        addProject(newProject: InputProject!): Project
        updateProject(updateProject: InputProject!): Project
        deleteProject(projectId: ID!): Project
        addTask(newTask: InputTask!): Task
        updateTask(updateTask: InputTask!): Task
        deleteTask(taskId: ID!): Task
        addComment(body: String!): Comment
        deleteComment(commentId: ID!): Comment
        addLoggedTime(description: String!, date: String!, hours: Int!): LoggedTime
        deleteLoggedTime(loggedTimeId: ID!): LoggedTime
    }
`;

module.exports = typeDefs;
