import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { JOIN_WAIT_LIST } from '../gql/waitList';
import { useLoan } from '../dependecies/LoanContext';

export const useJoinWaitList = () => {
  const [error, setError] = useState('');
  const [newQueuer, setNewQueuer] = useState(null);
  const [execMutation, { data, loading }] = useMutation(JOIN_WAIT_LIST);
  const { updateLoan } = useLoan();

  // update the waiting list
  useEffect(() => {
    if (data?.joinWaitList) {
      setNewQueuer(data.joinWaitList);
      updateLoan(data.joinWaitList.loan, 'pending');
    }
  }, [data]);

  // for easy execution
  // expect : { loan: ID, contact : string}
  const joinWaitList = async (input) => {
    const queuerInput = { queuer: { ...input } };
    try {
      await execMutation({ variables: queuerInput });
    } catch (e) {
      setError(e.message);
    }
  };

  return { joinWaitList, newQueuer, error, setError, loading };
};
