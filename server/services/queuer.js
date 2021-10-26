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

// allow to join the waiting list only once
const updateOrCreate = async ({ user, loan, contact }) => {
  const result = await Queuer.findOneAndUpdate(
    { user, loan }, 
    { user, loan, contact, selected: false }, 
    {new: true, upsert: true }
  ).populate([ 'user','loan']);
  return result;
};

// update

const isBorrower = (user, queuer) => (queuer.user.toString() === user);
const isLender = (user, queuer) => (
  queuer.loan.owner.toString()  = user
);

const updateIfBorrower = async (args, queuerToUpdate) => {
  queuerToUpdate.contact = args.contact;
  await queuerToUpdate.save();
  const result = getOne(args);
  return result;
};

const updateIfLender = async (args, queuerToUpdate) => {
  queuerToUpdate.selected = args.selected;
  await queuerToUpdate.save();
  const result = getOne(args);
  return result;
};

// expect {_id, user, contact, selected }
const update = async (args) => {
  // make sure that the user has access to it
  const queuerToUpdate = await Queuer.findById(args._id).populate('loan');
  if (!queuerToUpdate) return null;

  // borrower - can update contact info
  if (isBorrower(args.user, queuerToUpdate)) {
    return updateIfBorrower(args, queuerToUpdate);
  }

  // lender - can update selected
  if (isLender(args.user, queuerToUpdate)) {
    return updateIfLender(args, queuerToUpdate);
  }

  return null;
};


// delete 
const remove = async ({ user, _id }) => {
  const queuerToRemove = await Queuer.findById(_id).populate('loan');
  if (!queuerToRemove) return null;

  if (isBorrower(user, queuerToRemove) || isLender(user, queuerToRemove)) {
    const result = await Queuer.findByIdAndRemove(_id);
    return result;
  }

  return null
}

module.exports = {
  getByFilter,
  getOne,
  updateOrCreate,
  update,
  remove
};
