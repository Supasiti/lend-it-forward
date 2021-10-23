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
  // expect : {_id, reservedFor}
  // allow reservedFor : ID or { _id }
  const reserveLoan = (input) => {
    const { _id, reservedFor } = input;
    const borrowerId = '_id' in reservedFor ? reservedFor._id : reservedFor;
    const loanData = { loan: { _id, reservedFor: borrowerId } };
    execMutation({ variables: loanData });
  };

  return { reserveLoan, data, error, loading };
};
