import { useMutation } from '@apollo/client';

import { JOIN_WAIT_LIST } from '../gql/waitList';

export const useJoinWaitList = () => {
  const [execMutation, { data, error, loading }] = useMutation(JOIN_WAIT_LIST);

  // might need to s

  // for easy execution
  // expect : { loan: ID, contact : string}
  const joinWaitList = (input) => {
    const queuerInput = { queuer: { ...input } };
    execMutation({ variables: queuerInput });
  };

  return { joinWaitList, data, error, loading };
};
