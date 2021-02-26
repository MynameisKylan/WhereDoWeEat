import React, { useState } from "react";
import Rating from "./Rating";
import styled from "styled-components";

const ResultButton = styled.button`
  background: white;
  border-radius: 0;
  color: black;
  margin: 0.5em 1em;
  font-size: 1.4em;

  border-bottom: ${(props) => (props.active ? "4px solid red" : "0")};

  &:hover {
    border-bottom: 4px solid red;
  }

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const Results = (props) => {
  const [showRestaurants, setShowRestaurants] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const results = (
    <>
      {props.restaurants.map((res) => (
        <Rating
          key={res.data.name}
          scoreName="WDWE Party Rating:"
          name={res.data.name}
          score={res.weighted_rating}
          price={res.data.price}
          categories={res.data.categories}
          image={res.data.photos[0]}
        />
      ))}
    </>
  );

  const suggestions = props.suggestions ? (
    <>
      {props.suggestions.map((res) => (
        <Rating
          key={res.id}
          scoreName="Yelp Rating:"
          name={res.name}
          score={res.rating}
          categories={res.categories}
          image={res.image_url}
          price={res.price}
          url={res.url}
        />
      ))}
    </>
  ) : <p>No suggestions available. Please specify a location and ensure you have given some of your favorite restaurants a rating!</p>;

  // toggle display of results or suggestions
  const displayResults = (e) => {
    setShowRestaurants(true);
    setShowSuggestions(false);
  };

  const displaySuggestions = (e) => {
    setShowRestaurants(false);
    setShowSuggestions(true);
  };

  return (
    <div>
      <ResultButton
        active={showRestaurants}
        type="button"
        onClick={displayResults}
      >
        Results
      </ResultButton>
      <ResultButton
        active={showSuggestions}
        type="button"
        onClick={displaySuggestions}
      >
        Suggestions
      </ResultButton>
      {showRestaurants && results}
      {showSuggestions && suggestions}
    </div>
  );
};

export default Results;
