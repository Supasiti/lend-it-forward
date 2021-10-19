const {
  AuthenticationError,
  UserInputError,
} = require('apollo-server-express');
const services = require('../services');

const getAllUsers = async (parents, args, context) => {
  console.log('getting users');
  const result = await services.user.getAll();
  return result;
};

const addUser = async (parents, args, context) => {
  console.log(args.user);
  const result = await services.user.create(args.user);
  return result;
};

// resolvers
const resolvers = {
  Query: {
    users: getAllUsers,
  },
  Mutation: {
    addUser,
  },
};

module.exports = resolvers;
