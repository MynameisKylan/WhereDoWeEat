import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to={'/'}>Profile</Link>
      <Link to={'/group'}>Create A Group</Link>
      <Link to={'/restaurants'}>Rate Restaurants</Link>
    </nav>
  )
}

export default Navbar
