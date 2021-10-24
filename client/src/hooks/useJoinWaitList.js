import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import { JOIN_WAIT_LIST } from '../gql/waitList';
import { useLoan } from '../dependecies/LoanContext';

export const useJoinWaitList = () => {
  const [execMutation, { data, error, loading }] = useMutation(JOIN_WAIT_LIST);
  const { setLoans } = useLoan();

  // update the waiting list
  useEffect(() => {
    if (data?.joinWaitList) {
      setLoans(data.joinWaitList, 'pending');
    }
  }, [data]);

  // for easy execution
  // expect : { loan: ID, contact : string}
  const joinWaitList = (input) => {
    const queuerInput = { queuer: { ...input } };
    execMutation({ variables: queuerInput });
  };

  return { joinWaitList, data, error, loading };
};
