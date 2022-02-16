const { gql } = require("apollo-server-express");

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
        owners: [User]
        tasks: [Task]
        clients: [User]
    },
    type Task {
        _id: ID!
        projectId: String
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
        INPROGRESS
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
        user: User!
        taskId: String!
        createdAt: String!
    },
    input InputProject {
        title: String!
    },
    input InputTask {
        taskId: String
        projectId: String!
        title: String!
        description: String
        status: TaskStatus
        estimatedHours: String
        totalTime: String
    },
    input InputUser {
        userId: String
        firstName: String!
        lastName: String!
        type: UserType
        email: String!
        password: String!
    },
    type Auth {
        token: ID!
        user: User
    },
    type Query {
        me: User
        user(_id: ID!): User
        project(_id: ID!): Project 
        task(_id: ID!): Task 
    },
    type Mutation {
        addUser(newUser: InputUser!): Auth 
        login(email: String!, password: String!): Auth
        updateUser(updatedUser: InputUser!): User
        deleteUser(password: String!): User
        addProject(projectInputs: InputProject!): Project
        updateProjectTitle(projectId: ID! title: String!): Project
        addClient(projectId: ID!, clientInput: InputUser!): Project
        deleteProject(projectId: ID!): Project
        addTask(taskInputs: InputTask!): Task
        updateTask(updatedTask: InputTask!): Task
        deleteTask(taskId: ID!): Task
        addComment(taskId: String!, body: String!): Task
        deleteComment(commentId: ID!): Comment
        addLoggedTime(taskId: String!, description: String!, date: String!, hours: Int!): LoggedTime
    }
`;

module.exports = typeDefs;
