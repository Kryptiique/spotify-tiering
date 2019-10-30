import { Auth } from "aws-amplify";
import React, { Component, Fragment} from "react";
import { withRouter } from "react-router-dom";

import Routes from "../routing/Routes";
import { pages } from '../constants'
import '../styles/App.css'

// Global Components
import Navbar from './Navbar'


/*
 * To make our login information persist we need to store and load it 
 * from the browser session. Instead of using Cookies or Local Storage 
 * we use AWS Amplify that does this for us automatically and we just 
 * need to read from it and load it into our application state.
 * Amplify gives us a way to get the current user session using the 
 * Auth.currentSession() method. It returns a promise that resolves to 
 * the session object (if there is one).
 * 
 * We are going to load this when our app loads, with the function 
 * componentDidMount. Since Auth.currentSession() returns a promise, 
 * it means that we need to ensure that the rest of our app is only 
 * ready to go after this has been loaded.
 */


 /**
  * The App component does not have access to the router props directly
  * since it is not rendered inside a Route component. To be able to use 
  * the router props in our App component we will use the withRouter 
  * Higher-Order Component (or HOC)
  * @see https://reacttraining.com/react-router/web/api/withRouter
  */
class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  /**
   * All this does is load the current session. If it loads, then it 
   * updates the isAuthenticating flag once the process is complete. 
   * The Auth.currentSession() method throws an error No current user if 
   * nobody is currently logged in. We don’t want to show this error to users 
   * when they load up our app and are not signed in.
   * @since 0.3.1
   */
  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        // alert(e);
      }
    }
  
    /* This initializes the isAuthenticated flag in the App’s state. */
    this.setState({ isAuthenticating: false });
  }

  /* ^^ 
  */
    

  /**
   * And calling userHasAuthenticated updates the isAuthenticated flag in 
   * the App's state.
   * @since 0.3.1
   * @param {*} authenticated
   */
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }


  /**
   * 
   * AWS Amplify has a Auth.signOut() method that helps clear it out.
   * 
   * If we didn't use this method below, we would only be removing the user 
   * session from our app's state. But when the user refreshed the page,they 
   * would be loading the user session from the browser local storage (using 
   * Amplify), in effect logging them back in.
   * @since 0.3.1
   * @param {*} event
   */
  handleLogout = async event => {
    await Auth.signOut();
  
    this.userHasAuthenticated(false);
    
    /* This redirects us back to the login page once the user logs out. */
    this.props.history.push("/login"); 
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <Fragment>
        { !window.location.href.includes(pages.login) && 
          <Navbar 
            isAuthenticated={this.state.isAuthenticated} 
            logout={this.handleLogout} 
          />
        }
        
          <Routes childProps={childProps} />
      </Fragment>
    );
  }
} 

export default withRouter(App);
