import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import Restaurants from "./Restaurants/Restaurants";
import Party from "./Party/Party";
import Friends from "./Friends/Friends";
import Profile from "./Profile/Profile";

const App = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));

  // https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("token") ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/signin", state: { redirected: true } }}
            />
          )
        }
      />
    );
  }

  return (
    <Switch>
      <PrivateRoute path="/profile" component={Profile} />
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
      <PrivateRoute path="/party" component={Party} />
      <PrivateRoute path="/restaurants" component={Restaurants} />
      <PrivateRoute path="/friends" component={Friends} />
    </Switch>
  );
};

export default App;
