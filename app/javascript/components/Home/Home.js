import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar/Navbar";
import Welcome from "./Welcome";
import Profile from "./Profile";

const Home = (props) => {
  let content;

  const logout = () => {
    localStorage.removeItem("token");
    props.setAccessToken(null);
  };

  if (props.accessToken) {
    content = (
      <>
        <div>You are signed in</div>
        <Profile />
        <button onClick={logout}>Logout</button>
      </>
    );
  } else {
    content = <Welcome />;
  }

  return (
    <div>
      <Header hasAccessToken={props.accessToken ? true : false} />
      <h1>#Homepage</h1>
      {content}
    </div>
  );
};

export default Home;
