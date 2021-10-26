import { useLogging } from '../dependecies/LoggingContext';

export const redirectIfNotLoggedIn = () => {
  const { logging } = useLogging();
  if (!logging.isLoggedIn) {
    window.location.replace('/');
  }
};
