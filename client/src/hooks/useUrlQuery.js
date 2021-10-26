import { useLocation } from 'react-router-dom';

const toObject = (urlQuery, keys, init) => {
  const result = keys.reduce((acc, key) => {
    if (urlQuery.get(key)) return { ...acc, [key]: urlQuery.get(key) };
    return { ...acc };
  }, init);
  return result;
};

export const useUrlQuery = (init, keys) => {
  const location = useLocation();
  const SearchParams = new URLSearchParams(location.search);

  const result = toObject(SearchParams, keys, init);
  return result;
};
