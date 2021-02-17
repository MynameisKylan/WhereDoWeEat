import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  margin: auto;
`;

const NavLink = styled(Link)`
  padding: 10px;
  background: ${props => props.active ? `rgba(0,0,0,0.2)` : `rgba(0, 0, 0, 0.1);`};
  text-decoration: none;
  color: black;
  width: 120px;
  text-align: center;

  &:hover {
    opacity: 80%;
  }
`;

const Navbar = (props) => {

  const logout = () => {
    localStorage.removeItem("token");
    history.push('/')
  };

  return (
    <Nav>
      <NavLink to={"/profile"} active={props.active === "profile" ? 'true' : undefined}>
        Profile
      </NavLink>
      <NavLink to={"/party"} active={props.active === "party" ? 'true' : undefined}>
        Create A Party
      </NavLink>
      <NavLink to={"/restaurants"} active={props.active === "restaurants" ? 'true' : undefined}>
        Rate Restaurants
      </NavLink>
      <NavLink to={"/friends"} active={props.active === "friends" ? 'true' : undefined}>
        Add Friends
      </NavLink>
      <button onClick={logout}>Logout</button>
    </Nav>
  );
};

export default Navbar;
