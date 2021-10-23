import { useMutation } from '@apollo/client';

import { RESERVE_LOAN } from '../gql/loans';

// use to reserve a loan for a borrower
const useReserveLoan = () => {
  const [execMutation, { data, error, loading }] = useMutation(RESERVE_LOAN);

  const reserveLoan = (input) => {
    const loanData = { loan: { ...input } };
    execMutation({ variables: loanData });
  };

  return { reserveLoan, data, error, loading };
};

export default useReserveLoan;
