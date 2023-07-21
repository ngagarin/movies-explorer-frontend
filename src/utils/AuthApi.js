// const BASE_URL = '/api';
const BASE_URL = 'http://localhost:3000/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

// registration
const signUp = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then(checkResponse);
}

// login
const signIn = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
    .then((data) => {
    localStorage.setItem('jwt', data._id);
    return data;
  })
    .then(checkResponse)
}

// logout
const logOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((data) => {
    localStorage.removeItem('jwt');
    return data;
  })
    .then(checkResponse)
}

const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(checkResponse);
}

export {signUp, signIn, logOut, checkToken};
