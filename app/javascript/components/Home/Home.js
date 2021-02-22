import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import styled from "styled-components";

const WelcomeButtons = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.7em;
  background: #d32323;
  border-radius: 5px;
  margin-bottom: 1em;

  @media (max-width: 600px) {
    padding: 0.5em;
  }
`;

const Question = styled.span`
  @media (max-width: 600px) {
    display: none;
  }
`;

const Headline = styled.p`
  text-align: center;
  font-size: 1.2em;
  margin: 2em auto;
  max-width: 600px;
  line-height: 1.5em;

  @media (max-width: 600px) {
    font-size: 1rem;
    margin: 1.3rem auto 0 auto;
  }
`;

const Home = (props) => {
  return (
    <>
      <div className="header">
        <Header />
        <WelcomeButtons>
          <NavLink to={"/signup"}>Sign Up</NavLink>
          <span>
            <Question>Already have an account?</Question>{" "}
            <NavLink to={"/signin"}>Sign In</NavLink>
          </span>
        </WelcomeButtons>
        <Headline>
          WhereDoWeEat helps you find the perfect restaurant to help your party
          answer the age old question: Where do we eat?
        </Headline>
      </div>
      <div className="welcome-wrapper">
        <h2 style={{paddingBottom: 0.2 + 'em', paddingTop: 0.7 + 'em'}}>How It Works</h2>
        <ol>
          <li>
            <h3>Rate Local Restaurants</h3>
            <p>
              Search for your favorite local restaurants and give them a one to
              five star rating.
            </p>
          </li>
          <li>
            <h3>Add Friends To Your Party</h3>
            <p>
              Add some friends to your party to let us know who to tailor your
              search to.
            </p>
          </li>
          <li>
            <h3>Find Restaurants That Everyone Likes</h3>
            <p>Choose from a list of your group's most liked restaurants.</p>
          </li>
          <li>
            <h3>Dig in!</h3>
          </li>
        </ol>
      </div>
    </>
  );
};

export default Home;
