import React from "react";
import { Route, Redirect } from "react-router-dom";

import { pages } from '../constants'

/**
 * A rout that connects to pages that require a logged in User to view.
 */
export default ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      (cProps.isAuthenticated || cProps.isAutenticating)
        ? <C {...props} {...cProps} />
        : <Redirect
            to={`${ pages.landing }?redirect=${ props.location.pathname }${ props.location
              .search}`}
          />}
  />;

