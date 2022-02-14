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
    type InputProject {
        projectId: String!
        title: String!
        owner: User
        tasks: [Task]
        clients: [String]
    },
    type InputTask {
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
        user(username: String!): User
        project(_id: ID!): Project 
        task(_id: ID!): Task 
    },
    type Mutation {
        addUser(username: String!, email: $String, password: String!): Auth 
        login(email: String!, password: String!): Auth
        updateUser(username: String!, email: String!, password: String!): User
        deleteUser(userId: ID!, password: String!): User
        addProject:
        updateProject:
        deleteProject:
        addTask:
        updateTask:
        deleteTask:
        addComment:
        deleteComment:
        addLoggedTime:
        deleteLoggedTime:
    }
`;

module.exports = typeDefs;
