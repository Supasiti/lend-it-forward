export const validateEmail = (email) => {
  const regex = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return !!password.length;
};

export const validateUsername = (username) => {
  return !!username.length;
};
