const { gql } = require('apollo-server-express');
const user = require('./user');
const loan = require('./loan');

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const typeDefs = [root, user, loan];

module.exports = typeDefs;
