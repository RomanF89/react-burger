import { TFeedData } from "../../types/types";

export const FEED_CONNECT = 'FEED_CONNECT';
export const FEED_DISCONNECT = 'FEED_DISCONNECT';
export const FEED_WS_CONNECTING = 'FEED_WS_CONNECTING';
export const FEED_WS_OPEN = 'FEED_WS_OPEN';
export const FEED_WS_CLOSE = 'FEED_WS_CLOSE';
export const FEED_WS_MESSAGE = 'FEED_WS_MESSAGE';
export const FEED_WS_ERROR = 'FEED_WS_ERROR';

interface IFeedConnectAction {
  readonly type: typeof FEED_CONNECT,
  readonly payload: string,
}
interface IFeedDisconnectAction {
  readonly type: typeof FEED_DISCONNECT,
}
interface IFeedWsConnecting {
  readonly type: typeof FEED_WS_CONNECTING,
}
interface IFeedWsOpen {
  readonly type: typeof FEED_WS_OPEN,
}
interface IFeedWsClose {
  readonly type: typeof FEED_WS_CLOSE,
}
interface IFeedWsMessage {
  readonly type: typeof FEED_WS_MESSAGE,
  readonly payload: TFeedData,
}
interface IFeedWsError {
  readonly type: typeof FEED_WS_ERROR,
  readonly payload: string,
}

export type TFeedActions =
  | IFeedConnectAction
  | IFeedDisconnectAction
  | IFeedWsConnecting
  | IFeedWsOpen
  | IFeedWsClose
  | IFeedWsMessage
  | IFeedWsError

export const feedConnect = (url: string) => ({
  type: FEED_CONNECT,
  payload: url
});

export const feedDisconnect = () => ({
  type: FEED_DISCONNECT,
});
