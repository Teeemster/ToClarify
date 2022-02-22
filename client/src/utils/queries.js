import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const QUERY_MY_PROJECTS = gql`
  query MyProjects {
    myProjects {
      _id
      title
    }
  }
`;

export const QUERY_PROJECT = gql`
  query Project($id: ID!) {
    project(_id: $id) {
      _id
      title
      owners {
        _id
        firstName
        lastName
        email
      }
      tasks {
        _id
        title
        status
        estimatedHours
        totalHours
      }
      clients {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const QUERY_TASK = gql`
  query Task($id: ID!) {
    task(_id: $id) {
      _id
      title
      project {
        _id
        title
      }
      status
      description
      estimatedHours
      totalHours
      timeLog {
        _id
        description
        hours
        date
      }
      comments {
        _id
        body
        user {
          firstName
          lastName
        }
        createdAt
      }
    }
  }
`;
