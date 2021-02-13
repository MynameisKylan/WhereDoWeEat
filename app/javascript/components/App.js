import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import Restaurants from './Restaurants/Restaurants';
import Party from './Party/Party';

const App = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Home setAccessToken={setAccessToken} accessToken={accessToken} />
        )}
      />
      <Route
        exact
        path="/signup"
        render={() => (
          <SignUp setAccessToken={setAccessToken} accessToken={accessToken} />
        )}
      />
      <Route
        exact
        path="/signin"
        render={() => (
          <SignIn setAccessToken={setAccessToken} accessToken={accessToken} />
        )}
      />
      <Route
        exact
        path="/party"
        render={() => {
          <Party setAccessToken={setAccessToken} accessToken={accessToken} />;
        }}
      />
      <Route
        exact
        path="/restaurants"
        render={() => {
          <Restaurants setAccessToken={setAccessToken} accessToken={accessToken} />;
        }}
      />
    </Switch>
  );
};

export default App;
