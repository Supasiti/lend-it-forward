const { Loan } = require('../models');

// expect { owner : string }
const searchLoan = async ({ status, owner }) => {
  // owner is passed in
  if (owner) {
    const result = await Loan.find({ status })
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
  }

  // owner is not passed
  const result = await Loan.find({ status })
    .populate(['owner', 'holder'])
    .populate({
      path: 'reservedFor',
      populate: { path: 'user' },
    });
  return result;
};

module.exports = searchLoan;
