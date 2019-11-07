import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

import logo from '../static/spoofy logo.svg'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

/**
 * A simple overlay that shows when someone refreshes the page...
 * essentially show that we are reacquiring their information
 */
export default class Authenticator extends Component {
  render(){
    return (<div className='Authenticator'>
      
      <Loader
        type="TailSpin"
        color="#88A57D"
        height={100}
        width={100}
      />
      <img src={ logo } alt=''/>
    </div>)
  }
}