import React from "react";

const Friend = (props) => {

  return (
    <div>
      {props.self && 'You' || props.username}
      <button onClick={props.handleClick}>{props.action}</button>
    </div>
  );
};

export default Friend;
