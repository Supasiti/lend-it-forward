import decode from 'jwt-decode';

const getProfile = () => {
  return decode(getToken());
};

const isLoggedIn = () => {
  // Checks if there is a saved token and it's still valid
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

const isTokenExpired = (token) => {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
};

const getToken = () => {
  // Retrieves the user token from localStorage
  return localStorage.getItem('id_token');
};

const login = (idToken) => {
  // Saves user token to localStorage
  localStorage.setItem('id_token', idToken);
  window.location.assign('/library');
};

const logout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem('id_token');
  // this will reload the page and reset the state of the application
  window.location.assign('/');
};

const auth = {
  isLoggedIn,
  getProfile,
  isTokenExpired,
  getToken,
  login,
  logout,
};

export default auth;
