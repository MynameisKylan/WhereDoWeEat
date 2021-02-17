import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Friend from "./Friend";

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
        console.log(resp);
        setFriends(resp.data);
      });
  }, []);

  const removeFriend = (username) => {
    setFriends(friends.filter((name) => name !== username));
  };

  const handleChange = (e) => {
    setSearchName(e.target.value);
  };

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

  return (
    <div>
      <Navbar active="friends" />
      <div>{resultMessage}</div>
      <h1>Find Friends By Username</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={searchName}
          onChange={handleChange}
          placeholder="Username"
        />
        <button type="submit">Add Friend</button>
      </form>
      <h1>Your Friends</h1>
      {friends.map((friend) => (
        <Friend
          key={friend}
          setResultMessage={setResultMessage}
          removeFriend={() => removeFriend(friend)}
          username={friend}
        />
      ))}
    </div>
  );
};

export default Friends;
