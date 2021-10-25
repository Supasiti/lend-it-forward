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
    reservedFor: Queuer
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
    holder: ID
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

  input SearchInput {
    owner: String
  }

  extend type Query {
    loans(filter: LoanFilterInput): [Loan]
    loan(_id: ID): Loan
    searchLoan(search: SearchInput): [Loan]
  }

  extend type Mutation {
    addLoan(loan: AddLoanInput): Loan
    updateLoan(loan: UpdateLoanInput): Loan
    reserveLoan(loan: ReserveLoanInput): Loan
    returnLoan(_id: ID): Loan
  }
`;

module.exports = loan;
