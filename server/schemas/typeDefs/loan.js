const { gql } = require('apollo-server-express');

const loan = gql`
  type Loan {
    _id: ID!
    title: String
    description: String
    category: String
    imageUrl: String
    status: String
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
    status: String
    owner: ID
    location: String
    reservedFor: ID
  }

  input UpdateLoanInput {
    _id: ID!
    title: String
    description: String
    category: String
    status: String
    holder: ID
    reservedFor: ID
  }

  input ReserveLoanInput {
    _id: ID!
    reservedFor: ID!
  }

  extend type Query {
    loans(filter: LoanFilterInput): [Loan]
    loan(_id: ID): Loan
  }

  extend type Mutation {
    addLoan(loan: AddLoanInput): Loan
    updateLoan(loan: UpdateLoanInput): Loan
    reserveLoan(loan: ReserveLoanInput): Loan
  }
`;

module.exports = loan;
