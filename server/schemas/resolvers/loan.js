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
    return services.loan.reserveLoan({ owner: context.user._id, ...args.loan });
  }
  throw new AuthenticationError('you must be logged in');
};

module.exports = {
  addLoan,
  getLoan,
  getLoans,
  updateLoan,
  reserveLoan,
};
