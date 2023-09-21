import {
  GET_ORDER,
  DELETE_ORDER,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  TOrderDetailsActions,
  TOrderData,
} from '../actions/orderDetails';

const initialStates: TInitialStateOrderDetails = {
  currentOrder: null,
  requestError: {},
  requestOrder: false,
}

type TInitialStateOrderDetails = {
  currentOrder: TOrderData | null;
  requestError: {};
  requestOrder: boolean;
}

export function getOrderReducer(state = initialStates, action: TOrderDetailsActions) {
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
