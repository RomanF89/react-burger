export const GET_ORDER = 'GET_ORDER';

export function getOrder(orderData) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER,
      orderDetails: orderData,
    })

  };
}
