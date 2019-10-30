import React from "react";
import { Route, Switch } from "react-router-dom";

/* For each new page you want to route to, 
import it at the top and then add an AuthenticatedRoute path like below */

import AppliedRoute from "./AppliedRoute";
// import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

// Pages
import { pages } from '../constants'
import NotFound from "../containers/NotFound";
import LandingView from "../../pages/home/containers/LandingView";
import LoginView from "../../pages/home/containers/LoginView";

/** 
 * This component uses this Switch component from React-Router that renders the first matching route that is defined within it. 
 * In a route, it looks for / and renders the Home/Login/etc component when matched. 
 * We are also using the exact prop to ensure that it matches the / route exactly. 
 * This is because the path / will also match any route that starts with a /. 
 */
export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path={ pages.landing } exact component={ LandingView } props={ childProps } />
    <UnauthenticatedRoute path={ pages.login } exact component={ LoginView } props={ childProps } />
    {/* <AuthenticatedRoute path={ pages.song } exact component={ SongView } props={ childProps } /> */}
    {/* <AuthenticatedRoute path={ pages.circle } exact component={ CircleView } props={ childProps } /> */}
    {/* <AuthenticatedRoute path={ pages.circleSettings } exact component={ circleSettings } props={ childProps } /> */}
    {/* <AuthenticatedRoute path={ pages.profile } exact component={ ProfileView } props={ childProps } /> */}

    { /* Finally, catch all unmatched routes */ }
    <Route component={ NotFound } />
  </Switch>;

