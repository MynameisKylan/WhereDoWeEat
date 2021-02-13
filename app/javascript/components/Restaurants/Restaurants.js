import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const Restaurants = () => {
  const [searchParams, setSearchParams] = useState({ term: "", location: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar active='restaurants' />
      <form onSubmit={handleSubmit}>
        <label>Search for</label>
        <input name="term" placeholder="restaurants, japanese, pizza..." />
        <label>Around</label>
        <input name="location" placeholder="city, zip code, or address" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Restaurants;
