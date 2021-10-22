const user = require('./user');
const loan = require('./loan');
const message = require('./message');

// resolvers
const resolvers = {
  MessageReason: {
    BORROW: 'borrow',
    RETURN: 'return',
    GENERAL: 'general',
  },
  Query: {
    users: user.getAllUsers,
    user: user.getUser,
    loan: loan.getLoan,
    loans: loan.getLoans,
    messages: message.getMessages,
  },
  Mutation: {
    addUser: user.addUser,
    login: user.login,
    addLoan: loan.addLoan,
    updateLoan: loan.updateLoan,
    addMessage: message.addMessage,
  },
};

module.exports = resolvers;
