const { Message } = require('../models');

const getOne = async ({ _id }) => {
  const result = await Message.findById(_id).pupolate(['from', 'to', 'loan']);
  return result;
};

const getByFilter = async ({ filter = {} }) => {
  const result = await Message.find(filter).pupolate(['from', 'to', 'loan']);
  return result;
};

const create = async ({ userId, ...message }) => {
  const data = {
    from: userId,
    ...message,
  };
  const newMessage = await Message.create(data);
  const result = await getOne(newMessage);
  return result;
};

module.exports = {
  getByFilter,
  getOne,
  create,
};
