const services = require('../../services');

const addLoan = async (parent, args, context) => {
  if (context.user) {
    const data = { user: context.user._id, ...args.loan };
    return services.loan.create(data);
  }
  throw new AuthenticationError('you must be logged in');
};

const getLoan = async (parent, args, context) => {
  if (context.user) {
    return services.loan.getOne(args);
  }
  throw new AuthenticationError('you must be logged in');
};

const getLoans = async (parent, args, context) => {
  if (context.user) {
    return services.loan.getByFilter(args);
  }
  throw new AuthenticationError('you must be logged in');
};

const updateLoan = async (parent, args, context) => {
  if (context.user) {
    const data = { user: context.user._id, ...args.loan };
    return services.loan.updateLoan(data);
  }
  throw new AuthenticationError('you must be logged in');
};

const reserveLoan = async (parent, args, context) => {
  if (context.user) {
    return services.reserveLoan({ owner: context.user._id, ...args.loan });
  }
  throw new AuthenticationError('you must be logged in');
};

// expect arg = { _id } // loan id
const returnLoan = async (parent, args, context) => {
  if (context.user) {
    const data = { owner: context.user._id, ...args };
    return services.returnLoan(data);
  }
  throw new AuthenticationError('you must be logged in');
};

// expect arg = { search : { owner } }
const searchLoan = async (parent, args, context) => {
  return services.searchLoan({ ...args.search });
};

module.exports = {
  addLoan,
  getLoan,
  getLoans,
  updateLoan,
  reserveLoan,
  returnLoan,
  searchLoan,
};
