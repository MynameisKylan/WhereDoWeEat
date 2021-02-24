import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Restaurant from "./Restaurant";
import Header from "../Header";
import styled from "styled-components";
import Error from "../Error";

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

const LocationButton = styled.button`
  width: 30px;
  justify-content: center;
  height: 100%;
  border-radius: 0;
  font-size: 1.5em;
  color: steelblue;
  background: white;
  margin: 1px;
`;

const SearchButton = styled.button`
  background: #d32323;
  width: 60px;
  color: white;
  border-radius: 0 3px 3px 0;
  display: flex;
  justify-content: center;

  &:hover {
    opacity: 85%;
    transition: 0.15s ease;
  }

  @media (max-width: 720px) {
    width: 40%;
    border-radius: 3px;
  }
`;

const RestaurantWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Restaurants = () => {
  // State
  const [searchParams, setSearchParams] = useState({
    term: "",
    location: "",
    latitude: null,
    longitude: null,
    offset: 0,
  });
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  // Form handler
  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setScrollPosition(0);
    setErrorMessage('');

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
            setSearchParams({ ...searchParams, offset: 1 });
          }
        });
    }
  };

  // Current Location Handler
  const getUserLocation = (e) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSearchParams({
          ...searchParams,
          location: "Your Location",
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
        setErrorMessage("Could not get your location");
      }
    );
  };

  // Load more handler
  const loadMore = () => {
    setScrollPosition(window.pageYOffset);
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
          setRestaurants([...restaurants, ...resp.data]);
          setSearchParams({ ...searchParams, offset: searchParams.offset + 1 });
        }
      });
  };

  // Maintain scroll position when loading more restaurants
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [restaurants])

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
        {errorMessage && <Error message={errorMessage} />}
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
              <LocationButton type="button" onClick={getUserLocation}>
                <i className="fas fa-map-marker-alt"></i>
              </LocationButton>
            </div>
            <SearchButton type="submit">
              <i className="fas fa-search"></i>
            </SearchButton>
          </Form>
        </FormWrapper>
        <RestaurantWrapper>{restaurantCards}</RestaurantWrapper>
        {restaurants.length > 0 && (
          <button type="button" onClick={loadMore} style={{marginBottom: 2 + 'em', background: '#d32323'}}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
