import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import Restaurants from "./Restaurants/Restaurants";
import Party from "./Party/Party";

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
        render={(props) => (
          <SignUp
            {...props}
            setAccessToken={setAccessToken}
            accessToken={accessToken}
          />
        )}
      />
      <Route
        exact
        path="/signin"
        render={(props) => (
          <SignIn
            {...props}
            setAccessToken={setAccessToken}
            accessToken={accessToken}
          />
        )}
      />
      <Route
        exact
        path="/party"
        render={() =>
          localStorage.getItem("token") ? (
            <Party setAccessToken={setAccessToken} accessToken={accessToken} />
          ) : (
            <Redirect
              to={{ pathname: "/signin", state: { redirected: true } }}
            />
          )
        }
      />
      <Route
        exact
        path="/restaurants"
        render={() =>
          localStorage.getItem("token") ? (
            <Restaurants
              setAccessToken={setAccessToken}
              accessToken={accessToken}
            />
          ) : (
            <Redirect
              to={{ pathname: "/signin", state: { redirected: true } }}
            />
          )
        }
      />
    </Switch>
  );
};

export default App;
