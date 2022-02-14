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
        owner: String
        tasks: [Task]
        clients: [String]
    },
    type Task {
        _id: ID!
        title: String!
        description: String
        status: String
        estimatedHours: String
        timeLog: [LoggedTime]
        totalTime: String
        comments: [Comment]
    },
    type LoggedTime {
        _id: ID!
        description: String
        date: String
        hours: Int
    },
    type Comment {
        _id: ID!
        body: String!
        user: User
    },
    type Auth {
        token: ID!
        user: User
    },
    type Query {

    },
    type Mutation {
        
    }
`;

module.exports = typeDefs;