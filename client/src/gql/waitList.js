import gql from 'graphql-tag';

export const GET_WAIT_LIST = gql`
  query waitList($filter: WaitListFilterInput) {
    waitList(filter: $filter) {
      _id
      user {
        _id
        username
      }
      loan {
        _id
        title
      }
      createdAt
      contact
      selected
    }
  }
`;

export const UPDATE_QUEUER = gql`
  mutation updateQueuer($queuer: UpdateQueuerInput) {
    updateQueuer(queuer: $queuer) {
      _id
    }
  }
`;
