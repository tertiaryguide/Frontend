import Cookies from "js-cookie";

// Get cookie
export const getCookie = (name) => {
  return Cookies.get(name) || null;
};

// Set cookie
export const setCookie = (name, value, days) => {
  Cookies.set(name, value, { expires: days, path: '/' });
};

// Remove cookie
export const removeCookie = (name) => {
  Cookies.remove(name, { path: '/' });
};
