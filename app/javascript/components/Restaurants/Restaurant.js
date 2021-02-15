import React, {Fragment, useState} from 'react'

const Restaurant = ({data}) => {
  const [rating, setRating] = useState(0)

  const ratingOptions = [5, 4, 3, 2, 1].map((score, index) => {
    return (
      <Fragment key={score}>
        {/* actual input field is hidden, correct value is checked when the corresponding label (stars UI) is clicked, calling props.setRating, which updates props.review */}
        <input
          type="radio"
          value={score}
          name="rating"
          id={`rating-${score}`}
          // checked={props.review.score == score}
          onChange={() => {}}
        />
        <label onClick={() => setRating(score)}></label>
      </Fragment>
    );
  });

  return (
    <div>
      {data.name}
      <div>
        {ratingOptions}
      </div>
    </div>
  )
}

export default Restaurant
