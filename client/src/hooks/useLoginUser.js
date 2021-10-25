import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../gql/users';
import { useLogging } from '../dependecies/LoggingContext';

// log in user and save token
export const useLoginUser = () => {
  const [login, { data, error, loading }] = useMutation(LOGIN);
  const { login: contextLogin } = useLogging();

  // save to localStorage
  useEffect(() => {
    if (data?.login) {
      contextLogin(data.login);
    }
  }, [data]);

  return [login, { data, error, loading }];
};
