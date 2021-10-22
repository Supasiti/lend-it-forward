import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../gql/users';
import auth from '../utils/auth';

// log in user and save token
export const useLoginUser = () => {
  const [login, { data, error, loading }] = useMutation(LOGIN);

  useEffect(() => {
    if (data?.login) {
      const token = data.login.token;
      auth.login(token);
    }
  }, [data]);

  return [login, { data, error, loading }];
};
