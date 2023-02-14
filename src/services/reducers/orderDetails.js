import {
  GET_ORDER,
  DELETE_ORDER,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '../actions/orderDetails';

const initialStates = {
  currentOrder: null,
  requestError: false,
  requestOrder: false,
}

export function getOrderReducer(state = initialStates, action) {
  switch (action.type) {
    case GET_ORDER:
      return { ...state, requestOrder: true }
    case REQUEST_SUCCESS:
      return { ...state, currentOrder: action.orderDetails, requestOrder: false }
    case REQUEST_ERROR:
      return { ...state, requestError: action.error, requestOrder: false }
    case DELETE_ORDER:
      return {
        ...state, currentOrder: null,
      }
    default:
      return state;
  };
};
