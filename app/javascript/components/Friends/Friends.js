import React, { useState } from "react";
import axios from "axios";

const Friends = () => {
  const [searchName, setSearchName] = useState("");
  const [resultMessage, setResultMessage] = useState("");

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
        console.log(resp)
        setResultMessage(resp.data.message)
      });
  };

  return (
    <div>
      <div>
        {resultMessage}
      </div>
      Find Friends By Username
      <form onSubmit={handleSubmit}>
        <input
          value={searchName}
          onChange={handleChange}
          placeholder="Username"
        />
        <button type="submit">Add Friend</button>
      </form>
    </div>
  );
};

export default Friends;
