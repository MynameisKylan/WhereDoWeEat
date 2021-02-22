import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import Navbar from "../Navbar/Navbar";

// landing page for signed-in users
const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    axios
      .get("/users", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((resp) => {
        setUser({
          username: resp.data.data.attributes.username,
          email: resp.data.data.attributes.email,
        });
      });
  }, []);

  return (
    <>
      <div className="header">
        <Header />
        <Navbar active="profile" />
      </div>
      <div className="content-wrapper">
        <p>Signed in as {`${user.username}`}</p>
      </div>
    </>
  );
};

export default Profile;
