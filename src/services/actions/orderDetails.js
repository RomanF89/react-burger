export const GET_ORDER = 'GET_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';
export const REQUEST_ERROR = 'SAVE_ERROR';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

export function getOrder() {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER,
    })
  };
}

export function getOrderSuccess(orderData) {
  return function (dispatch) {
    dispatch({
      type: REQUEST_SUCCESS,
      orderDetails: orderData,
    })
  };
}

export function deleteOrder() {
  return function (dispatch) {
    dispatch({
      type: DELETE_ORDER,
    })
  };
}

export function saveOrderError(error) {
  return function(dispatch) {
    dispatch({
      type: REQUEST_ERROR,
      error: error,
    })
  }
}
