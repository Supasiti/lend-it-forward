import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { useLoan } from '../dependencies/LoanContext';
import { GET_LOANS } from '../gql/loans';
import { useLogging } from '../dependencies/LoggingContext';

// get all loans owned by a user
export const useGetLoans = () => {
  const [error] = useState('');
  const { globalLoans, setLoans } = useLoan();
  const { logging } = useLogging();
  const { data, loading } = useQuery(GET_LOANS, {
    variables: { filter: { owner: logging?.user._id } },
  });
  const loans = globalLoans.own;

  // update loan context when data changes
  useEffect(() => {
    if (data?.loans?.length) {
      setLoans(data.loans, 'own');
    }
  }, [data]);

  return { loans, loading, error };
};
