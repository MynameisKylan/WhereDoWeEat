import React from 'react'
import Header from '../Header'

const SignUp = (props) => {
  return (
    <div>
      <Header hasAccessToken={ props.accessToken ? true : false }/>
      Sign Up Page
    </div>
  )
}

export default SignUp
