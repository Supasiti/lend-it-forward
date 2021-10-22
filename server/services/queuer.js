const { Queuer } = require('../models');

const getOne = async ({ _id }) => {
  const result = await Queuer.findById(_id).populate(['user', 'loan']);
  return result;
};

const getByFilter = async ({ filter = {} }) => {
  const result = await Queuer.find(filter)
    .populate(['user', 'loan'])
    .sort({ createdAt: 'asc' });
  return result;
};

const create = async ({ user, loan }) => {
  const newQueuer = await Queuer.create({ user, loan });
  const result = await getOne(newQueuer);
  return result;
};

module.exports = {
  getByFilter,
  getOne,
  create,
};
