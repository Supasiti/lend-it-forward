import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_WAIT_LIST } from '../gql/waitList';

//  get the waiting list filtered by optional criteria
export const useGetWaitList = () => {
  const [waitList, setWaitList] = useState([]);
  const [execQuery, { data, error, loading }] = useLazyQuery(GET_WAIT_LIST);

  // set waiting list
  useEffect(() => {
    if (data?.waitList?.length) {
      setWaitList(data.waitList);
    }
  }, [data]);

  // for executing lazy query
  const getWaitList = (input) => {
    const filter = { filter: { ...input } };
    execQuery({ variables: filter });
  };

  return { waitList, getWaitList, error, loading };
};
