const user = require('./user');
const auth = require('./auth');
const loan = require('./loan');
const queuer = require('./queuer');
const reserveLoan = require('./reserveLoan');
const returnLoan = require('./returnLoan');
const searchLoan = require('./searchLoan');
const processImage = require('./processImage');

module.exports = {
  user,
  auth,
  loan,
  queuer,
  reserveLoan,
  returnLoan,
  searchLoan,
  processImage,
};
