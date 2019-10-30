import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ToastProvider, DefaultToastContainer } from 'react-toast-notifications'

import 'bootstrap/dist/css/bootstrap.css'

// import Amplify from 'aws-amplify'
// import Storage from '@aws-amplify/storage';
// import config from './aws-exports'  


import App from './shared/components/App';
import './shared/styles/index.css';
import rootReducer from './shared/reducers/index'

// Amplify.configure(config)
const store = createStore(rootReducer)

// Storage.configure({ 
//   bucket: config.aws_user_files_s3_bucket,
//   level: "private",
//   region: 'us-east-1',  
//   identityPoolId: config.aws_cognito_identity_pool_id
// });

export const S3 = Storage

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
