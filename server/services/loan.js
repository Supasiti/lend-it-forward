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

//---------------------------------
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

// check if not in a wait list
// check if owner is the owner of loan
// return null or {queuer, loan}
const validateReservation = async ({ _id, owner, reservedFor }) => {
  const promises = [Queuer.findById(reservedFor)];
  promises.push(Loan.findById(_id));
  const [queuer, loan] = await Promise.all(promises);

  if (!queuer) return null;
  if (loan.owner.toString() !== owner) return null;
  return { queuer, loan };
};

// execute reservation
const executeReservation = async (loan, queuer) => {
  loan.reservedFor = queuer._id;
  loan.status = 'reserved';
  queuer.selected = true;

  await Promise.all([loan.save(), queuer.save()]);
};

// expect { owner, _id, reservedFor }
const reserveLoan = async (args) => {
  const validation = await validateReservation(args);
  if (!validation) return null;
  const { queuer, loan } = validation;

  // must reset everyone in waiting list
  await Queuer.updateMany({ loan: loan._id }, { selected: false });
  await executeReservation(loan, queuer);

  const result = getOne(loan);
  return result;
};

module.exports = {
  create,
  getOne,
  getByFilter,
  updateLoan,
  reserveLoan,
};
