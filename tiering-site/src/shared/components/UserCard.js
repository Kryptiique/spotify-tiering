import React, { Component } from 'react'

import { themes } from '../constants'


/**
 * Display element for the user
 * @since 0.2.2
 */
export default class UserCard extends Component {

  constructor(props){
    super(props)

    this.state = {
      isOpen: false
    }

    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  /**
   * Toggles the user's theme preference.
   * This percolates throughout the site
   * @since 0.2.2
   */
  toggle(){
    const keys = Object.keys(themes)

    // there are only two themes right now
    const t = (this.props.theme === keys[0]) ? 1 : 0
    this.props.changeTheme(keys[t])
  }

  /**
   * Opens the dropdown menu
   * @since 0.3.1
   */
  openMenu(){
    if(this.state.isOpen) return
    this.setState({isOpen: true})
  }

  /**
   * Closes the dropdown menu
   * @since 0.3.1
   */
  closeMenu(){
    if(!this.state.isOpen) return
    this.setState({isOpen: false})
    // console.log('Clode')
  }

  

  render(){
    // var dropClass = `dropdown-content${ this.state.isOpen ? ' open' : '' }`

    return (
      <div className='user-photo' onClick={ this.props.logout }>
        <div className='img' 
          style={{backgroundImage:`url(${ this.props.user.profileImage })`}}
        />
      </div>
    )
  }
}

