import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import { ToastProvider, DefaultToastContainer } from 'react-toast-notifications'
// import axios from 'axios'
// import http from 'http'

import 'rc-tabs/assets/index.css';
import 'bootstrap/dist/css/bootstrap.css'

import App from './shared/components/App';
import './shared/styles/index.css';
import rootReducer from './shared/reducers/index'
import _spotifyAPI from 'spotify-web-api-js'

const spotifyAPI = new _spotifyAPI()

// Amplify.configure(config)
const store = createStore(rootReducer)

const MyCustomToast = ({ children, ...props }) => (
  <div style={{ zIndex:1, position: "absolute" }} >
    <DefaultToastContainer {...props}>
      {children}
    </DefaultToastContainer>
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider  components={{ ToastContainer: MyCustomToast }}>
      <CookiesProvider>
        <Router> 
          <App />
        </Router>
      </CookiesProvider>
    </ToastProvider>
  </Provider>,
document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
