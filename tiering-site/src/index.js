import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ToastProvider, DefaultToastContainer } from 'react-toast-notifications'
import axios from 'axios'
// import http from 'http'

import 'rc-tabs/assets/index.css';
import 'bootstrap/dist/css/bootstrap.css'

// import Amplify from 'aws-amplify'
// import Storage from '@aws-amplify/storage';
// import config from './aws-exports'  

import spotify_config from './shared/spotify-config'
import App from './shared/components/App';
import './shared/styles/index.css';
import rootReducer from './shared/reducers/index'

// Amplify.configure(config)
const store = createStore(rootReducer)


// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {

//     // use the access token to access the Spotify Web API
//     var token = body.access_token;
//     var options = {
//       url: 'https://api.spotify.com/v1/users/jmperezperez',
//       headers: {
//         'Authorization': 'Bearer ' + token
//       },
//       json: true
//     };
//     request.get(options, function(error, response, body) {
//       console.log(body);
//     });
//   }
// });

// const authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   method: 'post',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer(spotify_config.client_id + ':' + spotify_config.client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true,
// }
// console.debug('AuthOptions: ', authOptions)

// // Request OAuth path to Spotify
// axios(authOptions).then(response => {
//   console.debug(response)
// }).catch(err => {
//   console.error('There was an getting OAuth route to spotify.',
//     err)
// })


// Storage.configure({ 
//   bucket: config.aws_user_files_s3_bucket,
//   level: "private",
//   region: 'us-east-1',  
//   identityPoolId: config.aws_cognito_identity_pool_id
// });

// export const S3 = Storage

// Subscribe to all gQLs
// export const subs = {}
// Object.keys(subscriptions).forEach(sub => {
//   const subscription = API.graphql(
//     graphqlOperation(subscriptions[sub])
//   ).subscribe({
//       next: (data) => console.log(data)
//   });
//   subs[sub] = subscription
// })


const MyCustomToast = ({ children, ...props }) => (
  <div style={{zIndex:1, position: "absolute"}} >
    <DefaultToastContainer {...props}>
      {children}
    </DefaultToastContainer>
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider  components={{ ToastContainer: MyCustomToast }}>
      <Router> 
        <App />
      </Router>
    </ToastProvider>
  </Provider>,
document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
