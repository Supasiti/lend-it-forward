import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { useLoan } from '../dependecies/LoanContext';
import auth from '../utils/auth';
import { GET_LOANS } from '../gql/loans';

// get all loans owned by a user
export const useGetLoans = () => {
  const { globalLoans, setLoans } = useLoan();
  const profile = auth.getProfile();
  const loans = globalLoans.own;

  const variables = { filter: { owner: profile.data._id } };
  const { data, loading, error } = useQuery(GET_LOANS, { variables });

  useEffect(() => {
    if (data?.loans?.length) {
      setLoans(data.loans, 'own');
    }
  }, [data]);

  return { loans, loading, error };
};
