const { gql } = require('apollo-server-express');

const user = gql`
  type User {
    _id: ID
    username: String
    email: String
    location: String
    imageUrl: String
  }

  type Auth {
    token: String
    user: User
  }

  input UserData {
    username: String!
    email: String!
    password: String!
  }

  input LoginData {
    email: String!
    password: String!
  }

  extend type Query {
    users: [User]
    user: User
  }

  extend type Mutation {
    addUser(user: UserData): Auth
    login(data: LoginData): Auth
  }
`;

module.exports = user;
