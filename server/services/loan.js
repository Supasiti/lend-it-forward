const { Loan } = require('../models');

const getOne = async ({ _id }) => {
  const result = await Loan.findById(_id).populate([
    'owner',
    'holder',
    'reservedFor',
  ]);
  return result;
};

const create = async ({ userId, ...loan }) => {
  const data = {
    owner: userId,
    holder: userId,
    ...loan,
  };
  const newLoan = await Loan.create(data);
  const result = await getOne(newLoan);
  return result;
};

const getByFilter = async ({ filter = {} }) => {
  if ('location' in filter) {
    const { location, ...newFilter } = filter;
    const result = await Loan.find(newFilter)
      .populate({
        path: 'holder',
        match: { location: { $eq: location } },
      })
      .populate(['owner', 'reservedFor']);
    return result;
  } else {
    const result = await Loan.find(filter).populate([
      'owner',
      'holder',
      'reservedFor',
    ]);
    return result;
  }
};

const updateLoan = async ({ userId, _id, ...loan }) => {
  // restrict who can update loan
  const query = {
    $or: [
      { $and: [{ _id }, { owner: userId }] },
      { $and: [{ _id }, { holder: userId }] },
      { $and: [{ _id }, { reservedFor: userId }] },
    ],
  };

  const loanToUpdate = await Loan.findOne(query);
  if (!loanToUpdate) return null;

  Object.keys(loan).forEach((key) => {
    loanToUpdate[key] = loan[key];
  });
  await loanToUpdate.save();
  const result = getOne({ _id });
  return result;
};

module.exports = {
  create,
  getOne,
  getByFilter,
  updateLoan,
};
