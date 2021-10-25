import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import auth from '../utils/auth';

export const LoggingContext = React.createContext();

export const useLogging = () => useContext(LoggingContext);

const initialState = {
  user: {},
  isLoggedIn: false,
  expiry: null, // in milliseconds
};

// jsx wrapper
export const LoggingProvider = (props) => {
  const [logging, setLogging] = useState(initialState);
  const [timeoutId, setTimeoutId] = useState(null);
  const history = useHistory();

  // set up a timeout for automatic logout
  useEffect(() => {
    if (logging.isLoggedIn) {
      // clear previous timeout
      if (!timeoutId) window.clearTimeout(timeoutId);

      // will log user out 1 second before expiry
      // to prevent any potential clashes
      const delay = logging.expiry - Date.now() - 1000;
      const newTimeoutId = window.setTimeout(automaticLogout, delay);
      setTimeoutId(newTimeoutId);

      // clean exit - need to clear timeout
      return () => window.clearTimeout(newTimeoutId);
    }
  }, [logging]);

  // check local storage for any decrepency on logging status
  const checkLocalStorage = () => {
    const isLoggedIn = auth.isLoggedIn();
    if (isLoggedIn && !logging.isLoggedIn) {
      const profile = auth.getProfile();
      const newState = {
        user: profile.data,
        isLoggedIn: true,
        expiry: profile.exp * 1000,
      };
      setLogging(newState);
    }

    if (!isLoggedIn && logging.isLoggedIn) {
      logout();
    }
  };

  const clearTimeoutIfExist = () => {
    if (!timeoutId) {
      window.clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  // for logout not initiated by user
  const automaticLogout = () => {
    auth.logout();
    window.alert('Your session expires. Please log in back again.');
    clearTimeoutIfExist();
    history.push('/');
    return setLogging(initialState);
  };

  // expect {token, user}
  const login = ({ token, user }) => {
    auth.login(token);
    const expiry = auth.getExpiry(token);
    const newState = { user, isLoggedIn: true, expiry };
    return setLogging(newState);
  };

  //  user initiated log out
  const logout = () => {
    auth.logout();
    clearTimeoutIfExist();
    history.push('/');
    return setLogging(initialState);
  };

  checkLocalStorage();

  return (
    <LoggingContext.Provider value={{ logging, login, logout }} {...props} />
  );
};
