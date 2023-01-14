
class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getData() {
    return fetch(
      `${this._baseUrl}/api/ingredients`, {
        headers: this._headers,
      })
      .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://norma.nomoreparties.space',
  headers: {
    'Content-Type': 'application/json',
  }
})

export {api};

