import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  let profileClass = "";
  let groupClass = "";
  let restaurantsClass = "";
  let partyClass = "";
  let friendsClass = "";
  switch (props.active) {
    case "profile":
      profileClass += "active";
      break;
    case "group":
      groupClass += "active";
      break;
    case "restaurants":
      restaurantsClass += "active";
      break;
    case "party":
      partyClass += "active";
      break;
    case "friends":
      friendsClass += "active";
      break;
  }

  const logout = () => {
    localStorage.removeItem("token");
    props.setAccessToken(null);
  };

  return (
    <nav>
      <div className={profileClass}>
        <Link to={"/"}>Profile</Link>
      </div>
      <div className={groupClass}>
        <Link to={"/party"}>Create A Party</Link>
      </div>
      <div className={restaurantsClass}>
        <Link to={"/restaurants"}>Rate Restaurants</Link>
      </div>
      <div>
        <Link to={"/friends"}>Add Friends</Link>
      </div>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
