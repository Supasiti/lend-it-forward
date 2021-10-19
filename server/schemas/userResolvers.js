const {
  AuthenticationError,
  UserInputError,
} = require('apollo-server-express');
const services = require('../services');

const getAllUsers = async (parents, args, context) => {
  const result = await services.user.getAll();
  return result;
};

// add user
const addUser = async (parents, args, context) => {
  const user = await services.user.create(args.user);
  const token = services.auth.signToken(user);
  return { token, user };
};

// get user
const getUser = async (parent, args, context) => {
  if (context.user) {
    return services.users.getOne({ _id: context.user._id });
  }
  throw new AuthenticationError('you must be logged in');
};

// log user in
const login = async (parent, args, context) => {
  const user = await services.user.authenticate(args.data);
  if (!user) {
    throw new UserInputError('User or password is incorrect');
  }
  const token = services.auth.signToken(user);
  return { token, user };
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  login,
};
