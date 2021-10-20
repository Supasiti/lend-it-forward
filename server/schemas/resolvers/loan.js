const services = require('../../services');

const addLoan = async (parent, args, context) => {
  if (context.user) {
    console.log(args);
    const data = { userId: context.user._id, ...args.loan };
    return services.loan.create(data);
  }
  throw new AuthenticationError('you must be logged in');
};

module.exports = {
  addLoan,
};
