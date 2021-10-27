const { gql } = require('apollo-server-express');
const user = require('./user');
const loan = require('./loan');
const queuer = require('./queuer');

const root = gql`
  scalar Upload

  input UploadPhotoInput {
    photo: Upload!
    _id: ID!
    model: String!
  }

  type PhotoResponse {
    success: Boolean
    imageUrl: String
  }
  type Query {
    root: String
  }

  type Mutation {
    root: String
    uploadPhoto(upload: UploadPhotoInput!): PhotoResponse
  }
`;

const typeDefs = [root, user, loan, queuer];

module.exports = typeDefs;
