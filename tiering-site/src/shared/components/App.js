import React, { Component, Fragment} from "react";
import { withRouter } from "react-router-dom";

import Routes from "../routing/Routes";
// import { pages } from '../constants'
import '../styles/App.css'

// Global Components
import Navbar from './Navbar'



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
      // await Auth.currentSession();
      // this.userHasAuthenticated(true);
    } catch(e) {
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
   * 
   * @param {*} event
   */
  handleLogout = async event => {
    // await Auth.signOut();
  
    // this.userHasAuthenticated(false);
    
    // this.props.history.push(pages.landing); 
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <Fragment>
        { this.state.isAuthenticated && 
          <Navbar 
            isAuthenticated={ this.state.isAuthenticated } 
            logout={ this.handleLogout } 
          />
        }
        
          <Routes childProps={ childProps } />
      </Fragment>
    );
  }
} 

export default withRouter(App);
