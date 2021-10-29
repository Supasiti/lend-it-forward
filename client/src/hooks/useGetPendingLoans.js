import { useEffect } from 'react';

import { useGetWaitList } from './useGetWaitList';
import { useLoan } from '../dependencies/LoanContext';
import { useLogging } from '../dependencies/LoggingContext';

export const useGetPendingLoans = () => {
  const { globalLoans, setLoans } = useLoan();
  const { logging } = useLogging();
  const { waitList, getWaitList, loading } = useGetWaitList();
  const loans = globalLoans.pending;

  console.log(loans);
  // when it is logged
  useEffect(() => {
    if (logging.isLoggedIn) {
      getWaitList({ user: logging.user._id });
    }
  }, [logging]);

  // get more details loan
  // filter out loan that you own
  useEffect(() => {
    if (waitList?.length) {
      const newLoans = waitList.map(({ loan }) => loan);
      const dontHave = newLoans.filter((loan) => {
        return loan.holder._id !== logging.user._id;
      });
      setLoans(dontHave, 'pending');
    }
  }, [waitList]);

  return { loans, loading };
};
