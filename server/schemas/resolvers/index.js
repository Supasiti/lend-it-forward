const user = require('./user');
const loan = require('./loan');

// resolvers
const resolvers = {
  Query: {
    users: user.getAllUsers,
    user: user.getUser,
  },
  Mutation: {
    addUser: user.addUser,
    login: user.login,
    addLoan: loan.addLoan,
  },
};

module.exports = resolvers;
