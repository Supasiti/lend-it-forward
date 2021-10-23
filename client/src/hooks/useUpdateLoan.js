import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import { useLoan } from '../dependecies/LoanContext';
import { UPDATE_LOAN } from '../gql/loans';

export const useUpdateLoan = () => {
  const [updateLoan, { data, error, loading }] = useMutation(UPDATE_LOAN);
  const { updateLoan: updateLoanContext } = useLoan();

  useEffect(() => {
    if (data?.updateLoan) {
      updateLoanContext(data.updateLoan);
    }
  }, [data]);

  return [updateLoan, { data, error, loading }];
};
