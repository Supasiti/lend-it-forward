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
    const data = { user: context.user._id, ...args.queuer };
    return services.queuer.update(data);
  }
  throw new AuthenticationError('you must be logged in');
};

const removeFromWaitList = async (parent, args, context) => {
  if (context.user) {
    const data = { user: context.user._id, ...args.queuer };
    const deletedQueuer = await services.queuer.remove(data);
    if (!deletedQueuer) {
      return {
        success: false,
        _id: null,
      };
    } else {
      return {
        success: true,
        _id: deletedQueuer._id,
      };
    }
  }
  throw new AuthenticationError('you must be logged in');
};

const getQueuer = async (parent, args, context) => {
  if (context.user) {
    return services.queuer.getOne(args);
  }
  throw new AuthenticationError('you must be logged in');
};

module.exports = {
  getQueuer,
  joinWaitList,
  getWaitList,
  updateQueuer,
  removeFromWaitList,
};
