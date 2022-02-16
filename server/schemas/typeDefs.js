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
        user: User
    },
    input InputProject {
        projectId: String!
        title: String!
        owner: ID!
    },
    input InputTask {
        taskId: String!
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
        addProject(newProject: InputProject!): Project
        updateProjectTitle(projectId: ID! title: String!): Project
        addClient(projectId: ID!, clientInput: InputUser!): Project
        deleteProject(projectId: ID!): Project
        addTask(newTask: InputTask!, projectId: String!): Task
        updateTask(updatedTask: InputTask!): Task
        deleteTask(taskId: ID!): Task
        addComment(taskId: String!, body: String!): Comment
        deleteComment(commentId: ID!): Comment
        addLoggedTime(taskId: String!, description: String!, date: String!, hours: Int!): LoggedTime
    }
`;

module.exports = typeDefs;
