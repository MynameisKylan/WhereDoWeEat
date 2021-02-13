import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  let profileClass = ''
  let groupClass = ''
  let restaurantsClass = ''
  switch (props.active) {
    case 'profile':
      profileClass += 'active'
      break;
    case 'group':
      groupClass += 'active'
      break;
    case 'restaurants':
      restaurantsClass += 'active'
      break;
  }

  return (
    <nav>
      <div className={profileClass}>
        <Link to={'/'}>Profile</Link>
      </div>
      <div className={groupClass}>
        <Link to={'/group'}>Create A Group</Link>
      </div>
      <div className={restaurantsClass}>
        <Link to={'/restaurants'}>Rate Restaurants</Link>
      </div>
    </nav>
  )
}

export default Navbar
