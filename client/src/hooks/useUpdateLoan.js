import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { useLoan } from '../dependecies/LoanContext';
import { UPDATE_LOAN } from '../gql/loans';

export const useUpdateLoan = () => {
  const [error, setError] = useState('');
  const [newLoan, setNewLoan] = useState(null);
  const [execMutation, { data, loading }] = useMutation(UPDATE_LOAN);
  const { updateLoan: updateLoanContext } = useLoan();

  // update loanContext
  useEffect(() => {
    if (data?.updateLoan) {
      setNewLoan(data.updateLoan);
      updateLoanContext(data.updateLoan, 'own');
    }
  }, [data]);

  // for easy execution
  // expect {
  //   _id: ID!
  //   title: String
  //   description: String
  //   category: String
  //   status: String
  //   holder: ID
  //   reservedFor: ID
  // }
  const updateLoan = async (input) => {
    const loanInput = { loan: { ...input } };
    try {
      await execMutation({ variables: loanInput });
    } catch (e) {
      setError(e.message);
    }
  };

  return { updateLoan, newLoan, error, loading };
};
