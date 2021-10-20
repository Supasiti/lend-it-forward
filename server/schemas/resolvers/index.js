const user = require('./user');
const loan = require('./loan');

// resolvers
const resolvers = {
  Query: {
    users: user.getAllUsers,
    user: user.getUser,
    loan: loan.getLoan,
    loans: loan.getLoans,
  },
  Mutation: {
    addUser: user.addUser,
    login: user.login,
    addLoan: loan.addLoan,
    updateLoan: loan.updateLoan,
  },
};

module.exports = resolvers;
