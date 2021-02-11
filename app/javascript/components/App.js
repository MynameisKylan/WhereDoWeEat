import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";

const App = () => {
  const [accessToken, setAccessToken] = useState("");

  return (
    <Switch>
      <Route
        exact
        path="/"
        component={Home}
        setAccessToken={setAccessToken}
        accessToken={accessToken}
      />
      <Route
        exact
        path="/signup"
        component={SignUp}
        setAccessToken={setAccessToken}
        accessToken={accessToken}
      />
      <Route
        exact
        path="/signin"
        render={() => (
          <SignIn setAccessToken={setAccessToken} accessToken={accessToken} />
        )}
      />
    </Switch>
  );
};

export default App;
