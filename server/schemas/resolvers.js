const userResolvers = require('./userResolvers');

// resolvers
const resolvers = {
  Query: {
    users: userResolvers.getAllUsers,
    user: userResolvers.getUser,
  },
  Mutation: {
    addUser: userResolvers.addUser,
    login: userResolvers.login,
  },
};

module.exports = resolvers;
