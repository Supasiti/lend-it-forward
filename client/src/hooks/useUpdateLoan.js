import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import { useLoan } from '../dependecies/LoanContext';
import { UPDATE_LOAN } from '../gql/loans';

export const useUpdateLoan = () => {
  const [execMutation, { data, error, loading }] = useMutation(UPDATE_LOAN);
  const { updateLoan: updateLoanContext } = useLoan();

  console.log(data);
  useEffect(() => {
    if (data?.updateLoan) {
      updateLoanContext(data.updateLoan);
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
  const updateLoan = (input) => {
    const loanInput = { loan: { ...input } };
    console.log(loanInput);
    execMutation({ variables: loanInput });
  };

  return { updateLoan, data, error, loading };
};
