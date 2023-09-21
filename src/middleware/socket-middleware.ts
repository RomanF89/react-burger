import { refreshToken } from "../services/actions/authorization";

type TSocketMiddleware = {
  wsConnect: string;
  wsSendMessage?: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsConnecting: string;
  wsDisconnect: string;
};


export const socketMiddleware = (wsActions: TSocketMiddleware) => {
  return (store: { dispatch: any; }) => {
      let socket: WebSocket | null = null;

      return (next: (arg0: any) => void) => (action: { payload?: any; type?: string; }) => {
          const { dispatch } = store;
          const { type } = action;
          const {
              wsConnect,
              wsSendMessage,
              onOpen,
              onClose,
              onError,
              onMessage,
              wsConnecting,
              wsDisconnect,
          } = wsActions;

          if (type === wsConnect) {
              socket = new WebSocket(action.payload);
              dispatch({type: wsConnecting});
          }

          if (socket) {
              socket.onopen = () => {
                  dispatch({ type: onOpen });
              };

              socket.onerror = () => {
                  dispatch({ type: onError, payload: 'Error' });
              };

              socket.onmessage = event => {
                  const { data } = event;
                  const parsedData = JSON.parse(data);
                  if (parsedData.message === 'Invalid or missing token') {
                    dispatch(refreshToken);
                  }
                  dispatch({ type: onMessage, payload: parsedData });
              };

              socket.onclose = () => {
                  dispatch({ type: onClose });
              };

              if (type === wsSendMessage) {
                  socket.send(JSON.stringify(action.payload));
              }

              if (type === wsDisconnect) {
                  socket.close();
                  socket = null;
              }
          }

          next(action);
      };
  };
};
