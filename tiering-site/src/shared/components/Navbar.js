import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { withToastManager } from 'react-toast-notifications';
import { Link } from 'react-router-dom'
import _ from 'lodash'

// import * as sharedActions from '../reducers/actions'
import { themes } from '../constants'
import UserCard from './UserCard'

import { pages } from '../constants'
import '../styles/Navbar.css'

/**
 * The global navigation bar for the site
 */
class Navbar extends Component {
  // constructor(props){
  //   super(props)

  // }

  componentDidMount(){
    
  }


  render(){
    return (
      <div className="nav-header">
        { this.props.isAuthenticated
        ? <Fragment>
            <Link to={ pages.home } className="left">Spoofy</Link>
            <UserCard 
              user= { this.state.user }
              logout= { this.props.logout } 
              { ...this.props.actions }
            />

            <Link to= { pages.circles }><i className="fas fa-play-circle"></i>Circles</Link>
            
            {/* <div onClick={this.props.handleLogout}>Logout</div> */}
          </Fragment>
        : <Fragment>
            <Link to={ pages.login }>
              Login
            </Link>
          </Fragment>}

      </div>
    )
  }
}


/**
 * Update theme variables in document's css
 * @param {number} theme The index of the currently selected theme 
 */
export function setDOMVars (theme) {
  const selTheme = _.merge(themes[theme], themes.Root)

  for(var col in selTheme){
    if(col !== 'background_gradient') {
      document.documentElement.style.setProperty('--' + col, selTheme[col]);
    } else {
      // update gradient settings in Body

      document.body.style.setProperty('background-image',
        selTheme[col].type + '-gradient(' + selTheme[col].first + ', ' +
        selTheme[col].second + ')')
    }
  }

  return theme
}


// ==================================================================

const mapState = state => {
  if(state.user === undefined) state.user = {theme:{}}

  return {
    // theme: setDOMVars(state.user.theme),
    user: state.user
  }
}

// const mapDispatch = dispatch => ({
//   actions: bindActionCreators(sharedActions, dispatch),
// })

export default connect (
  mapState,
  // mapDispatch
)(withToastManager(Navbar))