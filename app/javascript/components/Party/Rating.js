import React from "react";
import styled from "styled-components";
import "./Rating.css";

const RatingContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  padding: 0.5em;

  @media (max-width: 750px) {
    flex-direction:column;
  }
`;

const Image = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 5px;
  object-fit: cover;
  margin: auto;

  @media (max-width: 600px) {
    width: 150px;
    height: 150px;
  }
`;

const InfoCol = styled.div`
  width: 50%;

  @media (max-width: 750px) {
    width: 100%;
  }
`

const Rating = ({ name, score, price, categories, image }) => {
  return (
    <RatingContainer>
      <Image src={image} />
      <InfoCol>
        <h3>{name}</h3>
        <p>
          WDWE Party Score:{" "}
          <span className="star-wrapper">
            <span
              className="stars"
              style={{ width: (score / 5) * 100 + "%" }}
            ></span>
          </span>
        </p>
        <p>Price Range: {price}</p>
        <p>{categories.map((cat) => cat["title"]).join(", ")}</p>
      </InfoCol>
    </RatingContainer>
  );
};

export default Rating;
