import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import { useLoan } from '../dependecies/LoanContext';
import { RETURN_LOAN } from '../gql/loans';

export const useReturnLoan = () => {
  const [execMutation, { data, error, loading }] = useMutation(RETURN_LOAN);
  const { updateLoan: updateLoanContext } = useLoan();

  useEffect(() => {
    if (data?.returnLoan) {
      updateLoanContext(data.returnLoan);
    }
  }, [data]);

  // for easy execution
  // expect : _id: ID
  const returnLoan = (input) => {
    const loanInput = { id: input };
    execMutation({ variables: loanInput });
  };

  return { returnLoan, data, error, loading };
};
