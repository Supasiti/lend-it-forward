const { Loan, Queuer } = require('../models');
const { getOne } = require('./loan');

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

module.exports = reserveLoan;
