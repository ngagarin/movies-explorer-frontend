class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
  }

  getAllMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: `https://api.nomoreparties.co`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
