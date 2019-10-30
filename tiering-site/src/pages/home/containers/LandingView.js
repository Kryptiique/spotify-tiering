// import { Link } from "react-router-dom";
import React, { Component } from "react";

import { pages, app_name } from '../../../shared/constants'
import "../styles/LandingView.css";

/**
 * The landing page of the site. This is what users first see when
 * using the main URL link
 * @since 0.3.1
 */
export default class LandingView extends Component {
  renderLander() {
    return (
      <div className="lander">
          <h1>{ app_name }</h1>
          <p>You bet your ass!</p>
        <div>
         use the navbar to get started, mah boi
       </div>
      </div>
    );
  }

/* This is what allows users to login and go straight to the system map page */
  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.props.history.push(pages.profile) 
        : this.renderLander()}
      </div>
    );
  }
}
