const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

  type Query {
    users: [User]
    user: User
  }

  type Mutation {
    addUser(user: UserData): Auth
    login(data: LoginData): Auth
  }
`;

module.exports = typeDefs;
