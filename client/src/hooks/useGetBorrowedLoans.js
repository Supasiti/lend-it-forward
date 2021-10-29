import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { useLoan } from '../dependencies/LoanContext';
import { useLogging } from '../dependencies/LoggingContext';
import { GET_LOANS } from '../gql/loans';

export const useGetBorrowedLoans = () => {
  const [error, setError] = useState('');
  const { globalLoans, setLoans } = useLoan();
  const { logging } = useLogging();
  const { data, loading } = useQuery(GET_LOANS, {
    variables: { filter: { holder: logging?.user._id } },
    pollInterval: 10000,
  });
  const loans = globalLoans.borrow;

  // get more details loan
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
