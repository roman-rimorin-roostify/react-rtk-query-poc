import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./store";
// import { usersApi } from './api/usersApi';
import App from './App';

import './styles.css';

// Enable API mocking only in development
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js"
    }
  });
}

// store.dispatch(usersApi.endpoints.getUsers.initiate())

const RootComponent = () => 
  <Provider store={store}>
    <App />
  </Provider>

render(
  <React.StrictMode> 
    <RootComponent/>
  </React.StrictMode>,
  document.getElementById('root')
);
