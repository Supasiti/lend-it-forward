const { Loan } = require('../models');
const { getOne } = require('./loan');

// expect { owner : string }
const searchLoan = async ({ owner }) => {
  const result = await Loan.find()
    .populate({
      path: 'owner',
      match: { username: { $regex: `.*${owner}.*`, $options: 'i' } },
    })
    .populate('holder')
    .populate({
      path: 'reservedFor',
      populate: { path: 'user' },
    });
  return result;
};

module.exports = searchLoan;
