import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { useLoan } from '../dependencies/LoanContext';
import { ADD_LOAN } from '../gql/loans';

// create a new loan for other to borrow

export const useAddLoan = () => {
  const [error, setError] = useState('');
  const [execMutation, { data, loading }] = useMutation(ADD_LOAN);
  const { updateLoan: updateLoanContext } = useLoan();

  // add loan to the loan context
  useEffect(() => {
    if (data?.addLoan) {
      updateLoanContext(data.addLoan, 'own');
    }
  }, [data]);

  // expect { title, description, category  }
  const addLoan = async (input) => {
    const addLoanInput = { variables: { loan: { ...input } } };
    try {
      await execMutation(addLoanInput);
    } catch (e) {
      setError(e.message);
    }
  };

  return { addLoan, data, error, setError, loading };
};
