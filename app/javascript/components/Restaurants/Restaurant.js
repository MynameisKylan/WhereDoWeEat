import React, { Fragment, useState } from "react";
import axios from "axios";
import Gray from "../Stars/Gray";
import Hover from "../Stars/Hover";
import Selected from "../Stars/Selected";
import styled from "styled-components";

const RatingBox = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  position: relative;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-image: url("data:image/svg+xml;charset=UTF-8,${Gray}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
  }

  input:checked ~ label,
  input:checked ~ label ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${Selected}");
  }

  input:not(:checked) ~ label:hover,
  input:not(:checked) ~ label:hover ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${Hover}");
  }

  @media (max-width: 600px) {
    label {
      width: 34px;
      height: 34px;
    }
  }
`;

const RestaurantCard = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;

  @media (max-width: 600px) {
    font-size: 0.8em;
  }
`;

const Image = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 5px;
  object-fit: cover;

  @media (max-width: 600px) {
    width: 150px;
    height: 150px;
  }
`;

const Restaurant = ({ data }) => {
  const [rating, setRating] = useState(data.user_rating);

  const handleClick = (score) => {
    if (rating) {
      axios
        .put(
          "/ratings",
          { rating: { yelp_id: data.id, value: score } },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then((resp) => {
          setRating(resp.data.data.attributes.value);
        });
    } else {
      axios
        .post(
          "/ratings",
          { rating: { yelp_id: data.id, value: score } },
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then((resp) => {
          setRating(resp.data.data.attributes.value);
        });
    }
  };

  const ratingOptions = [5, 4, 3, 2, 1].map((score, index) => {
    return (
      <Fragment key={score}>
        {/* actual input field is hidden, correct value is checked when the corresponding label (stars UI) is clicked */}
        <input
          type="radio"
          value={score}
          name={`rating-${data.id}`}
          id={`rating-${score}`}
          checked={rating === score}
          onChange={() => {}}
        />
        <label onClick={() => handleClick(score)}></label>
      </Fragment>
    );
  });

  return (
    <RestaurantCard>
      <Image src={data.image_url} />
      <div>
        <h2>{data.name}</h2>
        <p>{data.categories.map((cat) => cat["title"]).join(", ")}</p>
        <div>
          <h3>Your Rating:</h3>
          <RatingBox>{ratingOptions}</RatingBox>
        </div>
      </div>
    </RestaurantCard>
  );
};

export default Restaurant;
