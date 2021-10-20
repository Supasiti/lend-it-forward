const { gql } = require('apollo-server-express');

const loan = gql`
  type Loan {
    _id: ID!
    title: String
    description: String
    cateogory: String
    imageUrl: String
    isAvailable: Boolean!
    owner: User
    currentLocation: User
    reservedFor: User
  }

  input addLoanInput {
    title: String
    description: String
    cateogory: String
  }

  extend type Mutation {
    addLoan(loan: addLoanInput): Loan
  }
`;

module.exports = loan;
