import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { SEARCH_LOAN } from '../gql/loans';
import { useUrlQuery } from '../hooks/useUrlQuery';

// use to reserve a loan for a borrower
export const useSearchLoan = () => {
  const [loans, setLoans] = useState([]);
  const urlQuery = useUrlQuery({ status: 'available' }, ['owner']);
  const variables = { search: urlQuery };

  const { data, error, loading } = useQuery(SEARCH_LOAN, { variables });

  useEffect(() => {
    if (data?.searchLoan?.length) {
      setLoans(data.searchLoan);
    }
  }, [data]);

  return { loans, error, loading };
};
