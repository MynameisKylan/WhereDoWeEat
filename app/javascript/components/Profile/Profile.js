import React, { useState, useEffect } from "react";
import axios from "axios";
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
    <div>
      <Navbar active='profile' />
      <div>Signed in as {`${user.username}`}</div>
    </div>
  );
};

export default Profile;
