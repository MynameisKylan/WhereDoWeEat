import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>#Homepage</h1>
      <Link to={'/signup'}>Sign Up</Link>
      <Link to={'/signin'}>Sign In</Link>
    </div>
  )
}

export default Home
