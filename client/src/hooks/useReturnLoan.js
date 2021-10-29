import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { useLoan } from '../dependencies/LoanContext';
import { RETURN_LOAN } from '../gql/loans';

export const useReturnLoan = () => {
  const [error, setError] = useState('');
  const [newLoan, setNewLoan] = useState(null);
  const [execMutation, { data, loading }] = useMutation(RETURN_LOAN);
  const { updateLoan: updateLoanContext } = useLoan();

  useEffect(() => {
    if (data?.returnLoan) {
      setNewLoan(data.returnLoan);
      updateLoanContext(data.returnLoan, 'own');
    }
  }, [data]);

  // for easy execution
  // expect : _id: ID
  const returnLoan = async (input) => {
    const loanInput = { id: input };
    try {
      await execMutation({ variables: loanInput });
    } catch (e) {
      setError(e.message);
    }
  };

  return { returnLoan, newLoan, error, setError, loading };
};
