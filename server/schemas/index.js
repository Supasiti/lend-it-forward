const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { auth } = require('../services');

module.exports = {
  typeDefs,
  resolvers,
  context: auth.authMiddleware,
};
