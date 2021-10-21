import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { useLoan } from '../dependecies/LoanContext';
import auth from '../utils/auth';
import { GET_LOANS } from '../gql/loans';

// get all loans owned by a user
export const useGetLoans = () => {
  const { loans, setLoans } = useLoan();
  const user = auth.getProfile();
  const variables = { filter: { owner: user._id } };
  const { data, loading, error } = useQuery(GET_LOANS, { variables });

  useEffect(() => {
    if (data?.loans?.length) {
      setLoans(data.loans);
    }
  }, [data]);

  return { loans, loading, error };
};
