import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

const Home = (props) => {
  let content;

  const logout = () => {
    localStorage.removeItem('token')
    props.setAccessToken(null)
  }

  if (props.accessToken) {
    content = <div>You are signed in</div>;
  } else {
    content = (
      <div>
        <Link to={"/signup"}>Sign Up</Link>
        <Link to={"/signin"}>Sign In</Link>
      </div>
    );
  }

  return (
    <div>
      <Header hasAccessToken={props.accessToken ? true : false} />
      <h1>#Homepage</h1>
      {content}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
