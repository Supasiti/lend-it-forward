import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_WAIT_LIST } from '../gql/waitList';

//  get the waiting list filtered by optional criteria
export const useGetWaitList = () => {
  const [error, setError] = useState('');
  const [waitList, setWaitList] = useState([]);
  const [execQuery, { data, loading }] = useLazyQuery(GET_WAIT_LIST, {
    pollInterval: 10000,
    fetchPolicy: 'no-cache',
  });

  // set waiting list
  useEffect(() => {
    if (data?.waitList.length) {
      setWaitList(data.waitList);
    }
  }, [data]);

  // for executing lazy query
  // expect {loan : Id }
  const getWaitList = (input) => {
    const filter = { filter: { ...input } };
    try {
      execQuery({
        variables: filter,
      });
    } catch (e) {
      setError(e.message);
    }
  };

  return { waitList, getWaitList, error, loading, setError };
};
