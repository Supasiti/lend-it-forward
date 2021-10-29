import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { useLoan } from '../dependencies/LoanContext';
import { RESERVE_LOAN } from '../gql/loans';

// use to reserve a loan for a borrower
export const useReserveLoan = () => {
  const [error, setError] = useState('');
  const [newLoan, setNewLoan] = useState(null);
  const [execMutation, { data, loading }] = useMutation(RESERVE_LOAN);
  const { updateLoan: updateLoanContext } = useLoan();

  useEffect(() => {
    if (data?.reserveLoan) {
      setNewLoan(data.reserveLoan);
      updateLoanContext(data.reserveLoan, 'own');
    }
  }, [data]);

  // for easier usage
  // expect : {_id, reservedFor}
  // allow reservedFor : ID or { _id }
  const reserveLoan = async (input) => {
    const { _id, reservedFor } = input;
    const borrowerId = '_id' in reservedFor ? reservedFor._id : reservedFor;
    const loanData = { loan: { _id, reservedFor: borrowerId } };

    try {
      await execMutation({ variables: loanData });
    } catch (e) {
      setError(e.message);
    }
  };

  return { reserveLoan, newLoan, error, setError, loading };
};
