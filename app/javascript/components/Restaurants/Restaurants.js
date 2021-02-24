import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Restaurant from "./Restaurant";
import Header from "../Header";
import styled from "styled-components";
import Error from "../Error";
import _ from "lodash";

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
  // States
  const [searchParams, _setSearchParams] = useState({
    term: "",
    location: "",
    latitude: null,
    longitude: null,
    offset: 0,
  });
  const [restaurants, _setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  // Ref allows retrieval of current searchParams in event listener
  const searchParamsRef = useRef(searchParams);

  // Update both searchParams state and searchParamsRef value
  const setSearchParams = (data) => {
    _setSearchParams(data);
    searchParamsRef.current = data;
  };

  // Ref allows retrieval of current restaurants in event listener
  const restaurantsRef = useRef(restaurants);

  // Update both resturants state and restaurantsRef value
  const setRestaurants = (data) => {
    _setRestaurants(data);
    restaurantsRef.current = data;
  };

  // Form handler
  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setScrollPosition(0);
    setErrorMessage("");

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

  // Load more handler - throttled to prevent multiple calls when reaching end of page
  // {leading:true, trailing: false} calls function and ignores subsequent calls for the timeout duration,
  // allowing time for DOM to update
  const loadMore = _.throttle(() => {
    console.log('called')
    setScrollPosition(window.pageYOffset);
    axios
      .post(
        "/restaurants/search",
        { search: searchParamsRef.current },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((resp) => {
        if (resp.data.error) {
          setErrorMessage(resp.data.error);
          window.scrollTo(0, 0);
        } else {
          setRestaurants([...restaurantsRef.current, ...resp.data]);
          setSearchParams({
            ...searchParamsRef.current,
            offset: searchParamsRef.current.offset + 1,
          });
        }
      });
  }, 4000, {leading: true, trailing: false});

  // Maintain scroll position when loading more restaurants
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [restaurants]);

  // Endless scroll: call loadMore on reaching page end
  const loadMoreIfBottom = _.throttle(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadMore();
    }
  }, 250);

  // Setup event listener for endless scroll
  useEffect(() => {
    window.addEventListener("scroll", loadMoreIfBottom);
    return () => {
      window.removeEventListener("scroll", loadMoreIfBottom);
    };
  }, []);

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
          <button
            type="button"
            onClick={loadMore}
            style={{ marginBottom: 2 + "em", background: "#d32323" }}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
