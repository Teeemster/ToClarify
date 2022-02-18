import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($newUser: InputUser!) {
    addUser(newUser: $newUser) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userInputs: InputUser!) {
    updateUser(userInputs: $userInputs) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($password: String!) {
    deleteUser(password: $password) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation AddProject($projectInputs: InputProject!) {
    addProject(projectInputs: $projectInputs) {
      _id
      title
      tasks {
        _id
      }
      owners {
        _id
        firstName
        lastName
        email
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

export const UPDATE_PROJECT_TITLE = gql`
  mutation UpdateProjectTitle($projectId: ID!, $title: String!) {
    updateProjectTitle(projectId: $projectId, title: $title) {
      _id
      title
      tasks {
        _id
      }
      owners {
        _id
        firstName
        lastName
        email
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

export const ADD_CLIENT_TO_PROJECT = gql`
  mutation AddClientToProject($projectId: ID!, $clientInputs: InputUser!) {
    addClientToProject(projectId: $projectId, clientInputs: $clientInputs) {
      _id
      title
      tasks {
        _id
      }
      owners {
        _id
        firstName
        lastName
        email
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

export const DELETE_PROJECT = gql`
  mutation DeleteProject($projectId: ID!) {
    deleteProject(projectId: $projectId) {
      _id
      title
    }
  }
`;
