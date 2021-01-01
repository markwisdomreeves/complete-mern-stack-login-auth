import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import MainPage from "./MainPage";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";

import Private from "./core/Private";
import Admin from "./core/Admin";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";


function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/auth/activate/:token" exact component={Activate} />
          <PrivateRoute path="/private" exact component={Private} />
          <AdminRoute path="/admin" exact component={Admin} />
          <Route path="/auth/password/forgot" exact component={ForgotPassword} />
          <Route path="/auth/password/reset/:token" exact component={ResetPassword} />
      </Switch>
    </BrowserRouter>
  );
}


export default App;
