import decode from 'jwt-decode';

const getProfile = () => {
  return decode(getToken());
};

const getToken = () => {
  // Retrieves the user token from localStorage
  return localStorage.getItem('id_token');
};

const getExpiry = (token) => {
  if (token) {
    // if token is passed in
    const decoded = decode(token);
    return decoded.exp * 1000;
  }
  const savedToken = getToken();
  if (savedToken) {
    const decoded = decode(savedToken);
    return decoded.exp * 1000;
  }
  return null;
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

const login = (idToken) => {
  // Saves user token to localStorage
  localStorage.setItem('id_token', idToken);
};

const logout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem('id_token');
};

const auth = {
  isLoggedIn,
  getProfile,
  isTokenExpired,
  getToken,
  getExpiry,
  login,
  logout,
};

export default auth;
