import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($data: LoginData) {
    login(data: $data) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation addUser($user: UserData) {
    addUser(user: $user) {
      token
      user {
        _id
        username
      }
    }
  }
`;
