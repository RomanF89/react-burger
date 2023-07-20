import { getCookie } from "./getCookie";

class Api {
  constructor({ baseUrl, headers }) {
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

  createOrder(ingredients) {
    return fetch(
      `${this._baseUrl}/api/orders`, {
      body: JSON.stringify({ ingredients }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  resetPassword(email) {
    return fetch(
      `${this._baseUrl}/api/password-reset`, {
      body: JSON.stringify({ email }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  createNewPassword(password, token) {
    return fetch(
      `${this._baseUrl}/api/password-reset/reset`, {
      body: JSON.stringify({ password, token }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  registerUser(email, password, name) {
    return fetch(`${this._baseUrl}/api/auth/register`, {
      body: JSON.stringify({ email, password, name }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  loginUser(email, password) {
    return fetch(`${this._baseUrl}/api/auth/login`, {
      body: JSON.stringify({ email, password }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  refreshToken(token) {
    return fetch(`${this._baseUrl}/api/auth/token`, {
      body: JSON.stringify({ token }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  logoutUser(token) {
    return fetch(`${this._baseUrl}/api/auth/logout`, {
      body: JSON.stringify({ token }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  getUser() {
    const accessToken = getCookie('accessToken');
    return fetch(`${this._baseUrl}/api/auth/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      method: "GET",
    })
      .then(this._checkResponse)
  }

  updateUser(email, name) {
    const accessToken = getCookie('accessToken');
    return fetch(`${this._baseUrl}/api/auth/user`, {
      body: JSON.stringify({email, name}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      method: "PATCH",
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

export { api };

