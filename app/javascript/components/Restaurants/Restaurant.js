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
    <div>
      {data.name}
      <div>
        <h3>Your Rating:</h3>
        <RatingBox>{ratingOptions}</RatingBox>
      </div>
    </div>
  );
};

export default Restaurant;
