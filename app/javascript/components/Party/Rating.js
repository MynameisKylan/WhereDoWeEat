import React from 'react'

const Rating = ({name, score, price, categories}) => {
  return (
    <div>
      {name}<br/>
      WDWE Party Score: {score}<br/>
      Price Range: {price}<br/>
      Categories: {categories.map((cat) => cat['title']).join(', ')}
    </div>
  )
}

export default Rating

