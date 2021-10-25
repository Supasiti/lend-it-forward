import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { SIGNUP } from '../gql/users';
import { useLogging } from '../dependecies/LoggingContext';

// sign user  and save token
export const useSignupUser = () => {
  const [signup, { data, error, loading }] = useMutation(SIGNUP);
  const { login: contextLogin } = useLogging();

  // store the token in localStorage
  useEffect(() => {
    if (data?.addUser) {
      contextLogin(data.addUser);
    }
  }, [data]);

  return [signup, { data, error, loading }];
};
