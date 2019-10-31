import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Helmet from 'react-helmet'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import * as userActions from '../../../shared/reducers/user/actions'
import { pages, app_name, cookies } from '../../../shared/constants'
import "../styles/Credentials.css"


/**
 * This is the page that the user lands on from the Spotify OAuth flow.
 * From here we must determine if we already have the user in our system.
 * It has no purpose other than to process authentication.
 * 
 * If this is a new user, we need to add them to the database and get them
 * setup to use the app.
 * 
 * Otherwise, we just pull the main information from the database and update
 * any new profile information from Spotify's database (for example, if
 * the user has changed their display name or username)
 * 
 * The final user object gets added to the Redux store for further user
 * across the site.
 */
class LoginView extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentDidMount(){
    // Check querystring for Spotify Access token
    const params = getHashParams()
    
    // If access token is invalid, redirect to the homepage
    if(!params.access_token){
      this.props.history.push(pages.login); 
    } else {
      var user = {
        token: params.access_token,
        refreshToken: params.refresh_token
      }

      // Store it in cookies so we can accses it later!
      
      this.props.cookies.set(cookies.accessToken, 
        params.access_token, { path: pages.landing });
      this.props.cookies.set(cookies.refreshToken, 
        params.refresh_token, { path: pages.landing });

      console.debug(user)
      this.props.actions.loginUser(user)
      // this.props.history.push(pages.profile); 
    }
  }
  
  render() {
    return (
      <div className="Login">
        <Helmet>
          <title>{ app_name } | Login</title>
        </Helmet>
        
        <div className='spinner'>
          Logging you in...
          <i className='fas fa-sync spin'></i>
        </div>
      </div>
        
    )
  }
}

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
      // eslint-disable-next-line
  while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

// ====================== Redux mapping ======================

// Not used, but necessary for connect()
const mapState = state => ({
  user: state.user
})
const mapDispatch = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(withCookies(LoginView))