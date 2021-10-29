import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { LEAVE_WAIT_LIST } from '../gql/waitList';
import { useLoan } from '../dependencies/LoanContext';

export const useLeaveWaitList = () => {
  const [error, setError] = useState('');
  const [res, setRes] = useState(null);
  const [execMutation, { data, loading }] = useMutation(LEAVE_WAIT_LIST);
  const { removeLoan } = useLoan();

  // remove from the waiting list if succeed
  useEffect(() => {
    if (data?.removeFromWaitList) {
      const resData = data.removeFromWaitList;
      setRes(resData);
      if (resData.success) {
        removeLoan(resData._id, 'pending');
      }
    }
  }, [data]);

  // for easy execution
  // expect : _id
  const leaveWaitList = async (_id) => {
    const variables = { queuer: { _id } };
    try {
      await execMutation({ variables });
    } catch (e) {
      setError(e.message);
    }
  };

  return { leaveWaitList, res, error, setError, loading };
};
