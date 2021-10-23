import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import { useLoan } from '../dependecies/LoanContext';
import { ADD_LOAN } from '../gql/loans';

// create a new loan for other to borrow

export const useAddLoan = () => {
  const [addLoan, { data, error, loading }] = useMutation(ADD_LOAN);
  const { addLoan: addLoanContext } = useLoan();

  useEffect(() => {
    if (data?.addLoan) {
      addLoanContext(data.addLoan);
    }
  }, [data]);

  return [addLoan, { data, error, loading }];
};
