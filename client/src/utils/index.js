// Get the query params off the window's URL
export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

// Higher-order function for async/await error handling
export const catchErrors = fn => {
  return function(...args) {
    return fn(...args).catch(err => {
      console.error(err);
    });
  };
};

// Add something to localstorage
export const cache = (key, value) => window.localStorage.setItem(key, value);

// Pull something off of localstorage
export const cached = key => window.localStorage.getItem(key);
