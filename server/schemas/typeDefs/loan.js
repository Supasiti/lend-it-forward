const { gql } = require('apollo-server-express');

const loan = gql`
  type Loan {
    _id: ID!
    title: String
    description: String
    category: String
    imageUrl: String
    isAvailable: Boolean!
    owner: User
    holder: User
    reservedFor: User
  }

  input AddLoanInput {
    title: String
    description: String
    category: String
  }

  input LoanFilterInput {
    _id: ID
    title: String
    category: String
    isAvailable: Boolean
    owner: ID
    location: String
    reservedFor: ID
  }

  input UpdateLoanInput {
    _id: ID
    title: String
    description: String
    category: String
    isAvailable: Boolean
    holder: ID
    reservedFor: ID
  }

  extend type Query {
    loans(filter: LoanFilterInput): [Loan]
    loan(_id: ID): Loan
  }

  extend type Mutation {
    addLoan(loan: AddLoanInput): Loan
    updateLoan(loan: UpdateLoanInput): Loan
  }
`;

module.exports = loan;
