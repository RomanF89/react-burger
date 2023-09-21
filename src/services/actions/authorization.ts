import { api } from "../../utils/Api";
import { deleteCookie } from "../../utils/deleteCookie";
import { AppDispatch } from "../../types";

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

export type TRegistrationData = {
  email: string,
  name: string,
}

export type TUserData = {
  email: string,
  name: string,
}

interface IRegisterUserAction {
  readonly type: typeof REGISTER_USER;
}
interface ILoginUserAction {
  readonly type: typeof LOGIN_USER;
}
interface ILogoutUserAction {
  readonly type: typeof LOGOUT_USER;
}
interface IRefreshTokenAction {
  readonly type: typeof REFRESH_TOKEN;
}
interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly data: { user: TRegistrationData };
}
interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly data: { user: TUserData };
}
interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}
interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCES;
}
interface IGetUserAction {
  readonly type: typeof GET_USER;
}
interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUserData ;
}
interface IGetUserErrorAction {
  readonly type: typeof GET_USER_ERROR;
  readonly error: {};
}
interface IUpdateUserAction {
  readonly type: typeof UPDATE_USER;
}
interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUserData;
}
interface IUpdateUserErrorAction {
  readonly type: typeof UPDATE_USER_ERROR;
  readonly error: {};
}
interface ISaveAuthErrorAction {
  readonly type: typeof SAVE_AUTH_ERROR;
  readonly error: {};
}


export type TAuthorizationActions =
| IRegisterUserAction
| ILoginUserAction
| ILogoutUserAction
| IRefreshTokenAction
| IRegisterUserSuccessAction
| ILoginUserSuccessAction
| ILogoutUserSuccessAction
| IRefreshTokenSuccessAction
| IGetUserAction
| IGetUserSuccessAction
| IGetUserErrorAction
| IUpdateUserAction
| IUpdateUserSuccessAction
| IUpdateUserErrorAction
| ISaveAuthErrorAction;



export const registrationUser = (email: string, password:string, name:string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_USER,
    })
    api.registerUser(email, password, name)
      .then((res) => {
        document.cookie = `refreshToken=${res.refreshToken}; maxAge=3600`;
        document.cookie = `accessToken=${res.accessToken}; maxAge=1200`;
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


export const loginUser = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_USER,
    })
    api.loginUser(email, password)
      .then((res) => {
        document.cookie = `refreshToken=${res.refreshToken}; maxAge=3600`;
        document.cookie = `accessToken=${res.accessToken}; maxAge=1200`;
        dispatch({
          type: LOGIN_USER_SUCCESS,
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

export const refreshToken = (func: any) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REFRESH_TOKEN,
    })
    api.refreshToken()
      .then((res) => {
        document.cookie = `refreshToken=${res.refreshToken}; maxAge=3600`;
        document.cookie = `accessToken=${res.accessToken}; maxAge=1200`;
      })
      .then(() => {
        if (func) {
          dispatch(func)
        }
        dispatch({
          type: REFRESH_TOKEN_SUCCES,
        });
      })
      .catch((err) => {
        dispatch({
          type: SAVE_AUTH_ERROR,
          error: err,
        })
      })
  }
}

export const logoutUser = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_USER,
    })
    api.logoutUser()
      .then((res) => {
        if (res.success === true) {
          deleteCookie('refreshToken');
          deleteCookie('accessToken');
          dispatch({
            type: LOGOUT_USER_SUCCESS,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: SAVE_AUTH_ERROR,
          error: err,
        })
      })
  }
}

export const getUser = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER,
    })
    api.getUser()
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: GET_USER_ERROR,
          error: err,
        })
      })
  }
}

export const updateUser = (email:string, name:string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER,
    })
    api.updateUser(email, name)
      .then((res) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          user: res.user,
        })
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_ERROR,
          error: err,
        })
      })
  }
}

