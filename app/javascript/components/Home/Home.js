import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'

const Home = (props) => {
  return (
    <div>
      <Header hasAccessToken={ props.accessToken ? true : false }/>
      <h1>#Homepage</h1>
      <Link to={'/signup'}>Sign Up</Link>
      <Link to={'/signin'}>Sign In</Link>
    </div>
  )
}

export default Home
