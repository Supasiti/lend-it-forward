const services = require('../../services');

const getMessages = async (parent, args, context) => {
  if (context.user) {
    return services.message.getByFilter(args);
  }
  throw new AuthenticationError('you must be logged in');
};

const addMessage = async (parent, args, context) => {
  if (context.user) {
    const data = { userId: context.user._id, ...args.message };
    return services.message.create(data);
  }
  throw new AuthenticationError('you must be logged in');
};

module.exports = {
  getMessages,
  addMessage,
};
