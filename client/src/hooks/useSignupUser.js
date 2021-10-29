import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { SIGNUP } from '../gql/users';
import { useLogging } from '../dependencies/LoggingContext';

// sign user  and save token
export const useSignupUser = () => {
  const [error, setError] = useState('');
  const [execMutation, { data, loading }] = useMutation(SIGNUP);
  const { login: contextLogin } = useLogging();

  // store the token in localStorage
  useEffect(() => {
    if (data?.addUser) {
      contextLogin(data.addUser);
    }
  }, [data]);

  // expect { username, email, password  }
  const signup = async (input) => {
    const signupInput = { variables: { user: { ...input } } };
    try {
      await execMutation(signupInput);
    } catch (e) {
      setError(e.message);
    }
  };

  return { signup, data, error, setError, loading };
};
