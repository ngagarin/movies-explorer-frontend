// const BASE_URL = '/api';
const BASE_URL = "http://localhost:3000/api";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((data) => {
      throw new Error(data.message || "Произошла неизвестная ошибка");
    });
  }
};

// registration
const signUp = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
};

// login
const signIn = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      return data;
    })
    .then(checkResponse);
};

// logout
const logOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "POST",
    credentials: "include",
  })
    .then((data) => {
      localStorage.removeItem("jwt");
      localStorage.clear();
      return data;
    })
    .then(checkResponse);
};

const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export { signUp, signIn, logOut, checkToken };
