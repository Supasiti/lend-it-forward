import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../gql/users';
import { useLogging } from '../dependecies/LoggingContext';

// log in user and save token
export const useLoginUser = () => {
  const [error, setError] = useState('');
  const [execMutation, { data, loading }] = useMutation(LOGIN);
  const { login: contextLogin } = useLogging();

  // save to localStorage
  useEffect(() => {
    if (data?.login) {
      contextLogin(data.login);
    }
  }, [data]);

  // expect { username, password  }
  const login = async (input) => {
    const loginInput = { variables: { data: { ...input } } };
    try {
      await execMutation(loginInput);
    } catch (e) {
      setError(e.message);
    }
  };

  return [login, { data, error, setError, loading }];
};
