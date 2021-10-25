import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useLoan } from '../dependecies/LoanContext';
import { useLogging } from '../dependecies/LoggingContext';
import { GET_LOANS } from '../gql/loans';

export const useGetBorrowedLoans = () => {
  const { globalLoans, setLoans } = useLoan();
  const { logging } = useLogging();
  const [execQuery, { data, error, loading }] = useLazyQuery(GET_LOANS);
  const loans = globalLoans.borrow;

  // when it is logged
  useEffect(() => {
    if (logging.isLoggedIn) {
      const variables = { filter: { holder: logging.user._id } };
      execQuery({ variables });
    }
  }, [logging]);

  // get more details loand
  useEffect(() => {
    if (data?.loans?.length) {
      const newLoans = data.loans.filter(
        ({ owner }) => owner._id !== logging.user._id,
      );
      setLoans(newLoans, 'borrow');
    }
  }, [data]);

  return { loans, loading, error };
};
