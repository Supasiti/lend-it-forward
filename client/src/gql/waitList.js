import gql from 'graphql-tag';

export const GET_WAIT_LIST = gql`
  query waitList($filter: WaitListFilterInput) {
    waitList(filter: $filter) {
      _id
      user {
        username
      }
      loan {
        title
      }
      createdAt
      contact
      selected
    }
  }
`;
