import React from "react";
import { Link, useHistory } from "react-router-dom";
import './Navbar.css';
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  margin: auto;
  padding-bottom: 1em;
`;

const NavLink = styled(Link)`
  padding: 10px;
  text-decoration: none;
  color:white;
  width: 22%;
  text-align: center;
  display:flex;
  align-items:center;
  justify-content:space-around;
  box-sizing: border-box;
  height:56px;

  border-bottom: ${props => props.active ? '5px solid red' : 'none'};

  &:hover {
    border-bottom: 5px solid red;
    transition: 0.15s ease;
  }
`;

const LogoutButton = styled.button`
  border: none;
  padding: 10px;
  width: 120px;
  height: 56px;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 16px;
  background:none;
  position:absolute;
  margin:10px;
  top:0px;
  right:0px;
  border-radius:0;
  color:white;

  &:hover {
    cursor:pointer;
    border-bottom: 3px solid red;
    transition: 0.15s ease;

    .logout-icon {
      color:red;
    }
  }

  @media (max-width: 600px) {
    margin-right:0;
  }
`

const Navbar = (props) => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    history.push('/')
  };

  return (
    <Nav>
      <NavLink to={'/'} active={props.active === 'home' ? 'true' : undefined}>
      <span><i className="fas fa-home"></i> Home</span>
      </NavLink>
      <NavLink to={"/profile"} active={props.active === "profile" ? 'true' : undefined}>
      <span><i className="fas fa-user-alt"></i> Profile</span>
      </NavLink>
      <NavLink to={"/friends"} active={props.active === "friends" ? 'true' : undefined}>
      <span><i className="fas fa-user-friends"></i> Add Friends</span>
      </NavLink>
      <NavLink to={"/restaurants"} active={props.active === "restaurants" ? 'true' : undefined}>
      <span><i className="fas fa-utensils"></i> Rate Restaurants</span>
      </NavLink>
      <NavLink to={"/party"} active={props.active === "party" ? 'true' : undefined}>
        <span><i className="fas fa-users"></i> Create A Party</span>
      </NavLink>
      <LogoutButton onClick={logout}>Logout <i className="fas fa-sign-out-alt logout-icon"></i></LogoutButton>
    </Nav>
  );
};

export default Navbar;
