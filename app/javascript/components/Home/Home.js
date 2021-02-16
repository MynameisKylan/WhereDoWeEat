import React from "react";
import Header from "../Header";
import Welcome from "./Welcome";

const Home = (props) => {

  return (
    <div>
      <Header hasAccessToken={props.accessToken ? true : false} />
      <h1>#Homepage</h1>
      <Welcome />
    </div>
  );
};

export default Home;
