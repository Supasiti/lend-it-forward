const { gql } = require('apollo-server-express');
const user = require('./user');
const loan = require('./loan');
const queuer = require('./queuer');

const root = gql`
  scalar Upload

  type PhotoResponse {
    message: String
  }
  type Query {
    root: String
  }

  type Mutation {
    root: String
    uploadPhoto(photo: Upload!): PhotoResponse
  }
`;

const typeDefs = [root, user, loan, queuer];

module.exports = typeDefs;
