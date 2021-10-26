import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useLoan } from '../dependecies/LoanContext';
import { useLogging } from '../dependecies/LoggingContext';
import { GET_LOANS } from '../gql/loans';

export const useGetBorrowedLoans = () => {
  const [error, setError] = useState('');
  const { globalLoans, setLoans } = useLoan();
  const { logging } = useLogging();
  const [execQuery, { data, loading }] = useLazyQuery(GET_LOANS);
  const loans = globalLoans.borrow;

  // when it is logged
  useEffect(async () => {
    if (logging.isLoggedIn) {
      const variables = { filter: { holder: logging.user._id } };
      try {
        await execQuery({ variables });
      } catch (e) {
        setError(e.message);
      }
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

  return { loans, loading, error, setError };
};
