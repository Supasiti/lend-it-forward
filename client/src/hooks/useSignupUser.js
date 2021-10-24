import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { SIGNUP } from '../gql/users';
import auth from '../utils/auth';

// sign user  and save token
export const useSignupUser = () => {
  const [signup, { data, error, loading }] = useMutation(SIGNUP);

  // store the token in localStorage
  useEffect(() => {
    if (data?.addUser) {
      const token = data.addUser.token;
      auth.login(token);
    }
  }, [data]);

  return [signup, { data, error, loading }];
};
