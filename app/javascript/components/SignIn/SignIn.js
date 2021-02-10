import React, { useState } from 'react'
import axios from 'axios'

const SignIn = () => {
  const [user, setUser] = useState({email: '', password: ''})

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/v1/login', user)
    .then((resp) => {
      console.log(resp)
    })
  }

  return (
    <div>
      Sign In Page
      <form onSubmit={handleSubmit}>
        <input name='email' value={user.email} onChange={handleChange} placeholder='Email Address' />
        <input type='password' name='password' value={user.password} onChange={handleChange} placeholder='Password' />
        <button type='submit'>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn
