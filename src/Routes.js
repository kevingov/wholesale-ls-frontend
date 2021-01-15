import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import EditProperty from "./containers/EditProperty";
import Home from "./containers/Home";
import Login from "./containers/Login";
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
import ViewProfile from "./containers/ViewProperty";
import PropertyMultiform from "./containers/NewProperty";
import PropertyChat from "./containers/PropertyChat";

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path='/' exact component={Home} props={childProps} />
    <AppliedRoute path='/terms' exact component={Terms} appProps={childProps} />
    <AppliedRoute
      path='/privacy'
      exact
      component={Privacy}
      appProps={childProps}
    />
    <UnauthenticatedRoute
      path='/login'
      exact
      component={Login}
      props={childProps}
    />
    <UnauthenticatedRoute
      path='/signup'
      exact
      component={Signup}
      props={childProps}
    />
    <AuthenticatedRoute
      path='/properties/new'
      exact
      component={PropertyMultiform}
      props={childProps}
    />
    <AuthenticatedRoute
      path='/properties/:id/edit'
      exact
      component={EditProperty}
      props={childProps}
    />
    <AppliedRoute
      path='/properties'
      exact
      component={Properties}
      props={childProps}
    />
    <AppliedRoute
      path='/properties/:id'
      exact
      component={ViewProperty}
      props={childProps}
    />
    <AppliedRoute
      path='/dashboard'
      exact
      component={UserDashboard}
      props={childProps}
    />
    <AppliedRoute
      path='/privacy'
      exact
      component={PrivacyPolicy}
      props={childProps}
    />
    <AuthenticatedRoute
      path='/profile/edit'
      exact
      component={EditProfile}
      props={childProps}
    />
    <AuthenticatedRoute
      path='/profile'
      exact
      component={ViewProfile}
      props={childProps}
    />
    <AppliedRoute
      path='/properties/:id/chat'
      exact
      component={PropertyChat}
      props={childProps}
    />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
