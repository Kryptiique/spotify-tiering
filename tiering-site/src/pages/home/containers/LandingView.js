import React, { Component } from "react"
import Helmet from 'react-helmet'
import logo from '../styles/spoofy logo.svg'

import { app_name } from '../../../shared/constants'
import "../styles/LandingView.css";

/**
 * The landing page of the site. This is what users first see when
 * using the main URL link
 * @since 0.3.1
 */
export default class LandingView extends Component {
  // constructor(props){
  //   super(props)

  // }

/* This is what allows users to login and go straight to the system map page */
  render() {
    return (
      <div className="lander">
        <Helmet>
          <title>{ app_name } | Spotify Tiering</title>
        </Helmet>
        <div className='body'>
          <div className='logo'>
            <img src={ logo } className="App-logo" alt="logo" />
            <span>{ app_name.toUpperCase() }</span>
          </div>
          
          <div className='form'>
            <p>
              { app_name } is an extension to Spotify that allows 
              you to collaborate on a playlist by sharing songs and giving them <span>Tier Ratings! </span>
               Compete in challenges and earn points to rise to the top of the
              leaderboard! Yay!
            </p>
            <a className='btn wide' href={ 'http://localhost:8888/login' }>Spotify Login</a>
          </div>
          
        </div>
      </div>
    );
  }
}
