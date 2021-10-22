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
    user: ID
    loan: ID
    selected: Boolean
  }

  input JoinWaitListInput {
    loan: ID!
  }

  extend type Query {
    waitList(filter: WaitListFilterInput): [Queuer]
  }

  extend type Mutation {
    joinWaitList(queuer: JoinWaitListInput): Queuer
  }
`;

module.exports = queuer;
