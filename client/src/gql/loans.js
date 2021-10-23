import gql from 'graphql-tag';

const response = `
  _id
  title
  imageUrl
  description
  status
  category
  owner {
    _id
    username
  }
  holder {
    _id
    username
  }
  reservedFor {
    _id
    username
  }
`;

export const GET_LOAN = gql`
  query getLoan($id: ID) {
    loan(_id: $id) {
      ${response}
    }
  }
`;

export const UPDATE_LOAN = gql`
  mutation updateLoan($loan: UpdateLoanInput) {
    updateLoan(loan: $loan) {
      ${response}
    }
  }
`;

export const GET_LOANS = gql`
  query getLoans($filter: LoanFilterInput) {
    loans(filter: $filter) {
      ${response}
    }
  }
`;

export const ADD_LOAN = gql`
  mutation addLoan($loan: AddLoanInput) {
    addLoan(loan: $loan) {
      ${response}
    }
  }
`;
