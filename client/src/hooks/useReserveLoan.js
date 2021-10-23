import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import { useLoan } from '../dependecies/LoanContext';
import { RESERVE_LOAN } from '../gql/loans';

// use to reserve a loan for a borrower
export const useReserveLoan = () => {
  const [execMutation, { data, error, loading }] = useMutation(RESERVE_LOAN);
  const { updateLoan: updateLoanContext } = useLoan();

  useEffect(() => {
    if (data?.reserveLoan) {
      updateLoanContext(data.reserveLoan);
    }
  }, [data]);

  // for easier usage
  const reserveLoan = (input) => {
    const loanData = { loan: { ...input } };
    execMutation({ variables: loanData });
  };

  return { reserveLoan, data, error, loading };
};
