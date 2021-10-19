const { User } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAll = async () => {
  console.log('getting users');
  const result = await User.find({});
  return result;
};

const getOne = async ({ id, email, username }) => {
  const result = await User.findOne({
    $or: [{ _id: id }, { email }, { username }],
  });
  return result;
};

const create = async ({ username, email, password }) => {
  const encryptedPwd = await bcrypt.hash(password, saltRounds);
  const data = { username, email, password: encryptedPwd };
  const result = await User.create(data);
  return result;
};

const authenticate = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user.toJSON() : null;
};

module.exports = {
  getAll,
  getOne,
  create,
  authenticate,
};
