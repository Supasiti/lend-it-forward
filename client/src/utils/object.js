// will update initial object with new value
// will ignore any key not in initial object

export const updateObject = (oldObj, newObj) => {
  const result = Object.entries(newObj).reduce((acc, [key, value]) => {
    return key in oldObj ? { ...acc, [key]: value } : { ...acc };
  }, oldObj);
  return result;
};
