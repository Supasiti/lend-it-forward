const { gql } = require('apollo-server-express');

const message = gql`
  type Message {
    _id: ID!
    from: User
    to: User
    sentOn: String
    read: Boolean
    loan: Loan
    message: String
    reason: MessageReason
  }

  enum MessageReason {
    BORROW
    RETURN
    GENERAL
  }

  input MessageFilterInput {
    from: ID
    to: ID
    loan: ID
    read: Boolean
  }

  input AddMessageInput {
    to: ID!
    loan: ID!
    message: String!
    reason: MessageReason!
  }

  extend type Query {
    messages(filter: MessageFilterInput): [Message]
  }

  extend type Mutation {
    addMessage(message: AddMessageInput): Message
  }
`;

module.exports = message;
