import React from "react";
import styled from "styled-components";

const RatingContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  padding: 0.5em;

  @media (max-width: 750px) {
    flex-direction: column;
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
`;

const StarWrapper = styled.span`
  position: relative;
  display: inline-block;
`;

const Stars = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
  color: gold;
`;

const Rating = ({ name, score, price, categories, image }) => {
  return (
    <RatingContainer>
      <Image src={image} />
      <InfoCol>
        <h3>{name}</h3>
        <p>
          WDWE Party Score:{" "}
          <StarWrapper>
            <i className="far fa-star"></i> <i className="far fa-star"></i>{" "}
            <i className="far fa-star"></i> <i className="far fa-star"></i>{" "}
            <i className="far fa-star"></i>
            <Stars style={{ width: (score / 5) * 100 + "%" }}>
              <i className="fas fa-star"></i> <i className="fas fa-star"></i>{" "}
              <i className="fas fa-star"></i> <i className="fas fa-star"></i>{" "}
              <i className="fas fa-star"></i>
            </Stars>
          </StarWrapper>
        </p>
        <p>Price Range: {price}</p>
        <p>{categories.map((cat) => cat["title"]).join(", ")}</p>
      </InfoCol>
    </RatingContainer>
  );
};

export default Rating;
