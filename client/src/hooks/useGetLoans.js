import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useLoan } from '../dependecies/LoanContext';
import { GET_LOANS } from '../gql/loans';
import { useLogging } from '../dependecies/LoggingContext';

// get all loans owned by a user
export const useGetLoans = () => {
  const { globalLoans, setLoans } = useLoan();
  const [execQuery, { data, error, loading }] = useLazyQuery(GET_LOANS);
  const { logging } = useLogging();
  const loans = globalLoans.own;

  // when it is logged otherwise don't do anything
  useEffect(() => {
    if (logging.isLoggedIn) {
      const variables = { filter: { owner: logging.user._id } };
      execQuery({ variables });
    }
  }, [logging]);

  useEffect(() => {
    if (data?.loans?.length) {
      setLoans(data.loans, 'own');
    }
  }, [data]);

  return { loans, loading, error };
};
