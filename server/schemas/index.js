const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { auth } = require('../services');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: auth.authMiddleware,
  uploads: false,
});

module.exports = apolloServer;
