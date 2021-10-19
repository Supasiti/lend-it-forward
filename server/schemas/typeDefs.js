const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    location: String
    imageUrl: String
  }

  input UserData {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(user: UserData): User
  }
`;

module.exports = typeDefs;
