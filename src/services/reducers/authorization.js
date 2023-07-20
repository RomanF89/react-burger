import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_TOKEN,
  GET_USER,
  UPDATE_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REFRESH_TOKEN_SUCCES,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SAVE_AUTH_ERROR,
} from "../actions/authorization";

const initialAuthState = {
  request: false,
  requestError: false,
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  prevUserState: null,
  getUserError: false,
  getUserRequest: false,
  updateUserError: false,
}

export const authorizationReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return { ...state, request: true }
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        request: false,
        currentUser: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      }
    }
    case LOGIN_USER: {
      return { ...state, request: true }
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        request: false,
        currentUser: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      }
    }
    case LOGOUT_USER: {
      return { ...state, request: true }
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        request: false,
        currentUser: null,
        accessToken: null,
        refreshToken: null,
      }
    }
    case REFRESH_TOKEN: {
      return { ...state, request: true }
    }
    case REFRESH_TOKEN_SUCCES: {
      return {
        ...state,
        request: false,
        requestError: false,
        currentUser: null,
        accessToken: action.token,
        refreshToken: action.refreshToken,
      }
    }
    case GET_USER: {
      return { ...state, getUserRequest: true }
    }

    case GET_USER_SUCCESS: {
     return { ...state, getUserRequest: false, currentUser: action.user, prevUserState: state.currentUser, getUserError: false }
    }
    case GET_USER_ERROR: {
      return { ...state, getUserRequest: false, getUserError: action.error }
    }
    case UPDATE_USER: {
      return { ...state, request: true }
    }

    case UPDATE_USER_SUCCESS: {
     return { ...state, request: false, currentUser: action.user, updateUserError: false }
    }
    case UPDATE_USER_ERROR: {
      return { ...state, request: false, updateUserError: action.error }
    }
    case SAVE_AUTH_ERROR: {
      return { ...state, request: false, requestError: action.error }
    }

    default: {
      return state
    }
  }
}

