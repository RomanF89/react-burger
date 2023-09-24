import { TFeedData } from "../../types/types";
import { WebsocketStatus } from "../../utils/webSocketStatus";
import { TOrderData } from "../actions/orderDetails";
import {
  ORDERS_WS_CLOSE,
  ORDERS_WS_CONNECTING,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
  ORDERS_WS_OPEN,
  TOrdersActions
} from "../actions/orders";

const initialState: TInitialState = {
  status: WebsocketStatus.OFFLINE,
  data: null,
  connectingError: '',
};

type TInitialState = {
  status: typeof WebsocketStatus.CONNECTING | typeof WebsocketStatus.OFFLINE | typeof WebsocketStatus.ONLINE;
  data: TFeedData | null;
  connectingError: string;
}

export const ordersReducer = (state = initialState, action: TOrdersActions) => {
  switch (action.type) {
    case ORDERS_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING
      };
    case ORDERS_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: ''
      };
    case ORDERS_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case ORDERS_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload
      };
    case ORDERS_WS_MESSAGE:
      return {
        ...state,
        data: action.payload,
      }
    default:
      return state;
  }
}
