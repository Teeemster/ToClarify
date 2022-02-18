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
