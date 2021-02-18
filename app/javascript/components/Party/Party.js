import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Friend from "../Friends/Friend";
import Rating from './Rating';
import styled from "styled-components";

const ColWrapper = styled.div`
  display: flex;
`;

const Party = () => {
  const [party, setParty] = useState([]);
  const [friends, setFriends] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [user, setUser] = useState('')

  // set current user and party on initial load
  useEffect(() => {
    axios
      .get("/users", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((resp) => {
        const username = resp.data.data.attributes.username
        setUser(username)
        setParty([...party, username]);
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

  const addToParty = (username) => {
    setParty([...party, username]);
    setFriends(friends.filter((friend) => friend !== username));
  };

  const removeFromParty = (username) => {
    setParty(party.filter((friend) => friend !== username));
    setFriends([...friends, username]);
  };

  const findRestaurants = () => {
    axios
      .post(
        "/party/search",
        { party: party },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((resp) => {
        console.log(resp);
        setRestaurants(resp.data);
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

  const partyList = party.map((friend) => (
    <Friend
      key={friend}
      username={friend}
      handleClick={() => removeFromParty(friend)}
      action="Remove From Party"
      self={friend == user}
    />
  ));

  return (
    <div>
      <Navbar active="party" />
      <h1>Create A Party</h1>
      <p>Add friends to your party and find restaurants that everyone loves!</p>
      <ColWrapper>
        <div>
          <h2>Your Party</h2>
          {partyList}
          <br />
          <button onClick={findRestaurants}>Find Restaurants</button>
          <h2>Add Friends</h2>
          {friendsList}
        </div>
        <div>
          <h2>Results</h2>
          {restaurants.map((res) => (
            <Rating key={res.data.name} name={res.data.name} score={res.weighted_rating} price={res.data.price} categories={res.data.categories} />
          ))}
        </div>
      </ColWrapper>
    </div>
  );
};

export default Party;
