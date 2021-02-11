import React from 'react'

const Error = (props) => {
  return (
    <div style={{color: 'red'}}>
      {props.message}
    </div>
  )
}

export default Error
