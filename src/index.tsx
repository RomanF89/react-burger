import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, compose, applyMiddleware } from 'redux';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './services/reducers/rootReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { socketMiddleware } from './middleware/socket-middleware';
import {
  FEED_CONNECT,
  FEED_DISCONNECT,
  FEED_WS_CONNECTING,
  FEED_WS_OPEN,
  FEED_WS_CLOSE,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE
} from './services/actions/feed';

import {
  ORDERS_CONNECT,
  ORDERS_DISCONNECT,
  ORDERS_WS_CONNECTING,
  ORDERS_WS_OPEN,
  ORDERS_WS_CLOSE,
  ORDERS_WS_MESSAGE,
  ORDERS_WS_ERROR
} from './services/actions/orders';


const feedMiddleware = socketMiddleware({
  wsConnect: FEED_CONNECT,
  wsDisconnect: FEED_DISCONNECT,
  wsConnecting: FEED_WS_CONNECTING,
  onOpen: FEED_WS_OPEN,
  onClose: FEED_WS_CLOSE,
  onError: FEED_WS_ERROR,
  onMessage: FEED_WS_MESSAGE,
});

const ordersMiddleware = socketMiddleware({
  wsConnect: ORDERS_CONNECT,
  wsDisconnect: ORDERS_DISCONNECT,
  wsConnecting: ORDERS_WS_CONNECTING,
  onOpen: ORDERS_WS_OPEN,
  onClose: ORDERS_WS_CLOSE,
  onError: ORDERS_WS_ERROR,
  onMessage: ORDERS_WS_MESSAGE,
});


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, feedMiddleware, ordersMiddleware));


export const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
reportWebVitals();
