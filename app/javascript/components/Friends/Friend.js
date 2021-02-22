import React from "react";

const Friend = (props) => {

  return (
    <div>
      {props.self && 'You' || props.username}
      <button onClick={props.handleClick}>{props.action.startsWith('Remove') && <i className="fas fa-user-minus"></i> || props.action.startsWith('Add') && <i className="fas fa-user-plus"></i> || props.action}</button>
    </div>
  );
};

export default Friend;
