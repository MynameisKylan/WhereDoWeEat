import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>Where Do We Eat?</h1>
      Has access token? {String(props.hasAccessToken)}
      <h2>End header</h2>
    </div>
  )
}

export default Header
