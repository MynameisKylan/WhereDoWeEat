import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>Header:</h1>
      Has access token? {String(props.hasAccessToken)}
      <h2>End header</h2>
    </div>
  )
}

export default Header
