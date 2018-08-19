import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import Home from './containers/Home';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Lunches from "./containers/Lunches";
import NewLunch from './containers/NewLunch';
import Lunch from "./containers/Lunch";
import NewLocation from "./containers/NewLocation";
import NotFound from './containers/NotFound';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/:groupName" exact component={Lunches} props={childProps} />
    <AuthenticatedRoute path="/:groupName/new" exact component={NewLunch} props={childProps} />
    <AuthenticatedRoute path="/:groupName/:lunchDate" exact component={Lunch} props={childProps} />
    <AuthenticatedRoute path="/:groupName/:lunchDate/new" exact component={NewLocation} props={childProps} />
    <Route component={NotFound} />
  </Switch>
);
