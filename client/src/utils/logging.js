import { useLogging } from '../dependencies/LoggingContext';

export const redirectIfNotLoggedIn = () => {
  const { logging } = useLogging();
  if (!logging.isLoggedIn) {
    window.location.replace('/');
  }
};
