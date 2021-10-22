const { gql } = require('apollo-server-express');
const user = require('./user');
const loan = require('./loan');
const queuer = require('./queuer');

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const typeDefs = [root, user, loan, queuer];

module.exports = typeDefs;
