import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./store";
import App from './App';

// Enable API mocking only in development
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js"
    }
  });
}


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
