const { Loan, Queuer } = require('../models');
const { getOne } = require('./loan');

//---------------------------------
// return the loan to the owner

// check if owner is the owner of loan
// return null or {loan}
const validateReturn = async ({ _id, owner }) => {
  const loan = await Loan.findById(_id);
  if (loan?.owner.toString() !== owner) return null;
  return { loan };
};

// execute return
const executeReturning = async (loan) => {
  const queuerId = loan.reservedFor;
  const promises = [Queuer.findByIdAndDelete(queuerId)];

  loan.status = 'available';
  loan.reservedFor = null;
  loan.holder = loan.owner;
  promises.push(loan.save());

  await Promise.all(promises);
};

// expect { owner, _id }
const returnLoan = async (args) => {
  const validation = await validateReturn(args);
  if (!validation) return null;
  const { loan } = validation;

  await executeReturning(loan);
  const result = getOne(loan);
  return result;
};

module.exports = returnLoan;
