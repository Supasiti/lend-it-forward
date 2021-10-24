import gql from 'graphql-tag';

const response = `
  _id
  user {
    _id
    username
    imageUrl
  }
  loan {
    _id
    title
  }
  createdAt
  contact
  selected
`;
export const GET_WAIT_LIST = gql`
  query waitList($filter: WaitListFilterInput) {
    waitList(filter: $filter) {
      ${response}
    }
  }
`;

export const GET_QUEUER = gql`
  query getQueuer($id: ID) {
    getQueuer(id: $id) {
      ${response}
    }
  }
`;
