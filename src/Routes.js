import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import EditProperty from "./containers/EditProperty";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NewProperty from "./containers/NewProperty";
import NotFound from "./containers/NotFound";
import Properties from "./containers/Properties";
import React from "react";
import Signup from "./containers/Signup";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ViewProperty from "./containers/ViewProperty";
import UserDashboard from "./containers/UserDashboard";

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
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
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
