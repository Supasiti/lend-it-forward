const { gql } = require('apollo-server-express');

const queuer = gql`
  type Queuer {
    _id: ID!
    user: User
    loan: Loan
    createdAt: String
    contact: String
    selected: Boolean
  }

  input WaitListFilterInput {
    _id: ID
    user: ID
    loan: ID
    selected: Boolean
  }

  input JoinWaitListInput {
    loan: ID!
  }

  input UpdateQueuerInput {
    _id: ID!
    selected: Boolean
    contact: String
  }

  extend type Query {
    waitList(filter: WaitListFilterInput): [Queuer]
  }

  extend type Mutation {
    joinWaitList(queuer: JoinWaitListInput): Queuer
    updateQueuer(queuer: UpdateQueuerInput): Queuer
  }
`;

module.exports = queuer;
