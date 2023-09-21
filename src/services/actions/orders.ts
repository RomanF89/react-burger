import { TFeedData } from "../../types/types";

export const ORDERS_CONNECT = 'ORDERS_CONNECT';
export const ORDERS_DISCONNECT = 'ORDERS_DISCONNECT';
export const ORDERS_WS_CONNECTING = 'ORDERS_WS_CONNECTING';
export const ORDERS_WS_OPEN = 'ORDERS_WS_OPEN';
export const ORDERS_WS_CLOSE = 'ORDERS_WS_CLOSE';
export const ORDERS_WS_MESSAGE = 'ORDERS_WS_MESSAGE';
export const ORDERS_WS_ERROR = 'ORDERS_WS_ERROR';

interface IOrderConnectAction {
  type: typeof ORDERS_CONNECT;
  payload: string;
}
interface IOrderDisconnectAction {
  type: typeof ORDERS_DISCONNECT;
}
interface IOrderWsConnecting {
  type: typeof ORDERS_WS_CONNECTING;
}
interface IOrderWsOpen {
  type: typeof ORDERS_WS_OPEN;
}
interface IOrderWsClose {
  type: typeof ORDERS_WS_CLOSE;
}
interface IOrderWsMessage {
  type: typeof ORDERS_WS_MESSAGE;
  readonly payload: TFeedData,
}
interface IOrderWsError {
  type: typeof ORDERS_WS_ERROR;
  readonly payload: string,
}

export type TOrdersActions =
  | IOrderConnectAction
  | IOrderDisconnectAction
  | IOrderWsConnecting
  | IOrderWsOpen
  | IOrderWsClose
  | IOrderWsMessage
  | IOrderWsError;


export const ordersConnect = (url: string) => ({
    type: ORDERS_CONNECT,
    payload: url,
});

export const ordersDisconnect = () => ({
    type: ORDERS_DISCONNECT,
});
