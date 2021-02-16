import React from "react";
import { Link } from "react-router-dom";

// landing page for non-authenticated users
const Welcome = () => {
  return (
    <div>
      <Link to={"/signup"}>Sign Up</Link>
      <Link to={"/signin"}>Sign In</Link>
      <h1>Where Do We Eat?</h1>
      <p>
        Where Do We Eat helps you find the perfect restaurant that is sure to
        please everyone in your party.
      </p>
      <h2>How It Works</h2>
      <ol>
        <li>Rate local restaurants.</li>
        <li>Add friends to your party.</li>
        <li>Find restaurants that everyone likes.</li>
        <li>Dig in!</li>
      </ol>
    </div>
  );
};

export default Welcome;
