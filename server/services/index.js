const user = require('./user');
const auth = require('./auth');
const loan = require('./loan');
const queuer = require('./queuer');
const reserveLoan = require('./reserveLoan');
const returnLoan = require('./returnLoan');

module.exports = {
  user,
  auth,
  loan,
  queuer,
  reserveLoan,
  returnLoan,
};
