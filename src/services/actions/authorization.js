import { api } from "../../utils/Api";
import { getCookie } from '../../utils/getCookie';
import { deleteCookie } from "../../utils/deleteCookie";


export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const REFRESH_TOKEN_SUCCES = "REFRESH_TOKEN_SUCCES";
export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";
export const SAVE_AUTH_ERROR = "SAVE_AUTH_ERROR";

const refreshedToken = getCookie('refreshToken');
const accessToken = getCookie('accessToken');


export const registrationUser = (email, password, name) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER,
    })
    api.registerUser(email, password, name)
      .then((res) => {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          data: res,
        })
      })
      .catch((err) => {
        dispatch({
          type: SAVE_AUTH_ERROR,
          error: err,
        })
      })
  }
}

export const loginUser = () => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER,
    })
  }
}

export const loginUserSuccess = (data) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      data: data,
    })
  }
}

export const saveLoginError = (err) => {
  return function (dispatch) {
    dispatch({
      type: SAVE_AUTH_ERROR,
      error: err,
    })
  }
}

export const refreshToken = (token, funk) => {
  return function (dispatch) {
    dispatch({
      type: REFRESH_TOKEN,
    })
    api.refreshToken(token)
      .then((res) => {
        document.cookie = `refreshToken=${res.refreshToken}; maxAge=3600`;
        document.cookie = `accessToken=${res.accessToken}; maxAge=1200`;
        return res
      })
      .then((res) => {
        if (funk) { dispatch(funk) }
        dispatch({
          type: REFRESH_TOKEN_SUCCES,
          token: res.accessToken,
          refreshToken: res.refreshToken,
        });
      })
      .catch((err) => {
        console.log('ошибка обновления токена')
        dispatch({
          type: SAVE_AUTH_ERROR,
          error: err,
        })
      })
  }
}

export const logoutUser = (token) => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_USER,
    })
    api.logoutUser(token)
      .then((res) => {
        if (res.success === true) {
          deleteCookie('refreshToken');
          deleteCookie('accessToken');
          dispatch({
            type: LOGOUT_USER_SUCCESS,
          })
          console.log(res.message)
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: SAVE_AUTH_ERROR,
          error: err,
        })
      })
  }
}

export const getUser = (accessToken) => {
  return function (dispatch) {
    dispatch({
      type: GET_USER,
    })
    api.getUser(accessToken)
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
        })
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_ERROR,
          error: err,
        })
      })
  }
}

export const updateUser = (email, name, accessToken) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER,
    })
    api.updateUser(email, name, accessToken)
      .then((res) => {
        console.log(res)
        dispatch({
          type: UPDATE_USER_SUCCESS,
          user: res.user,
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: UPDATE_USER_ERROR,
          error: err,
        })
      })
  }
}

