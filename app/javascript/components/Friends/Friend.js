import React from "react";
import axios from "axios";

const Friend = (props) => {
  const handleClick = () => {
    axios
      .post(
        "/friendships/remove",
        { friend: { username: props.username } },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((resp) => {
        console.log(resp);
        props.removeFriend();
        props.setResultMessage(resp.data.message);
      })
      .catch((resp) => {
        console.log(resp);
      });
  };

  return (
    <div>
      {props.username}
      <button onClick={handleClick}>Remove Friend</button>
    </div>
  );
};

export default Friend;
