import React from "react";
import Header from "../Header";
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
