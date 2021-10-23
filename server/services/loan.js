const { Loan, Queuer } = require('../models');

const getOne = async ({ _id }) => {
  const result = await Loan.findById(_id).populate([
    'owner',
    'holder',
    'reservedFor',
  ]);
  return result;
};

const create = async ({ user, ...loan }) => {
  const data = {
    owner: user,
    holder: user,
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

// update the loan
const updateLoan = async ({ user, _id, ...loan }) => {
  // restrict who can update loan
  const query = {
    $or: [
      { $and: [{ _id }, { owner: user }] },
      { $and: [{ _id }, { holder: user }] },
      { $and: [{ _id }, { reservedFor: user }] },
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

//---------------------------------
// reserve the loan for a borrower

const executeReservation = async (_id, reservedFor, queuer) => {
  const update = { reservedFor, status: 'reserved' };
  queuer.selected = true;

  const promises = [Loan.findByIdAndUpdate(_id, update, { new: true })];
  promises.push(queuer.save());
  await Promise.all(promises);
};

const reserveLoan = async ({ _id, reservedFor }) => {
  // check if not in a wait list
  const queuer = await Queuer.findOne({ loan: _id, user: reservedFor });
  if (!queuer) return null;

  // must reset everyone in waiting list
  await Queuer.updateMany({ loan: _id }, { selected: false });
  await executeReservation(_id, reservedFor, queuer);

  const result = getOne({ _id });
  return result;
};

module.exports = {
  create,
  getOne,
  getByFilter,
  updateLoan,
  reserveLoan,
};
