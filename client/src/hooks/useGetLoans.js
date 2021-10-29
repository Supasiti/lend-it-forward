import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useLoan } from '../dependencies/LoanContext';
import { GET_LOANS } from '../gql/loans';
import { useLogging } from '../dependencies/LoggingContext';

// get all loans owned by a user
export const useGetLoans = () => {
  const [error, setError] = useState('');
  const { globalLoans, setLoans } = useLoan();
  const [execQuery, { data, loading }] = useLazyQuery(GET_LOANS);
  const { logging } = useLogging();
  const loans = globalLoans.own;

  // when it is logged otherwise don't do anything
  useEffect(async () => {
    if (logging.isLoggedIn) {
      const variables = { filter: { owner: logging.user._id } };
      try {
        await execQuery({ variables });
      } catch (e) {
        setError(e.message);
      }
    }
  }, [logging]);

  useEffect(() => {
    if (data?.loans?.length) {
      setLoans(data.loans, 'own');
    }
  }, [data]);

  return { loans, loading, error };
};
