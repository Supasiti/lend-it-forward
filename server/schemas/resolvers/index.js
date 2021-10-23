const user = require('./user');
const loan = require('./loan');
const queuer = require('./queuer');

// resolvers
const resolvers = {
  Query: {
    users: user.getAllUsers,
    user: user.getUser,
    loan: loan.getLoan,
    loans: loan.getLoans,
    waitList: queuer.getWaitList,
  },
  Mutation: {
    addUser: user.addUser,
    login: user.login,
    addLoan: loan.addLoan,
    updateLoan: loan.updateLoan,
    joinWaitList: queuer.joinWaitList,
    updateQueuer: queuer.updateQueuer,
    removeFromWaitList: queuer.removeFromWaitList,
  },
};

module.exports = resolvers;
