const services = require('../../services');

const getWaitList = async (parent, args, context) => {
  if (context.user) {
    return services.queuer.getByFilter(args);
  }
  throw new AuthenticationError('you must be logged in');
};

const joinWaitList = async (parent, args, context) => {
  if (context.user) {
    const data = { user: context.user._id, ...args.queuer };
    return services.queuer.findOrCreate(data);
  }
  throw new AuthenticationError('you must be logged in');
};

const updateQueuer = async (parent, args, context) => {
  if (context.user) {
    console.log(context.user);
    const data = { user: context.user._id, ...args.queuer };
    return services.queuer.update(data);
  }
  throw new AuthenticationError('you must be logged in');
};

module.exports = {
  joinWaitList,
  getWaitList,
  updateQueuer,
};
