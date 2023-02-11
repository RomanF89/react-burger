import {
  GET_ORDER,
} from '../actions/orderDetails';

const initialStates = {
  currentOrder: null,
}

export function getOrderReducer (state = initialStates, action) {
  switch (action.type) {
    case GET_ORDER:
      return {...state, currentOrder: action.orderDetails}
    default:
      return state;
  };
};
