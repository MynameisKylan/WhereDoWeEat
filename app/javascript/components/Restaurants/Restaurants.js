import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Restaurant from "./Restaurant";
import Header from "../Header";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em auto;
`;

const Form = styled.form`
  border: 1px solid grey;
  border-radius: 3px;
  display: flex;
  align-items: center;
  max-width: 85%;
  flex-direction: row;
  * {
    display: flex;
    align-items: center;
    height: 40px;
    * {
      border: none;
      box-sizing: border-box;
      margin: 0;
      height: 95%;
    }
  }

  @media (max-width: 720px) {
    flex-direction: column;
    border: none;

    > * {
      width: 100%;
      border: 1px solid grey;
      margin: 1em;
      border-radius: 3px;
    }

    label {
      width: 30%;
      display: flex;
      justify-content: center;
    }

    input {
      width: 70%;
    }
  }
`;

const Label = styled.label`
  border-right: 1px solid lightgrey;
  padding: 0.5em;
  display: flex;
  align-items: center;
`;

const SearchButton = styled.button`
  background: #d32323;
  width: 60px;
  color: white;
  border-radius: 0 3px 3px 0;
  display: flex;
  justify-content: center;

  &:hover {
    opacity: 80%;
    transition: 0.15s ease;
  }

  @media (max-width: 720px) {
    width: 40%;
  }
`;

const RestaurantWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Restaurants = () => {
  const [searchParams, setSearchParams] = useState({ term: "", location: "" });
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchParams.location) {
      setErrorMessage("Must Specify Search Location");
    } else {
      axios
        .post(
          "/restaurants/search",
          { search: searchParams },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then((resp) => {
          if (resp.data.error) {
            setErrorMessage(resp.data.error);
          } else {
            setRestaurants(resp.data);
          }
        });
    }
  };

  const restaurantCards = restaurants.map((restaurant) => (
    <Restaurant key={restaurant.id} data={restaurant} />
  ));

  return (
    <div>
      <div className="header">
        <Header />
        <Navbar active="restaurants" />
      </div>
      <div className="content-wrapper">
        <p>
          Rate your favorite restaurants and we'll do the work of helping find
          the perfect restaurant for you and your party!
        </p>
        {errorMessage ? <Error message={errorMessage} /> : null}
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <div>
              <Label>Search for</Label>
              <input
                name="term"
                placeholder="restaurants, japanese, pizza..."
                value={searchParams.term}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Around</Label>
              <input
                name="location"
                placeholder="city, zip code, or address"
                value={searchParams.location}
                onChange={handleChange}
              />
            </div>
            <SearchButton type="submit">
              <i className="fas fa-search"></i>
            </SearchButton>
          </Form>
        </FormWrapper>
        <RestaurantWrapper>{restaurantCards}</RestaurantWrapper>
      </div>
    </div>
  );
};

export default Restaurants;
