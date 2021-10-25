// will update initial object with new value
// will ignore any key not in initial object

export const updateObject = (oldObj, newObj) => {
  const result = Object.entries(newObj).reduce((acc, [key, value]) => {
    return key in oldObj ? { ...acc, [key]: value } : { ...acc };
  }, oldObj);
  return result;
};

// turn an object with strings as values into url query string
// will not include empty string
export const toUrlQuery = (obj) => {
  const nonEmpties = Object.entries(obj).filter(([, value]) => value !== '');
  const params = nonEmpties.map(([key, value]) => {
    const valueStr = value.trim().replace(' ', '%20');
    return `${key}=${valueStr}`;
  });
  return params.join('&');
};
