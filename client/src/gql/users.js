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
