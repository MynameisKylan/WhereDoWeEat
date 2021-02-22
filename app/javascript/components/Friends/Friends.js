import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Friend from "./Friend";
import Header from "../Header";

const Friends = () => {
  const [searchName, setSearchName] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios
      .get("/friendships", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((resp) => {
        setFriends(resp.data);
      });
  }, []);

  // Remove friend from state
  const removeFriend = (username) => {
    setFriends(friends.filter((name) => name !== username));
  };

  const handleChange = (e) => {
    setSearchName(e.target.value);
  };

  // Add Friend
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "/friendships",
        { friend: { username: searchName } },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((resp) => {
        if (resp.data.message) {
          setResultMessage(resp.data.message);
        } else {
          const username = resp.data.data.attributes.username;
          setFriends([...friends, username]);
          setResultMessage(`Added ${username} as friend.`);
        }
      });
  };

  // Remove Friend
  const handleClick = (username) => {
    axios
      .post(
        "/friendships/remove",
        { friend: { username: username } },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((resp) => {
        console.log(resp);
        removeFriend(username);
        setResultMessage(resp.data.message);
      })
      .catch((resp) => {
        console.log(resp);
      });
  };

  return (
    <>
      <div className="header">
        <Header />
        <Navbar active="friends" />
      </div>
      <div className="content-wrapper">
        <h2>Find Friends By Username</h2>
        <div>{resultMessage}</div>
        <form onSubmit={handleSubmit}>
          <input
            value={searchName}
            onChange={handleChange}
            placeholder="Username"
          />
          <br />
          <button type="submit">Add Friend</button>
        </form>
        <h2>Your Friends</h2>
        {friends.map((friend) => (
          <Friend
            key={friend}
            username={friend}
            handleClick={() => handleClick(friend)}
            action="Remove Friend"
          />
        ))}
      </div>
    </>
  );
};

export default Friends;
