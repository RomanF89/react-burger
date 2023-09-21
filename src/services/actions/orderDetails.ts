import { TIngredient } from "../../types/types";
import { AppDispatch } from "../../types";

export const GET_ORDER = 'GET_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';
export const REQUEST_ERROR = 'SAVE_ERROR';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';


interface IGetOrderAction {
  type: typeof GET_ORDER;
}
interface IGetOrderSuccessAction {
  type: typeof REQUEST_SUCCESS;
  orderDetails: TOrderData;
}
interface IDeleteOrderAction {
  type: typeof DELETE_ORDER;
}
interface IRequestErrorAction {
  type: typeof REQUEST_ERROR;
  error: {};
}

export type TOrderDetailsActions =
  | IGetOrderAction
  | IGetOrderSuccessAction
  | IDeleteOrderAction
  | IRequestErrorAction;

export type TOrderData = {
  name: string;
  order: {
    createdAt: string,
    ingredients: [TIngredient],
    name: string,
    number: number,
    owner: {
      email: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    },
    price: number,
    status: string,
    updatedAt: string,
    _id: string,
  };
  success: boolean;
}


export function getOrder() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER,
    })
  };
}

export function getOrderSuccess(orderData: TOrderData) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REQUEST_SUCCESS,
      orderDetails: orderData,
    })
  };
}

export function deleteOrder() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: DELETE_ORDER,
    })
  };
}

export function saveOrderError(error: any) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: REQUEST_ERROR,
      error: error,
    })
  }
}
