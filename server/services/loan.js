const { Loan } = require('../models');

const getOne = async ({ _id }) => {
  const result = await Loan.findById(_id).populate([
    'owner',
    'currentLocation',
    'locationHistory',
    'reservedFor',
  ]);
  console.log(result);
  return result;
};

const create = async ({ userId, ...loan }) => {
  const data = {
    owner: userId,
    currentLocation: userId,
    locationHistory: [userId],
    ...loan,
  };
  const newLoan = await Loan.create(data);
  const result = await getOne(newLoan);
  return result;
};

module.exports = {
  create,
  getOne,
};
