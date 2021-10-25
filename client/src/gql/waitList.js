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
    status
    category
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

export const JOIN_WAIT_LIST = gql`
  mutation joinWaitList($queuer: JoinWaitListInput) {
    joinWaitList(queuer: $queuer) {
      ${response}
    }
  }
`;
