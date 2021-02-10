import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './Home/Home'
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
    </Switch>
  );
};

export default App;
