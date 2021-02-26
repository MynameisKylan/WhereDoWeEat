import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Friend from "../Friends/Friend";
import Header from "../Header";
import Results from './Results';
import styled from "styled-components";

const ColWrapper = styled.div`
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PartyCol = styled.div`
  width: 40%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ResultCol = styled.div`
  width: 60%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const PriceBox = styled.div`
  padding: 1em;
  margin-bottom: 0.5em;

  input {
    position: fixed;
    opacity: 0;
    pointer-events: none;
  }

  label {
    cursor: pointer;
    padding: 0.3em;
    border-right: 1px solid lightgrey;92126

    &:last-child {
      border-right: none;
    }

    &:hover,
    &:active {
      border-bottom: 3px solid #d32323;
    }
  }

  input:checked + label {
    border-bottom: 3px solid #d32323;
  }
`;

const Party = () => {
  const [searchParams, setSearchParams] = useState({
    party: [],
    location: "",
    price: null,
  });
  const [friends, setFriends] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [user, setUser] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // set current user and party on initial load
  useEffect(() => {
    axios
      .get("/users", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((resp) => {
        const username = resp.data.data.attributes.username;
        setUser(username);
        setSearchParams({ ...searchParams, party: [username] });
      });
  }, []);

  // get friendlist on initial load
  useEffect(() => {
    axios
      .get("/friendships", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((resp) => {
        setFriends(resp.data);
      });
  }, []);

  // Add user to party
  const addToParty = (username) => {
    setSearchParams({
      ...searchParams,
      party: [...searchParams.party, username],
    });
    setFriends(friends.filter((friend) => friend !== username));
  };

  // Remove user from party
  const removeFromParty = (username) => {
    const newParty = searchParams.party.filter((friend) => friend !== username);
    setSearchParams({ ...searchParams, party: newParty });
    setFriends([...friends, username]);
  };

  // Form input handler
  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleClick = (price) => {
    if (searchParams.price === price) {
      // Un-Select
      setSearchParams({ ...searchParams, price: null });
    } else {
      setSearchParams({ ...searchParams, price: price });
    }
  };

  const findRestaurants = () => {
    axios
      .post(
        "/party/search",
        {
          party: searchParams.party,
          location: searchParams.location,
          price: searchParams.price,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((resp) => {
        setRestaurants(resp.data.results);
        setSuggestions(resp.data.suggestions);
      });
  };

  const friendsList = friends.map((friend) => (
    <Friend
      key={friend}
      username={friend}
      handleClick={() => addToParty(friend)}
      action="Add To Party"
      self={friend == user}
    />
  ));

  const partyList = searchParams.party.map((friend) => (
    <Friend
      key={friend}
      username={friend}
      handleClick={() => removeFromParty(friend)}
      action="Remove From Party"
      self={friend == user}
    />
  ));

  const priceOptions = [1, 2, 3, 4].map((price) => {
    return (
      <Fragment key={price}>
        <input
          type="radio"
          value={price}
          name={`price`}
          id={`price-${price}`}
          checked={searchParams.price === price}
          onChange={() => {}}
        />
        <label onClick={() => handleClick(price)}>{"$".repeat(price)}</label>
      </Fragment>
    );
  });

  return (
    <>
      <div className="header">
        <Header />
        <Navbar active="party" />
      </div>
      <div className="content-wrapper">
        <p>
          Add friends to your party and find restaurants that everyone loves!
        </p>
        <ColWrapper>
          <PartyCol>
            <h2>Your Party</h2>
            {partyList}
            <br />
            <h2>Add Friends</h2>
            {friendsList}
          </PartyCol>
          <ResultCol>
            <h2>Search Options</h2>
            <label>Location</label>
            <br />
            <input
              name="location"
              onChange={handleChange}
              value={searchParams.location}
              placeholder="city, zip code, address..."
            />
            <br />
            <label>Price</label>
            <PriceBox>{priceOptions}</PriceBox>

            <button style={{ background: "#d32323" }} onClick={findRestaurants}>
              Find Restaurants
            </button>
            {restaurants.length > 0 && <Results restaurants={restaurants} suggestions={suggestions} />}
          </ResultCol>
        </ColWrapper>
      </div>
    </>
  );
};

export default Party;
