import React, { Component, Fragment} from "react"
import { withRouter } from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Routes from "../routing/Routes";
import { cookies, pages } from '../constants'
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
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

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
   * The .currentSession() method throws an error No current user if 
   * nobody is currently logged in. We don’t want to show this error to users 
   * when they load up our app and are not signed in.
   */
  async componentDidMount() {
    try {
      this.currentSession()
    } catch(e) {
      console.error('Error loading cookies\n', e)
      
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
   * event for logging a user out
   * @param {*} event
   */
  handleLogout = async event => {
    this.props.cookies.removeCookie(cookies.refreshToken)
    this.props.cookies.removeCookie(cookies.accessToken)
    this.userHasAuthenticated(false);
    
    // tell the the server to log us out
    
    this.props.history.push(pages.landing); 
  }

  currentSession(){
    // const [cookies, setCookie] = useCookies([cookies.accessToken]);
    const access_token = this.props.cookies.get(cookies.accessToken)
    const refresh_token = this.props.cookies.get(cookies.refreshToken)
    
    if(access_token && refresh_token){
      this.userHasAuthenticated(true);
    }
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    // Hide the navigation bar if on the landing page
    // or in the login page
    const l = window.location.href.replace('http://','')
    const hideNav = l.includes(pages.login) ||
      l.substr(l.indexOf('/')) === '/' || 
      !this.state.isAuthenticated

    // console.debug( l.includes(pages.login), 
    // l.substr(l.indexOf('/')) === '/',
    // !this.state.isAuthenticated)
    return (
      !this.state.isAuthenticating &&
      <Fragment>
        { !hideNav && 
          <Navbar 
            isAuthenticated={ this.state.isAuthenticated } 
            logout={ this.handleLogout } 
          />
        }
        
        <Routes childProps={ childProps } />
      </Fragment>
    )
  }
} 

export default withRouter(withCookies(App));
