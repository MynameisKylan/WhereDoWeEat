import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import Header from '../Header'
import Error from '../Error'

const SignIn = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/users/sign_in", {
        user: user,
      })
      .then((resp) => {
        console.log(resp)
        if (resp.data.token) {
          const token = resp.data.token
          props.setAccessToken(token)
          localStorage.setItem('token', token)
          history.push('/')
        } else {
          setErrorMessage('Invalid email or password')
        }
      });
  };

  return (
    <div>
      <Header hasAccessToken={ props.accessToken ? true : false }/>
      Sign In Page
      { errorMessage ? <Error message={errorMessage} /> : null }
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email Address"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
