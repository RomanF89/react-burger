import { WebsocketStatus } from "../../utils/webSocketStatus";
import {
  FEED_WS_CLOSE,
  FEED_WS_CONNECTING,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  FEED_WS_OPEN
} from "../actions/feed";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  data: [],
  connectingError: ''
};



export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING
      };
    case FEED_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: ''
      };
    case FEED_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case FEED_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload
      };
    case FEED_WS_MESSAGE:
      return {
        ...state,
        data: action.payload,
      }
    default:
      return state;
  }
}
