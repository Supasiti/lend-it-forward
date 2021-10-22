const { gql } = require('apollo-server-express');
const user = require('./user');
const loan = require('./loan');
const message = require('./message');

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const typeDefs = [root, user, loan, message];

module.exports = typeDefs;
