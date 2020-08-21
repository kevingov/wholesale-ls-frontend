import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import EditProperty from "./containers/EditProperty";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NewProperty from "./containers/NewProperty";
import NotFound from "./containers/NotFound";
import Privacy from "./containers/Privacy";
import PrivacyPolicy from "./containers/PrivacyPolicy";
import Properties from "./containers/Properties";
import React from "react";
import Signup from "./containers/Signup";
import Terms from "./containers/Terms";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import UserDashboard from "./containers/UserDashboard";
import ViewProperty from "./containers/ViewProperty";
import EditProfile from "./containers/EditProfile";

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/terms" exact component={Terms} appProps={childProps} />
    <AppliedRoute
      path="/privacy"
      exact
      component={Privacy}
      appProps={childProps}
    />
    <UnauthenticatedRoute
      path="/login"
      exact
      component={Login}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={Signup}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/properties/new"
      exact
      component={NewProperty}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/properties/:id/edit"
      exact
      component={EditProperty}
      props={childProps}
    />
    <AppliedRoute
      path="/properties"
      exact
      component={Properties}
      props={childProps}
    />
    <AppliedRoute
      path="/properties/:id"
      exact
      component={ViewProperty}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/dashboard"
      exact
      component={UserDashboard}
      props={childProps}
    />
    <AppliedRoute
      path="/privacy"
      exact
      component={PrivacyPolicy}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/editProfile/:id/edit"
      exact
      component={EditProfile}
      props={childProps}
    />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
