import { getCookie } from "./getCookie";

interface IApi <T> {
  _baseUrl: string,
  _headers: {
    'Content-Type': string,
    Authorization?: void,
  }
  createOrder: (ingredients: object) => T,
  getData: () => T,
  resetPassword: (email: string) => T,
  createNewPassword: (password: string, token: string) => T,
  registerUser: (email: string, password: string, name: string) => T,
  loginUser: (email: string, password: string) => T,
  refreshToken: () => T,
  logoutUser: () => T,
  getUser: () => T,
  getOrder: (orderNumber: string) => T,
  updateUser: (email: string, name: string) => T,
}

interface IConstructor {
  baseUrl: string,
  headers: {
    'Content-Type': string,
    Authorization?: void,
  }
}

class Api implements IApi <Promise<object>> {
  _baseUrl: string;
  _headers: {
    'Content-Type': string,
    Authorization?: void,
  };

  constructor({ baseUrl, headers }: IConstructor) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  createOrder(ingredients: object) {
    return fetch(
      `${this._baseUrl}/api/orders`, {
      body: JSON.stringify({ ingredients }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      } as HeadersInit ,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  getData() {
    return fetch(
      `${this._baseUrl}/api/ingredients`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  resetPassword(email: string) {
    return fetch(
      `${this._baseUrl}/api/password-reset`, {
      body: JSON.stringify({ email }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  createNewPassword(password: string, token: string) {
    return fetch(
      `${this._baseUrl}/api/password-reset/reset`, {
      body: JSON.stringify({ password, token }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  registerUser(email: string, password: string, name:string) {
    return fetch(`${this._baseUrl}/api/auth/register`, {
      body: JSON.stringify({ email, password, name }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  loginUser(email: string, password: string) {
    return fetch(`${this._baseUrl}/api/auth/login`, {
      body: JSON.stringify({ email, password }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  refreshToken() {
    const token = getCookie('refreshToken');
    return fetch(`${this._baseUrl}/api/auth/token`, {
      body: JSON.stringify({ token }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  logoutUser() {
    const token = getCookie('refreshToken');
    return fetch(`${this._baseUrl}/api/auth/logout`, {
      body: JSON.stringify({ token }),
      headers: this._headers,
      method: "POST",
    })
      .then(this._checkResponse)
  }

  getUser() {
    return fetch(`${this._baseUrl}/api/auth/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      } as HeadersInit,
      method: "GET",
    })
      .then(this._checkResponse)
  }

  getOrder(orderNumber:string) {
    return fetch(`${this._baseUrl}/api/orders/${orderNumber}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "GET",
    })
      .then(this._checkResponse)
  }

  updateUser(email: string, name: string) {
    return fetch(`${this._baseUrl}/api/auth/user`, {
      body: JSON.stringify({email, name}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      } as HeadersInit,
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

