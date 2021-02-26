import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Navbar from "../Navbar/Navbar";
import styled from "styled-components";

const DeleteButton = styled.button`
  background: red;
`;

// landing page for signed-in users
const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const history = useHistory();

  // Get user info on page load
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

  const deleteUser = (e) => {
    e.preventDefault();

    axios
      .delete("/users", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((resp) => {
        localStorage.removeItem('token');
        history.push("/");
      });
  };

  return (
    <>
      <div className="header">
        <Header />
        <Navbar active="profile" />
      </div>
      <div className="content-wrapper">
        <p>Signed in as {`${user.username}`}</p>
        <DeleteButton onClick={deleteUser}>Delete Account</DeleteButton>
      </div>
    </>
  );
};

export default Profile;
