const { GraphQLUpload } = require('graphql-upload');
const user = require('./user');
const loan = require('./loan');
const queuer = require('./queuer');
const photo = require('./photo');

// resolvers
const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    users: user.getAllUsers,
    user: user.getUser,
    loan: loan.getLoan,
    loans: loan.getLoans,
    searchLoan: loan.searchLoan,
    waitList: queuer.getWaitList,
    queuer: queuer.getQueuer,
  },
  Mutation: {
    addUser: user.addUser,
    login: user.login,
    addLoan: loan.addLoan,
    reserveLoan: loan.reserveLoan,
    updateLoan: loan.updateLoan,
    returnLoan: loan.returnLoan,
    joinWaitList: queuer.joinWaitList,
    updateQueuer: queuer.updateQueuer,
    removeFromWaitList: queuer.removeFromWaitList,
    uploadPhoto: photo.processPhoto,
  },
};

module.exports = resolvers;
