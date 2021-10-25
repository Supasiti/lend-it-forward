import { useLocation } from 'react-router-dom';

export const useUrlQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};
