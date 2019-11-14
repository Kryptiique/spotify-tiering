import React, { Component, Fragment} from "react"
import { withRouter } from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../reducers/user/actions'
import Authenticator from './Authenticator'
// import SpotifyCard from './SpotifyCard'
import { spotifyAPI } from '../../index'
import { getUser } from '../functions/graphql/operations'
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
      /**
       * if the user refreshed the page and we don't have their information
       * loaded, tell the app we're reloading it so it doesn't redirect us out of
       * the app
       */
      isAuthenticating: true,
      
    };
  }

  /**
   * All this does is load the current session. If it loads, then it 
   * updates the isAuthenticating flag once the process is complete.
   */
  async componentDidMount() {
    try {
      this.currentSession()
    } catch(e) {
      console.error('Error loading cookies\n', e)
      
      /* This initializes the isAuthenticated flag in the App’s state. */
      this.setState({ isAuthenticating: false });
    }
  }
    

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
    this.props.cookies.remove(cookies.refreshToken)
    this.props.cookies.remove(cookies.accessToken)
    this.props.cookies.remove(cookies.user)
    this.userHasAuthenticated(false);
    
    // tell the the server to log us out
    
    this.props.history.push(pages.landing); 
  }

  async currentSession(){
    const access_token = this.props.cookies.get(cookies.accessToken)
    const refresh_token = this.props.cookies.get(cookies.refreshToken)
    const user_id = this.props.cookies.get(cookies.user)
    
    if(access_token !== undefined &&
      refresh_token !== undefined && 
      user_id !== undefined){
      var user = await getUser(user_id)
      if(user) {
        spotifyAPI.setAccessToken(access_token)
        this.props.actions.loginUser(user)
        this.setState({ isAuthenticating: false, isAuthenticated: true });
        return
      }
    }

    // If no user was found either on the database or locally, 
    // then we couldn't authenticate
    this.setState({ isAuthenticating: false, isAuthenticated: false });
  }

  render() {
    
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      isAuthenticating: this.state.isAuthenticating,
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
      <Fragment>
        { this.state.isAuthenticating &&
          <Authenticator/>
        }
          
          
        { !this.state.isAuthenticating &&
          <Fragment>
            { !hideNav && 
              <Navbar 
                isAuthenticated={ this.state.isAuthenticated } 
                logout={ this.handleLogout } 
              />
            }
            
            <Routes childProps={ childProps } />
            {/* <SpotifyCard /> */}
          </Fragment>
        }
      </Fragment>
      
    )
  }
} 

const mapState = () => ({ lol: 'lol' })
const mapDispatch = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(withRouter(withCookies(App)))

