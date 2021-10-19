require('dotenv').config();
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = process.env.JWT_SECRET;
const expiration = '2h';

// function for our authenticated routes
const authMiddleware = ({ req }) => {
  // allows token to be sent via  req.query or headers
  let token = req.query.token || req.body.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return {};
  }

  // verify token and get user data out of it
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    return { user: data };
  } catch {
    console.log('Invalid token');
    return {};
  }
};

// signtoken
const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = {
  authMiddleware,
  signToken,
};
