import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Restaurant from "./Restaurant";

const Restaurants = () => {
  const [searchParams, setSearchParams] = useState({ term: "", location: "" });
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // add client side validation

    axios
      .post(
        "/restaurants/search",
        { search: searchParams },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((resp) => {
        if (resp.data.error) {
          setErrorMessage(resp.data.error)
        } else{
          setRestaurants(resp.data);
        }
      });
  };

  const restaurantCards = restaurants.map((restaurant) => (
    <Restaurant key={restaurant.name} data={restaurant} />
  ));

  return (
    <div>
      <Navbar active="restaurants" />
      <h2>
        {errorMessage}
      </h2>
      <form onSubmit={handleSubmit}>
        <label>Search for</label>
        <input
          name="term"
          placeholder="restaurants, japanese, pizza..."
          value={searchParams.term}
          onChange={handleChange}
        />
        <label>Around</label>
        <input
          name="location"
          placeholder="city, zip code, or address"
          value={searchParams.location}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {restaurantCards}
    </div>
  );
};

export default Restaurants;
