import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const Restaurants = () => {
  const [searchParams, setSearchParams] = useState({ term: "", location: "" });

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
        console.log(resp);
      });
  };

  return (
    <div>
      <Navbar active="restaurants" />
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
    </div>
  );
};

export default Restaurants;
