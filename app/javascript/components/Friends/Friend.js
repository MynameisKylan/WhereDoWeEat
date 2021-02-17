import React from "react";

const Friend = (props) => {

  return (
    <div>
      {props.username}
      <button onClick={props.handleClick}>{props.action}</button>
    </div>
  );
};

export default Friend;
